import React, { Component } from 'react'
import profile from '../../assets/profile-lg.png'

import { Segment, Button, Header, Icon, Divider, Form, Input, Message} from 'semantic-ui-react'

const Profile = ({user, email, username, usernameTaken, displayName, change, submit}) => {
  const isInvalid =
        !!user && user.username === username && !!user && user.displayName === displayName
        !!username && username === '' ||
        !!username && username.length < 6 ;
  return (
      <Segment basic>
        <Header as='h2'>Profile</Header>
        <Divider />
        <Form size='small' onSubmit={submit}>
          <Form.Field>
            <label>Email</label>
            <Input placeholder='Email' name='email' value={email} readOnly />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            {usernameTaken && <Message negative>
                <Message.Header>{usernameTaken}</Message.Header>
            </Message> }
            <Input placeholder='Username' name='username' value={username} onChange={change}
            />
          </Form.Field>
          <Form.Field>
            <label>DisplayName</label>
            <Input placeholder='DisplayName' name='displayName' value={displayName} onChange={change} />
          </Form.Field>

          <Button type='submit' disabled={isInvalid} >Update</Button>
        </Form>
      </Segment>
  )
}

export default Profile
