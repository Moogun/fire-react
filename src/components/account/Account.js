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

  componentDidMount(){
    console.log('did mount');
  }

  render() {
    const {match} = this.props
    console.log('account props',this.props);
    console.log('account authUser',this.context.authUser);
    const {authUser} = this.context
    const { activeItem } = this.state
    console.log('authUser.photoURL', authUser.photoURL);
    let profileImgUrl = authUser.photoURL ? authUser.photoURL : profile
    return (
      <Container text>
        <Grid celled stackable>
          <Grid.Row centered>
            <Grid.Column width={4}>
                <Menu vertical secondary fluid>
                <br/>
                <Image src={profileImgUrl} circular centered fluid/>
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

            <Grid.Column width={12}>

                <Route path='/account/profile' render={(props) => <Profile {...props} authUser={authUser}/>} />
                <Route path='/account/photo' render={() => <Photo photo={profileImgUrl}/>} />
                <Route path='/account/passwordChange' render={ () => <PasswordChangeForm />} />
                <Route path='/account/passwordForget' render={ () => <PasswordForgetForm />} />
                <Route path='/account/danger' render={() => <Danger />} />

            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

AccountPage.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
