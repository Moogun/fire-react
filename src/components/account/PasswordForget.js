import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase'
import { Modal, Form, Input, Button, Segment } from 'semantic-ui-react'

const PasswordForgetPage = (props) =>
  <div>
    {/* <h1>PasswordForget Page</h1> */}
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
    };
  }

  onSubmit =(event) => {
    const { email } = this.state;
    auth.doPasswordReset(email)
      .then(() => {this.setState( () => ({...INITIAL_STATE}))
      })
      .catch( (error) => {this.setState(byPropKey('error', error))
      });
    event.preventDefault();
  }

  render() {

    const { email, error, } = this.state;
    const { click, open, } = this.props;
    const isInvalid = email === '';

    return (
        // <div>
        //     <Form onSubmit={this.onSubmit}>
        //       <Input
        //       value={this.state.email}
        //       onChange={event => this.setState(byPropKey('email', event.target.value))}
        //       type="text"
        //       placeholder="Registered Email Address"
        //     />
        //     <Button disabled={isInvalid} type="submit">
        //       Reset My Password
        //     </Button>
        //
        //     { error && <p>{error.message}</p> }
        //   </Form>
        // </div>

      <Segment basic>
            <Modal.Header>Reset your password</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Input
                      icon='mail'
                      iconPosition='left'
                      value={email}
                      onChange={(event) => this.setState(byPropKey('email', event.target.value))}
                      type="email"
                      placeholder="Registered Email Address"
                    />
                </Form.Field>
                <Button disabled={isInvalid} type="submit">
                  Reset My Password
                </Button>
                { error && <p>{error.message}</p> }
              </Form>

            </Modal.Content>

            {/* <Modal.Actions>
              <p onClick={click}> do some other than resetting</p>
            </Modal.Actions> */}

        </Segment>
    );
  }
}

const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
