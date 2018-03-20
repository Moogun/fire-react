import React, {Component} from 'react';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Divider, Segment } from 'semantic-ui-react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import PasswordForget from './PasswordForget'

class AuthModal extends Component {

  state = {}

  render() {

    const {authReq} = this.props

    let authForm;
    if (authReq === 'signup') {
      authForm = <SignUp
        // toLogin={this.toggleToLogin}
      />
    } else if (authReq === 'signin'){
      authForm = <SignIn
        // toSignUp={this.toggleToSignUp}
        // toResetPass={this.toggleToResetPass}
       />
    } else if (authReq === 'reset') {
      authForm = <PasswordForget />
    }

    return (
        <Segment basic>
          {authForm}
          {/* <p onClick={() => this.setState({authReq: 'login'})}> login</p> */}
        </Segment>
    );
  }
}

export default AuthModal
