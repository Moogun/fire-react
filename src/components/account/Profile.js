import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {PasswordForgetForm} from './PasswordForget';
import PasswordChanggeForm from './PasswordChange';
import withAuthorization from '../../HOC/withAuthorization';
import profile from '../../assets/profile-lg.png'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item } from 'semantic-ui-react'

const Profile = (props) => {
  // console.log('profile', props);
  // console.log('profile', props.authUser.email);
  return (
    <Segment >
      <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>

                <Segment basic>
                  <Header as='h2'>Profile</Header>
                  <br/>
                  <Divider />
                  <Form size='big'>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Container>
    </Segment>
  )
}


export default Profile
