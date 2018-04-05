import React, { Component } from 'react'
import profile from '../../assets/profile-lg.png'

import { Segment, Button, Header, Icon, Divider, Form, Input} from 'semantic-ui-react'

const Profile = ({email, username, displayName}) => {
  return (
      <Segment basic>
        <Header as='h2'>Profile</Header>
        <Divider />
        <Form size='small'>
          <Form.Field>
            <label>Email</label>
            {/* <input placeholder='Email' defaultValue={email}/> */}
            <Input placeholder='Email' value={email}/>
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <Input placeholder='Username' value={username}/>
          </Form.Field>
          <Form.Field>
            <label>displayName</label>
            <Input placeholder='Name' value={displayName}/>
          </Form.Field>

          <Button type='submit'>Update</Button>
        </Form>
      </Segment>
  )
}

export default Profile
