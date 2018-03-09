import React, {Component} from 'react';
import {auth} from '../../firebase';
import * as routes from '../../constants/routes';
import {Link, withRouter} from 'react-router-dom';
import {SignUpLink} from './SignUp';
import {PasswordForgetLink} from './PasswordForget'
import { Button, Image, Modal, Form, Checkbox, Icon, Input } from 'semantic-ui-react'

const SignInPage = ({history}) => (
  <div>
    <SignInForm history={history}/>
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
      <Modal size="mini" trigger={<p> Sign In</p>}>
          <Modal.Header>Sign In</Modal.Header>
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
                  icon='lock'
                  iconPosition='left'
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                  type="password"
                  placeholder="Password"
                />
                </Form.Field>

                <Button color='blue' fluid>
                  <Icon name='checkmark' /> Sign In
                </Button>
            </Form>

          </Modal.Content>

          <Modal.Actions>
            <PasswordForgetLink />
            <SignUpLink />
          </Modal.Actions>

        </Modal>
    );
  }
}

const SignInLink = () =>
  <div>
    <h5>Have an account already?
    {' '} <Link to='/SignIn'> Sign In</Link>
    </h5>
  </div>

export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink,
}
