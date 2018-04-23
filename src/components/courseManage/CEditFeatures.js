import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Label, Image, Grid, Message } from 'semantic-ui-react'
import {db} from '../../firebase';

const CEditMetaBorder = {borderRadius: '0px'}
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
    const {course, header, sub, features, submit} = this.props

    const addFeatureIsInvalid = header === '' || sub === '';

    let noFeature = features == undefined // true of false
    console.log('features', features, 'course features', !!course && course.features);

    let emptyObj = {key: {header: '1', sub:'1'}}
    let isInvalid = noFeature || this.featuresEqual(!!features ? features : emptyObj, !!course ? course.features : emptyObj)
    console.log('isinvalid test', noFeature, this.featuresEqual(!!features ? features : emptyObj, !!course ? course.features : emptyObj));
    console.log('isinvalid', isInvalid);

    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Features
          {isInvalid ?
            <Button basic disabled floated='right' content='Saved' />
          : <Button disabled={isInvalid} onClick={submit} floated='right' color='red' content='Save'/>
          }
      </Header>

      <Segment attached stacked style={CEditMetaBorder}>
        <Segment basic style={minHeight}>
          <Grid columns={2}>
            {!!features && Object.keys(features).map(f =>
              <Grid.Column key={f}>
                <Message  onDismiss={() => this.props.dismiss(f)}>
                  <Message.Header>
                    {features[f].header}
                  </Message.Header>
                  <p>
                    {features[f].sub}
                  </p>
                </Message>
              </Grid.Column>
            )}
          </Grid>
        </Segment>
        <Divider />
        <Form onSubmit={this.props.addNewFeature}>

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
        </Form>
      </Segment>
    </React.Fragment>
    );
  }
}

export default CEditFeatures
