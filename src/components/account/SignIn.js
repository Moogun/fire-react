import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Divider, Modal } from 'semantic-ui-react'

import {auth} from '../../firebase';
import * as routes from '../../constants/routes';

import {SignUpLink} from './SignUp';
import {PasswordForgetLink, PasswordForgetForm } from './PasswordForget'

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import logo from '../../assets/logo.png'

const responseFacebook = (response) => {
  console.log(response);
}

const SignInPage = ({history}) => (

    <Grid container
      textAlign='center'
      style={{ height: '80%', margin: '5rem' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 350 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src={logo} />
          {' '}Sign-in to your account
        </Header>

          <SignInForm history={history}/>
          {/* <PasswordForgetLink /> */}
          <Modal trigger={<p>Forgot password ? </p>}>
            <PasswordForgetForm />
          </Modal>
          <SignUpLink />

      </Grid.Column>

    </Grid>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    const {email, password} = this.state;
    const { history, } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        this.setState({...INITIAL_STATE})
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
      event.preventDefault();
  }

  signUpWithGoogle = () => {
    console.log('google signing');
    const {history} = this.props;
    auth.doCreateUserWithGoogle()
      .then(result => {
          this.setState(() => ({ ...INITIAL_STATE }));
          history.push(routes.HOME);
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
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
  }

  render() {
    const {email, password, error} = this.state;
    const isInvalid =
    email === '' ||
    password === '';

    return (
        <div>
          <Segment basic style={{marginBottom: '0'}}>
            <FacebookLogin
              appId="1329723160399765"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              render={renderProps => (
                <Button
                  fluid size='tiny'
                  color='facebook'
                  onClick={this.signUpWithFB}
                  >Continue with Facebook</Button>
              )}
            />
            <br/>
            <Button fluid color='google plus' size='tiny' onClick={this.signUpWithGoogle}>
              <Icon name='google plus' />Continue with Google
            </Button>
            <Divider horizontal>Or</Divider>
          </Segment>

          <Form size='large' onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'

                value={email}
                onChange = {(event) => this.setState(byPropKey('email', event.target.value))}
                type="email"
                placeholder="Email"/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'

                value={password}
                onChange = {(event) => this.setState(byPropKey('password', event.target.value))}
                type="password"
                placeholder="Password"/>
                {error && <Message negative>{error.message}</Message>}
              <Button color='teal' fluid size='large' disabled = {isInvalid} type="submit">Log in</Button>

            </Segment>
          </Form>
        </div>
    );
  }
}

const SignInLink = () =>
  <div>
    <Message>Have an account already?
    {' '} <Link to='/SignIn'> Sign In</Link>
    </Message>
  </div>

export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink,
}
