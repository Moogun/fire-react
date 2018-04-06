import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase'
import { Modal, Form, Input, Button, Segment, Header, Message } from 'semantic-ui-react'

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
      sentMsgHidden: true,
    };
  }

  onSubmit =(event) => {
    const { email } = this.state;
    auth.doPasswordReset(email)
      .then(() => {this.setState( () => ({...INITIAL_STATE, sentMsgHidden: false}))
      })
      .catch( (error) => {this.setState(byPropKey('error', error))
      });
    event.preventDefault();
  }

  render() {

    const { email, error, sentMsgHidden} = this.state;
    const { click, open, } = this.props;
    const isInvalid = email === '';

    return (

      <Segment basic>
            <Header as='h2' dividing>Reset your password</Header>
            <Message positive hidden={sentMsgHidden}>'Email was sent. Please check your email'</Message>
            <Modal.Content>
              <Form onSubmit={this.onSubmit}>
                { error && <Message negative>{error.message}</Message> }
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

              </Form>
            </Modal.Content>
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
