import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Label, Image, Grid, Message } from 'semantic-ui-react'
import * as style from '../../style/inline'

const minHeight = { minHeight: '200px'}

class CEditFeatures extends Component {

  featuresEqual = (a, b) => {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    console.log('a', a, 'a', a);
    console.log('aprops', aProps, 'bProps', bProps);
    // If the number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
        console.log(1, aProps.length, 'aProps.length');
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propKey = aProps[i];
        // If values of same property are not equal, objects are not equivalent
        console.log(2, propKey, 'propKey');
        if (a[propKey] !== b[propKey]) {
            return false;
        }
    }
    // If we made it this far, objects  are considered equivalent
    return true;
  }

  render() {
    const {course,
      handleOpenAddFeatureForm,
      addNewFeature,
      handleAddFeatureCancel,
      formForFeature,
      header, sub, featureList, submit} = this.props

    const addFeatureIsInvalid = header === '' || sub === '';

    let noFeature = featureList == undefined // true of false
    // console.log('features', features, 'course features', !!course && course.features);

    let emptyObj = {key: {header: '1', sub:'1'}}
    let isInvalid = noFeature || this.featuresEqual(!!featureList ? featureList : emptyObj, !!course ? course.features : emptyObj)

    let addFeature = formForFeature
    ? <Segment style={style.C_EDIT_CURRI_SECTION}>
        <Form onSubmit={addNewFeature}>
            <Form.Input fluid label='Feature Title' placeholder='Feature Title'
              value={header}
              name='header'
              onChange={this.props.change}
            />

            <Form.TextArea label='Feature Details' placeholder='Tell us more about your course feature...'
              value={sub}
              name='sub'
              onChange={this.props.change}
            />
          <Button basic onClick={handleAddFeatureCancel}>Cancel</Button>
          <Button disabled={addFeatureIsInvalid}>Add new feature</Button>

        </Form>
      </Segment>
    : <Segment basic><Button fluid onClick={handleOpenAddFeatureForm}>Add Feature</Button></Segment>

    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Features
          {isInvalid ?
            <Button basic disabled floated='right' content='Saved' />
          : <Button disabled={isInvalid} onClick={submit} floated='right' color='red' content='Save'/>
          }
      </Header>

      <Segment attached stacked  style={style.C_EDIT_MENU_PADDING}>
        <Segment basic style={minHeight}>
          <Grid columns={2}>
            {!!featureList && Object.keys(featureList).map(f =>
              <Grid.Column key={f}>
                <Message  onDismiss={() => this.props.dismiss(f)}>
                  <Message.Header>
                    {featureList[f].header}
                  </Message.Header>
                  <p>
                    {featureList[f].sub}
                  </p>
                </Message>
              </Grid.Column>
            )}
          </Grid>
        </Segment>

        {/* <Form onSubmit={this.props.addNewFeature}>
            <Form.Input fluid label='Feature Title' placeholder='Feature Title'
              value={header}
              name='header'
              onChange={this.props.change}
            />

            <Form.TextArea label='Feature Details' placeholder='Tell us more about your course feature...'
              value={sub}
              name='sub'
              onChange={this.props.change}
            />
          <Form.Button disabled={addFeatureIsInvalid}>Add new feature</Form.Button>
        </Form> */}
        {addFeature}

      </Segment>
    </React.Fragment>
    );
  }
}

export default CEditFeatures
