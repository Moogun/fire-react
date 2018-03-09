import React, {Component} from 'react';
import {Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import { Button, Image, Modal, Form, Checkbox, Icon, Input } from 'semantic-ui-react'

const SignUpPage = ({history}) => (
  <div>
    <SignUpForm history={history} />
  </div>
)

const INITIAL_STATE = {
  email: '',
  username:'',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {history} = this.props;

  auth.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });

    event.preventDefault();
  }

  render() {

    const {email, username, passwordOne, passwordTwo, error} = this.state;

    const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';

    return (
      <Modal size="mini" trigger={<p> Sign Up</p>}>
          <Modal.Header color='teal'>Sign Up</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>

              <Form.Field>
                <Input
                    icon='mail'
                    iconPosition='left'
                    value={email}
                    onChange={(event) => this.setState(byPropKey('email', event.target.value))}
                    type="email"
                    placeholder="Email"
                  />
              </Form.Field>
              <Form.Field>
                <Input
                  icon='user'
                  iconPosition='left'
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  type="text"
                  placeholder="Username"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  icon='lock'
                  iconPosition='left'
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password"
                />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon='lock'
                    iconPosition='left'
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </Form.Field>

                <Form.Field>
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button color='teal' fluid>
                  <Icon name='checkmark' /> Sign Up
                </Button>
            </Form>

          </Modal.Content>

          <Modal.Actions>
            Forgot password?
            Already have an account?
            {/* <Button color='green'>
              <Icon name='checkmark' /> Sign Up
            </Button> */}
          </Modal.Actions>

        </Modal>

    );
  }
}



const SignUpLink = () =>
  <div>
    <p>Don't Have an account yet?
    {' '} <Link to='/SignUp'> Sign Up</Link>
    </p>
  </div>


export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
}
