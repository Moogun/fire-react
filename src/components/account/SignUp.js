import React, {Component} from 'react';
import {Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Divider, Segment } from 'semantic-ui-react'

// import FacebookLogin from 'react-facebook-login';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
//
// const responseFacebook = (response) => {
//   console.log(response);
// }

const INITIAL_STATE = {
  email: '',
  username:'',
  passwordOne: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class SignUpPage extends Component {
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

  signUpWithGoogle = () => {
    console.log('google signing');
    const {history} = this.props;
    auth.doCreateUserWithGoogle()
      .then(result => {
        var token = result.credential.accessToken; //This gives you a Google Access Token. You can use it to access the Google API.
        var authUser = result.user;
        db.doCreateUser(authUser.uid, authUser.displayName, authUser.email)
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
  }

  componentClicked = () => {
    console.log('fbSignin');
  }

  render() {

    const {email, username, passwordOne, error} = this.state;
    const { toLogin } = this.props

    const isInvalid =
          passwordOne === '' ||
          email === '' ||
          username === '';

    return (
        <Segment>
          <Modal.Header color='teal'>Sign Up</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.onSubmit}>

                <Form.Field>
                  <Button fluid size="tiny" onClick={this.signUpWithGoogle}>
                    <Icon name='google' /> Continue with Google
                  </Button>
                </Form.Field>

                <Form.Field>
                  <Button fluid size="tiny">
                    <Icon name='facebook' /> Continue with Facebook
                  </Button>
                </Form.Field>
                {/* <FacebookLogin
                    appId="1329723160399765"
                    autoLoad={true}
                    fields="name,email,picture"
                    render={renderProps => (
                    <Button onClick={renderProps.onClick}>Facebook Sign up</Button> )}
                    onClick={this.componentClicked}
                    callback={responseFacebook} /> */}

              <Divider horizontal>Or</Divider>

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
                  <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button color='teal' fluid>
                  <Icon name='checkmark' /> Sign Up
                </Button>
            </Form>

          </Modal.Content>

          <Modal.Actions>
            have an account?
            <p onClick={toLogin}>Sign In</p>
          </Modal.Actions>
        </Segment>
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
  SignUpLink,
}
