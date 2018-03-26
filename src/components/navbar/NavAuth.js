import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Category from './Category'
import {auth, db} from '../../firebase'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox } from 'semantic-ui-react'

class NavAuth extends Component {

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
                      <Dropdown.Item as={Link} to={routes.CREATE}
                        name='create' active={activeItem === 'create'} onClick={this.handleItemClick}>
                        Create New Course
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to={routes.T_DASHBOARD}
                        name='dashboard'
                        active={activeItem === 'dashboard'}
                        onClick={this.handleItemClick}
                        >
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
              <Sidebar as={Menu} animation='overlay' inverted vertical visible={sidebarOpened}
                >
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
                <Grid celled centered style={{padding: '4em'}}>
                  <Grid.Column width={3}  textAlign='center'>
                      <Menu.Item fitted name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
                      <Icon name='question'/> We Qna
                      </Menu.Item>
                    </Grid.Column>
                    <Grid.Column width={9} >
                     <Input transparent fluid icon='search' iconPosition='left' placeholder='Search...' />
                  </Grid.Column>
                  <Grid.Column width={2} textAlign='center'>
                    <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick} >
                     <Icon name='book' />
                    </Menu.Item>
                  </Grid.Column>
                <Grid.Column width={2} textAlign='center'>
                    <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
                     <Icon name='user' />
                    </Menu.Item>
                 </Grid.Column>
              </Grid>
              </Sidebar.Pusher>
            </Sidebar.Pushable>

         </Responsive>

     </div>
    )
  }
}

export default NavAuth
