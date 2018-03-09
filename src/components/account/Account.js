import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {PasswordForgetForm} from './PasswordForget';
import PasswordChanggeForm from './PasswordChange';
import withAuthorization from '../../HOC/withAuthorization';
import profile from '../../assets/profile-lg.png'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item } from 'semantic-ui-react'

const AccountPage = (props, {authUser}) =>
  <div>
    <Segment inverted color='teal'>
      <Container>
        <Header
          as='h3'
          content='Account Settings'
          // inverted
          style={{
            // fontSize: mobile ? '2em' : '3em',
            // fontWeight: 'normal',
            // marginBottom: mobile ? '1.5em' : '1.5em',
            // marginTop: mobile ? '1.5em' : '1em',
          }}
        />
        {/* <Divider /> */}
        <Menu pointing secondary


          size='large'
          // text
        >
          <Container>
            <Menu.Item as='a' active>Account Settings</Menu.Item>
            <Menu.Item as='a'>Security</Menu.Item>
            <Menu.Item as='a'>Notifications</Menu.Item>
          </Container>
        </Menu>
      </Container>
    </Segment>

    <Segment>
      <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>

                  <Menu secondary vertical>
                  <br/>
                  <Image src={profile} circular centered size='small'/>
                  <br/>
                    <Menu.Item name='profile'
                      active
                       // active={activeItem === 'account'} onClick={this.handleItemClick}
                     />
                    <Menu.Item name='photo'
                       // active={activeItem === 'settings'} onClick={this.handleItemClick}
                     />
                     <Menu.Item name='password'
                        // active={activeItem === 'settings'} onClick={this.handleItemClick}
                      />
                      <Menu.Item name='danger'
                         // active={activeItem === 'settings'} onClick={this.handleItemClick}
                       />
                  </Menu>
              </Grid.Column>
              <Grid.Column width={12}>

                <Segment>
                  <Header as='h2'>Profile</Header>
                  <br/>
                  <Divider />
                  <Form size='big'>
                    <Form.Field>
                      <label>Name</label>
                      <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Username</label>
                      <input placeholder='Last Name' />
                    </Form.Field>
                    <Button type='submit'>Update</Button>
                  </Form>
                </Segment>
                <Segment>
                  <Header as='h2'>Change your password</Header>
                  <br/>
                  <Divider />
                  <Form size='big'>
                    <Form.Field>
                      <label>Old password</label>
                      <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>New password</label>
                      <input placeholder='Last Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Confirm password</label>
                      <input placeholder='Last Name' />
                    </Form.Field>
                    <Button type='submit'>Update</Button>
                  </Form>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
      </Container>
    </Segment>
    <PasswordForgetForm />
    <PasswordChanggeForm />
  </div>

AccountPage.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);




// const Account = ({mobile}) => (
//   <div>
//   </div>
// )
//
// Account.propTypes = {
//   mobile: PropTypes.bool,
// }
//
// export default Account
