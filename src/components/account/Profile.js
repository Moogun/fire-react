import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {PasswordForgetForm} from './PasswordForget';
import PasswordChanggeForm from './PasswordChange';
import withAuthorization from '../../HOC/withAuthorization';
import profile from '../../assets/profile-lg.png'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item } from 'semantic-ui-react'

const Profile = () =>
    <Segment>
      <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>

                <Segment>
                  <Header as='h2'>Profile</Header>
                  <br/>
                  <Divider />
                  <Form size='big'>
                    <Form.Field>
                      <label>Username</label>
                      <input placeholder='Username' defaultValue={'dddd'}/>
                    </Form.Field>
                    <Form.Field>
                      <label>Name</label>
                      <input placeholder='Name' />
                    </Form.Field>

                    <Button type='submit'>Update</Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Container>
    </Segment>

export default Profile
