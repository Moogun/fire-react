import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './account/SignOut';
import * as routes from '../constants/routes';
import PropTypes from 'prop-types'
import SignUp from './account/SignUp'
import SignIn from './account/SignIn'
import Create from './courseManage/Create'
import {auth} from '../firebase'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal } from 'semantic-ui-react'

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

class NavigationAuth extends Component {

  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const {activeItem} = this.state
    const { fixed } = this.state
    return (
            <Menu >
              <Container>
                <Menu.Item  as={Link} to={routes.LANDING}
                  name='landing' active={activeItem === 'landing'} onClick={this.handleItemClick} />

                  <Menu.Item as={Link} to={routes.HOME}
                    name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />

                  <Dropdown item text='category' icon='grid layout'>
                    <Dropdown.Menu>
                      <Dropdown.Item > <Icon name='grid layout'/>111 </Dropdown.Item>
                      <Dropdown.Item as={Link} to={routes.CREATE}> 2222 </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Menu.Item as={Link} to={routes.CREATE}
                    name='Create' active={activeItem === 'create'} onClick={this.handleItemClick}>
                      <Create />
                    </Menu.Item>

                  <Menu.Menu position='right'>
                    <Menu.Item as={Link} to={routes.MY_COURSES}
                      name='my courses' active={activeItem === 'mycourses'} onClick={this.handleItemClick} />
                  </Menu.Menu>

                  <Dropdown item text='Account'>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={routes.ACCOUNT}>
                          Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={auth.doSignOut}>
                           SignOut
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
             </Container>
           </Menu>
    )
  }
}

class NavigationNonAuth extends Component {

  state = {}
  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const {activeItem} = this.state
    const { fixed } = this.state
    return (
            <Menu >
              <Container>
                <Menu.Item  as={Link} to={routes.LANDING}
                  name='landing' active={activeItem === 'landing'} onClick={this.handleItemClick} />

                  <Menu.Item as={Link} to={routes.HOME}
                    name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />

                  <Dropdown item text='instructor'>
                    <Dropdown.Menu>
                      <Dropdown.Item > Manage your course </Dropdown.Item>
                      <Dropdown.Item as={Link} to={routes.CREATE}> Register your course </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Menu.Menu position='right'>
                    <Menu.Item as={Link} to={routes.SIGN_IN}
                      name='Sign In' active={activeItem === 'signin'} onClick={this.handleItemClick}>
                        <SignIn />
                      </Menu.Item>
                    <Menu.Item as={Link} to={routes.SIGN_UP}
                        name='Sign Up' active={activeItem === 'signup'} onClick={this.handleItemClick} >
                        <SignUp />
                      </Menu.Item>
                  </Menu.Menu>

             </Container>
           </Menu>
    )
  }
}


export default Navigation;
