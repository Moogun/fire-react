import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from './account/SignOut';
import * as routes from '../constants/routes';
import PropTypes from 'prop-types'
// import SignUp from './account/SignUp'
// import SignIn from './account/SignIn'
import AuthModal from './account/AuthModal'
import PasswordForget from './account/PasswordForget'

import Create from './courseManage/Create'
import {auth, db} from '../firebase'
import imageSrc from '../assets/helen.png'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox } from 'semantic-ui-react'

const Category = () => {
  return (
    <Dropdown text='Category' pointing className='link item'>
      <Dropdown.Menu>
        <Dropdown.Header>Categories</Dropdown.Header>
        <Dropdown.Item>
          <Dropdown text='Clothing'>
            <Dropdown.Menu>
              <Dropdown.Header>Mens</Dropdown.Header>
              <Dropdown.Item>Shirts</Dropdown.Item>
              <Dropdown.Item>Pants</Dropdown.Item>
              <Dropdown.Item>Jeans</Dropdown.Item>
              <Dropdown.Item>Shoes</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Womens</Dropdown.Header>
              <Dropdown.Item>Dresses</Dropdown.Item>
              <Dropdown.Item>Shoes</Dropdown.Item>
              <Dropdown.Item>Bags</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Item>
        <Dropdown.Item>Home Goods</Dropdown.Item>
        <Dropdown.Item>Bedroom</Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Header>Order</Dropdown.Header>
        <Dropdown.Item>Status</Dropdown.Item>
        <Dropdown.Item>Cancellations</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth authUser={authUser}/>
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

  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  handleSearchField = () => {this.setState ({ searchFieldActive: !this.state.searchFieldActive})
    console.log('s field', this.state.searchFieldActive);
  }

  render() {
    const {activeItem, fixed, sidebarOpened, searchFieldActive} = this.state

    const {authUser, side} = this.props

    let searchField = searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid /> : null

    return (
      <div>

        <Responsive {...Responsive.onlyComputer}>
          <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            <Menu >
              <Container>

                  <Menu.Item as={Link} to={routes.HOME}
                    name='Weqna' active={activeItem === 'home'} onClick={this.handleItemClick} />

                  <Category />

                  <Dropdown item text='Teacher' >
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to='/create'
                        name='my courses' active={activeItem === 'create'} onClick={this.handleItemClick}>
                        Create
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to='/dashboard'
                        name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}>
                          Manage Courses
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Menu.Item as={Link} to={routes.MY_COURSES}
                    name='my courses' active={activeItem === 'mycourses'} onClick={this.handleItemClick} />

                  <Dropdown item text='Account' >
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to={routes.ACCOUNT}>
                        {authUser.email}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={auth.doSignOut}>
                           SignOut
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

             </Container>
           </Menu>
           </Visibility>
         </Responsive>


         <Responsive {...Responsive.onlyMobile}>
           <Sidebar.Pushable>
              <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
                <Menu.Item as='a'>{authUser.email}</Menu.Item>
                <Menu.Item as='a'>Categories</Menu.Item>
                <Menu.Item as='a'>My Courses</Menu.Item>
                <Menu.Item as='a'>My Messages</Menu.Item>
                <Menu.Item as='a'>My Wishlist</Menu.Item>
                <Menu.Item as='a'>Settings</Menu.Item>
                <Menu.Item as='a'>Help</Menu.Item>
                <Menu.Item onClick={auth.doSignOut} >Logout</Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
                <Segment inverted textAlign='center' style={{ minHeight: 20, padding: '1em 0em' }} vertical>
                  <Container>
                    <Menu inverted pointing secondary size='large'>
                      <Menu.Item onClick={this.handleToggle}>
                        <Icon name='sidebar' />
                      </Menu.Item>
                      <Menu.Item onClick={this.handleSearchField}>
                        <Icon name='search' />
                      </Menu.Item>
                      <Menu.Item>
                        Logo We qna
                      </Menu.Item>
                      <Menu.Item>
                        My Courses
                      </Menu.Item>
                    </Menu>
                    {searchField}
                  </Container>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
         </Responsive>

     </div>
    )
  }
}



class NavigationNonAuth extends Component {

  state = {
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  handleSearchField = () => this.setState ({ searchFieldActive: !this.state.searchFieldActive})

  render() {
    const {activeItem, fixed, sidebarOpened, searchFieldActive, authReq} = this.state

    let searchField = searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid /> : null

    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
            <Menu >
              <Container>
                <Menu.Item  as={Link} to={routes.LANDING}
                  name='landing' active={activeItem === 'landing'} onClick={this.handleItemClick} />
                  <Category />

                  <Menu.Menu position='right'>

                    <Menu.Item as='a' name='Sign In' active={activeItem === 'signin'} >
                      <Modal trigger={<p>Log In</p>} size='mini' closeIcon >

                        <AuthModal authReq={'login'} />
                      </Modal>
                    </Menu.Item>


                    <Menu.Item as='a' name='Sign Up' active={activeItem === 'signup'}>
                      <Modal trigger={<p>Sign Up</p>} size='mini'>
                        <AuthModal authReq={'signup'}/>
                      </Modal>
                    </Menu.Item>

                  </Menu.Menu>
             </Container>

           </Menu>

             <Modal trigger={<p></p>} size='mini'>
             </Modal>
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Sidebar.Pushable>
             <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
               <Menu.Item as='a'>Categories</Menu.Item>
               <Menu.Item as='a'>Register Courses</Menu.Item>
               <Menu.Item as='a'>Help</Menu.Item>
             </Sidebar>

             <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
               <Segment inverted textAlign='center' style={{ minHeight: 20, padding: '1em 0em' }} vertical>
                 <Container>
                   <Menu inverted pointing secondary>
                     <Menu.Item onClick={this.handleToggle}>
                       <Icon name='sidebar' />
                     </Menu.Item>
                     <Menu.Item onClick={this.handleSearchField}>
                       <Icon name='search' />
                     </Menu.Item>
                     <Menu.Item>
                       Logo We qna
                     </Menu.Item>
                     <Menu.Item position='right'>
                       Cart
                     </Menu.Item>
                   </Menu>
                   {searchField}
                 </Container>
               </Segment>
             </Sidebar.Pusher>
           </Sidebar.Pushable>
        </Responsive>

      </div>
    )
  }
}

export default Navigation;
