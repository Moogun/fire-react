import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Label, Image, Grid, Message } from 'semantic-ui-react'
import {db} from '../../firebase';

const CEditMetaBorder = {borderRadius: '0px'}
const minHeight = { minHeight: '200px'}

const INITIAL_STATE = {
  header: '',
  sub: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CEditFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      features: {},
      ...INITIAL_STATE,
    }
  }

  handleDismiss = (e) => {
      console.log('e', e);

      let fList = this.state.features
      delete fList[e]
      console.log('new lsit', fList);
      this.setState ({ features: fList })
      console.log('state', this.state.features);
   }

  handleAddNewFeature = () => {

     var newKey = db.newKey();
     let id = newKey

     const {features, header, sub} = this.state
     features[newKey] = {header: header, sub: sub}

     this.setState ({
       features: features,
       ...INITIAL_STATE,
     })
     console.log('state', this.state.features);
  }

  handleSubmit = () => {
    const { features } = this.state
    const {courseId, teacherId } = this.props
    console.log('courseId, tid, features', features, courseId, teacherId);

    db.doUpdateFeatures(teacherId, courseId, features)
      .then(res => console.log('res', res))
  }

  render() {
    const {header, sub, features} = this.state
    const isInvalid =
    header === '' ||
    sub === '';

    const isInvalidSave = Object.keys(features).length === 0
    console.log('fe', features);
    console.log('fe', Object.keys(features).length === 0) ;

    return (
      <Segment style={CEditMetaBorder}>
        <Header as='h2'>Features</Header>
        <Divider />
        <Segment basic style={minHeight}>
          <Grid columns={2}>
            {Object.keys(features).map(f =>
              <Grid.Column key={f}>
                <Message  onDismiss={() => this.handleDismiss(f)}>
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
        <Form onSubmit={this.handleAddNewFeature}>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Feature' placeholder='feature'
              value={header}
              onChange = {(event) => this.setState(byPropKey('header', event.target.value))}
            />
            <Form.Input fluid style={{display: 'none'}} />
          </Form.Group>

          <Form.TextArea label='Details' placeholder='Tell us more about your course feature...'
            value={sub}
            onChange = {(event) => this.setState(byPropKey('sub', event.target.value))} />
          <Form.Button disabled = {isInvalid}>Add new feature</Form.Button>
        </Form>
        <Divider />
        <Button onClick={this.handleSubmit} disabled = {isInvalidSave}>Save</Button>
      </Segment>
    );
  }
}

export default CEditFeatures
