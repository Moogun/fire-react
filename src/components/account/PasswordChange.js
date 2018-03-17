import React, { Component } from 'react';

import { auth } from '../../firebase';
import { Segment, Button, Header, Divider, Form, Input} from 'semantic-ui-react'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  currentPassword: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      currentPassword,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      currentPassword === '' ||
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <Segment basic>
        <Header as='h2'>Change your password</Header>
        <Divider />
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <Input
                value={currentPassword}
                onChange={event => this.setState(byPropKey('currentPassword', event.target.value))}
                type="password"
                placeholder="Current Password"
              />
            </Form.Field>
            <Form.Field>
              <Input
                value={passwordOne}
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="New Password"
              />
            </Form.Field>
            <Form.Field>
              <Input
                value={passwordTwo}
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm New Password"
              />
            </Form.Field>
            <Button disabled={isInvalid} type="submit">
              Reset My Password
            </Button>

            { error && <p>{error.message}</p> }
          </Form>
      </Segment>
    );
  }
}


//   <br/>
//   <Divider />
//   <Form size='big'>
//     <Form.Field>
//       <label>Old password</label>
//       <input placeholder='First Name' />
//     </Form.Field>
//     <Form.Field>
//       <label>New password</label>
//       <input placeholder='Last Name' />
//     </Form.Field>
//     <Form.Field>
//       <label>Confirm password</label>
//       <input placeholder='Last Name' />
//     </Form.Field>
//     <Button type='submit'>Update</Button>
//   </Form>
// </Segment>

export default PasswordChangeForm;
