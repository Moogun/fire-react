import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Category from './Category'
import {auth, db} from '../../firebase'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox } from 'semantic-ui-react'

const menuStyle ={borderRadius: '0px'}

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

            <Menu style={menuStyle}>
              <Container>

                  <Menu.Item as={Link} to={routes.HOME}
                    name='Weqna' active={activeItem === 'home'} onClick={this.handleItemClick} />

                  <Category />

                  <Menu.Item>
                      <Input placeholder='Search...' action={{ icon: 'search' }}/>
                  </Menu.Item>

                  <Menu.Menu  position='right'>
                    <Dropdown item text='Teacher' >
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={routes.CREATE}
                          name='create' active={activeItem === 'create'} onClick={this.handleItemClick}>
                          Create New Course
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={routes.DASHBOARD}
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
                </Menu.Menu>
             </Container>
           </Menu>
           </Visibility>
         </Responsive>


         <Responsive {...Responsive.onlyMobile}>
           <Menu style={menuStyle} icon size='tiny'>
             <Container>
               <Menu.Item  as={Link} to={routes.LANDING}
                 active={activeItem === 'weqna'} onClick={this.handleItemClick}> Wq</Menu.Item>
               <Menu.Item  as={Link} to={routes.LANDING}
                 active={activeItem === 'weqna'} onClick={this.handleItemClick}> <Icon name='browser' /> </Menu.Item>
               <Menu.Item>
                   <Input placeholder='Search...' action={{ icon: 'search' }}/>
               </Menu.Item>
               <Menu.Menu position='right'>
                 <Menu.Item  as={Link} to={routes.MY_COURSES}>
                     <Icon name='book' />
                 </Menu.Item>
                 <Menu.Item as={Link} to={routes.ACCOUNT}
                   active={activeItem === 'signin'}
                   onClick={this.handleItemClick}
                    >
                      <Icon name='user circle' />
                 </Menu.Item>

               </Menu.Menu>
            </Container>

          </Menu>
         </Responsive>

     </div>
    )
  }
}

export default NavAuth
