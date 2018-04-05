import React, {Component} from 'react';
import {Link, withRouter, } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';
import { Button, Image, Form, Checkbox, Icon, Input, Divider, Segment, Header, Grid, Message } from 'semantic-ui-react'
import {SignInLink} from './SignIn';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// const responseFacebook = (response) => {
//   console.log('fb login', response);
// }

const SignUpPage = ({history}) => (

    <Grid container
      textAlign='center'
      style={{ height: '80%', margin: '5rem' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 350 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' />
          {' '}Sign Up
        </Header>

        <SignUpForm history={history} />
        <br/>
        <SignInLink />

      </Grid.Column>
    </Grid>

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
        db.doSearchForUsername(username)
          .then(res => {
            console.log('res', res.val())
            let usernameUnique = res.val()
            let providedName = ''
            this.handleUsername(res.val(), authUser.uid, username, email, providedName)
          })
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
    event.preventDefault();
  }

  handleUsername(usernameUnique, uid, username, email, providedName){
    const {history} = this.props;
    if (usernameUnique === null) {
    //   //means username is not taken
      db.doCreateUser(uid, username, email, providedName)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    } else {
      console.log('taken', usernameUnique);
      let randomNum = Math.floor(Math.random()*1000)
      let newUsername = username + '_' + randomNum

      db.doCreateUser(uid, newUsername, email, providedName)
        .then(() => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    }
  }

  signUpWithGoogle = () => {
    console.log('google signing');
    const {history} = this.props;
    auth.doCreateUserWithGoogle()
      .then(result => {
        console.log('result', result);
        var token = result.credential.accessToken; //This gives you a Google Access Token. You can use it to access the Google API.
        var authUser = result.user;
          console.log('authUser', authUser);
        let str = authUser.displayName
        console.log('str', str);
        let username = str.split(' ').join('_');
        console.log('username', username);

        db.doSearchForUsername(username)
          .then(res => {
            console.log('res', res.val())
            let usernameUnique = res.val()
            this.handleUsername(usernameUnique, authUser.uid, username, authUser.email, str)
          })
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
      console.log('authUser', authUser);
      let str = authUser.displayName
      console.log('str', str);
      let username = str.split(' ').join('_');
      console.log('username', username);

      db.doSearchForUsername(username)
        .then(res => {
          console.log('res', res.val())
          let usernameUnique = res.val()
          this.handleUsername(usernameUnique, authUser.uid, username, authUser.email, str)
        })
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
  }

  test = (e) => {
    db.doSearchForUsername(e.target.value)
      .then(res => console.log('res', res.val()))
  }
  render() {

    const {email, username, passwordOne, error} = this.state;
    const isInvalid =
          passwordOne === '' ||
          passwordOne.length < 6 ||
          email === '' ||
          username === '' ||
          username.length < 6 ;

    let err = error ? true : false
    console.log('err', err, passwordOne.length)
    return (
      <div>
        <Form size='tiny' onSubmit={this.onSubmit}>
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
                <Form.Input
                    icon='mail'
                    iconPosition='left'
                    value={email}
                    onChange={(event) => this.setState(byPropKey('email', event.target.value))}
                    type="email"
                    placeholder="Email"
                    error={err}
                  />
                {error && <Message negative>
                    <Message.Header>{error.message}</Message.Header>
                </Message> }
              </Form.Field>
              <Form.Field>
                <Form.Input
                  icon='user'
                  iconPosition='left'
                  value={username}
                  onChange={event => this.setState(byPropKey('username', event.target.value))}
                  type="text"
                  placeholder="Username (more than 6 characters)"
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  icon='lock'
                  iconPosition='left'
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  type="password"
                  placeholder="Password (more than 6 characters)"
                />
                </Form.Field>

                <Form.Field>
                  By signing up, you agree to our Terms of Conditions.
                </Form.Field>
                <Button color='teal' fluid disabled={isInvalid}>
                  <Icon name='checkmark' /> Sign Up
                </Button>
                <Form>
                  <Input type='text' onChange={(e) => this.test(e)}></Input>
                </Form>
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
