import React, {Component} from 'react';
import { Button, Image, Modal, Form, Checkbox, Icon, Input } from 'semantic-ui-react'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  }
  render() {

    const {title} = this.state;

    const isInvalid = title !== '';


    return (
      <Modal size="mini" trigger={<p> Register your course</p>}>
          <Modal.Header color='teal'>Create new course</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>

              <Form.Field>
                <Input
                    icon='pencil'
                    iconPosition='left'
                    // value={email}
                    onChange={(event) => this.setState(byPropKey('pencil', event.target.value))}
                    type="text"
                    placeholder="Enter title"
                  />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color='red'>
              <Icon name='checkmark' /> Cancel
            </Button>
            <Button color='teal'>
              <Icon name='checkmark' /> Sign Up
            </Button>
          </Modal.Actions>

        </Modal>
    );
  }
}

export default Create;
