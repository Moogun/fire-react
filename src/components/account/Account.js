import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom'
import withAuthorization from '../../HOC/withAuthorization';
import profile from '../../assets/profile-lg.png'

import Profile from './Profile'
import Photo from './Photo'
import {PasswordForgetForm} from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import Danger from './Danger'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item } from 'semantic-ui-react'

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {match} = this.props
    console.log('account props',this.props);
    console.log('account authUser',this.context.authUser);
    const {authUser} = this.context
    const { activeItem } = this.state
    return (
      <div style={{minHeight: '700px'}} >
        <Grid padded centered>
          <Grid.Row>
            <Grid.Column width={3}>
                <Menu vertical>
                <br/>
                <Image src={profile} circular centered size='small'/>
                <br/>
                <Menu.Item name='profile'
                  active
                  as={Link} to='/account/profile'
                  active={activeItem === 'profile'} onClick={this.handleItemClick}
                 />
                <Menu.Item name='photo'
                  as={Link} to='/account/photo'
                    active={activeItem === 'photo'} onClick={this.handleItemClick}
                 />
                 <Menu.Item name='passwordChange'
                  as={Link} to='/account/passwordChange'
                   // as={Link} to={`${match.url}/passwordChange`}
                    active={activeItem === 'passwordChange'} onClick={this.handleItemClick}
                />
                <Menu.Item name='passwordForget'
                 as={Link} to='/account/passwordForget'
                  // as={Link} to={`${match.url}/passwordChange`}
                   active={activeItem === 'passwordForget'} onClick={this.handleItemClick}
                 />
                <Menu.Item name='danger'
                  as={Link} to='/account/danger'
                   active={activeItem === 'danger'} onClick={this.handleItemClick}
                 />
              </Menu>
            </Grid.Column>
            <Grid.Column width={10}>
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
                                {/* <input placeholder='Email' defaultValue={props.authUser.email} */}
                                />
                              </Form.Field>
                              <Form.Field>
                                <label>Username</label>
                                <input placeholder='Username'/>
                              </Form.Field>
                              <Form.Field>
                                <label>displayName</label>
                                {/* <input placeholder='Name' defaultValue={props.authUser.displayName} */}
                                />
                              </Form.Field>

                              <Button type='submit'>Update</Button>
                            </Form>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                </Container>
              </Segment>
                <Route path='/account/profile' render={(props) => <Profile {...props} authUser={authUser}/>} />
                <Route path='/account/photo' render={() => <Photo />} />
                <Route path='/account/passwordChange' render={ () => <PasswordChangeForm />} />
                <Route path='/account/passwordForget' render={ () => <PasswordForgetForm />} />
                <Route path='/account/danger' render={() => <Danger />} />

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

AccountPage.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
