import React, {Component} from 'react';
import { Button, Image, Modal, Form, Checkbox, Icon, Input, Divider, Segment } from 'semantic-ui-react'
import SignUp from './SignUp'
import SignIn from './SignIn'
import PasswordForget from './PasswordForget'

// const AuthModal = (props) => {
//   console.log('auth modal props',props.auth);
//   let authForm;
//   if (props.auth === 'signup') {
//     authForm = <SignUp />
//   } else {
//     authForm = <SignIn />
//   }
//
//   return (
//     <div>
//       {authForm}
//     </div>
//   );
// }

class AuthModal extends Component {

  state = {
    req: '',
  };

  componentDidMount(){
    console.log('auth modal props',this.props);
    const {authReq} = this.props
    this.setState({authReq: authReq})
  }

  // signInClick = () => {
  //   console.log('sign in clicked');
  //   this.setState({req: 'login'})
  // }
  // componentWillUnmount() {
  //   console.log('unmount');
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   console.log('will receive', nextProps);
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should cpnt update', nextProps, nextState);
  //   return true
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //   console.log('will update', nextProps, nextState);
  //   console.log('will update', this.state.req);
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('did update', prevProps, prevState);
  //   console.log('did update', this.state.req);
  // }

  toggleToLogin = () => {
    console.log(1);
    this.setState({authReq: 'login'})
  }

  toggleToSignUp = () => {
    console.log(2);
    this.setState({authReq: 'signup'})
  }

  toggleToResetPass = () => {
    console.log(3);
    this.setState({authReq: 'reset'})
  }

  render() {

    const {authReq} = this.state

    let authForm;
    if (authReq === 'signup') {
      authForm = <SignUp toLogin={this.toggleToLogin}/>
    } else if (authReq === 'login'){
      authForm = <SignIn toSignUp={this.toggleToSignUp} toResetPass={this.toggleToResetPass}/>
    } else if (authReq === 'reset') {
      authForm = <PasswordForget />
    }

    return (
        <div>
          {authForm}
          <p onClick={() => this.setState({authReq: 'login'})}> login</p>
        </div>
    );
  }
}

export default AuthModal
