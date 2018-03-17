import React, { Component } from 'react'
import profile from '../../assets/profile-lg.png'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Image, Form} from 'semantic-ui-react'

const Profile = (props) => {
  return (
      <Segment basic>
        <Header as='h2'>Profile</Header>
        <Divider />
        <Form size='small'>
          <Form.Field>
            <label>Email</label>
            <input placeholder='Email' defaultValue={props.authUser.email}/>
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username'/>
          </Form.Field>
          <Form.Field>
            <label>displayName</label>
            <input placeholder='Name' defaultValue={props.authUser.displayName}/>
          </Form.Field>

          <Button type='submit'>Update</Button>
        </Form>
      </Segment>
  )
}

export default Profile
