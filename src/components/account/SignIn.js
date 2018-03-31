// import React, {Component} from 'react';
// import {auth} from '../../firebase';
// import * as routes from '../../constants/routes';
// import {Link, withRouter} from 'react-router-dom';
// import {SignUpLink} from './SignUp';
// import SignUp from './SignUp'
// import {PasswordForgetLink} from './PasswordForget'
// import { Button, Image, Modal, Form, Checkbox, Icon, Input, Divider, Segment, Header } from 'semantic-ui-react'

import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

import {auth} from '../../firebase';
import * as routes from '../../constants/routes';

import {SignUpLink} from './SignUp';
import {PasswordForgetLink} from './PasswordForget'


const SignInPage = ({history}) => (
  <div className='login-form'>

    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>

    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' />
          {' '}Sign-in to your account
        </Header>

          <SignInForm history={history}/>
          <PasswordForgetLink />
          <SignUpLink />

      </Grid.Column>

    </Grid>
  </div>
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

  render() {
    const {email, password, error} = this.state;
    const isInvalid =
    email === '' ||
    password === '';

    return (
        <div>
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
              <Button color='teal' fluid size='large' disabled = {isInvalid} type="submit">Sign In</Button>
              {error && <p>{error.message}</p>}
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
