import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Label, Image, Grid, Message } from 'semantic-ui-react'
import {db} from '../../firebase';

const CEditMetaBorder = {borderRadius: '0px'}
const minHeight = { minHeight: '200px'}

class CEditFeatures extends Component {

  render() {
    const {header, sub, features} = this.props

    const isInvalid =
    header === '' ||
    sub === '';

    const isInvalidSave = features ? Object.keys(features).length === 0 : false
    console.log('fe', features);
    // console.log('fe', Object.keys(features).length === 0) ;

    return (
      <Segment style={CEditMetaBorder}>
        <Header as='h2'>Features</Header>
        <Divider />
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
          <Form.Group widths='equal'>
            <Form.Input fluid label='Feature' placeholder='feature'
              value={header}
              name='header'
              onChange={this.props.change}
            />
            <Form.Input fluid style={{display: 'none'}} />
          </Form.Group>

          <Form.TextArea label='Details' placeholder='Tell us more about your course feature...'
            value={sub}
            name='sub'
            onChange={this.props.change}
          />
          <Form.Button disabled = {isInvalid}>Add new feature</Form.Button>
        </Form>
        <Divider />
        <Button onClick={this.props.submit} disabled = {isInvalidSave}>Save</Button>
      </Segment>
    );
  }
}

export default CEditFeatures
