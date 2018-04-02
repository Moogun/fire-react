import React, {Component} from 'react';
import {Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Divider, Segment, Header, Grid } from 'semantic-ui-react'
import {SignInLink} from './SignIn';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// const responseFacebook = (response) => {
//   console.log('fb login', response);
// }

const SignUpPage = ({history}) => (
  <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid container
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' />
          {' '}Sign Up
        </Header>

        <SignUpForm history={history} />
        <br/>
        <SignInLink />

      </Grid.Column>
    </Grid>
  </div>
)

const INITIAL_STATE = {
  email: '',
  username:'',
  passwordOne: '',
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

  signUpWithFB = () => {

    const {history} = this.props;
    console.log('fbSignin');
    auth.doCreateUserWithFB()
    .then(result => {
      console.log('sign up fb');
      var token = result.credential.accessToken;
       //This gives you a Google Access Token. You can use it to access the Google API.
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

  render() {

    const {email, username, passwordOne, error} = this.state;

    const isInvalid =
          passwordOne === '' ||
          email === '' ||
          username === '';

    return (
      <div>
        <Form size='large' onSubmit={this.onSubmit}>
          <Segment stacked>
            <FacebookLogin
              appId="1329723160399765"
              autoLoad
              render={renderProps => (
                <Button
                  fluid size='tiny'
                  color='facebook'
                  onClick={this.signUpWithFB}>Continue with Facebook</Button>
              )}
            />
            <br/>
            <Button fluid color='google plus' size='tiny' onClick={this.signUpWithGoogle}>
              <Icon name='google plus' />Continue with Google
            </Button>
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

              </Segment>
        </Form>

        </div>

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
