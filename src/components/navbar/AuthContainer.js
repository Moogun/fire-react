import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Dropdown, Input
} from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';

import Category from './Category'
import HomepageHeading from './HomepageHeading'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {auth, db} from '../../firebase'
import logo from '../../assets/logo.png'

import MyCourseQuizTaking from '../coursePageMy/MyCourseQuizTaking';

import profile from '../../assets/profile-lg.png'

const MENU_BORDER={borderRadius: '0', marginBottom: '0'}

class AuthContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handlePusherClickAndLogout = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
    auth.doSignOut()
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  handleSearchField = () => this.setState ({ searchFieldActive: !this.state.searchFieldActive})

  handleSearchClick = () => { console.log('search clicked')}

  componentDidMount(){

    const {authUser} = this.props

      db.onceGetUser(authUser.uid)
      .then(res => this.setState ({ user: res.val() }))
      .then(

        db.doFetchTeaching(authUser.uid)
        .then(res => this.setState ({teachingList: res.val() }))
        .catch(error => {
          this.setState({[error]: error});
        })
      )

      .catch(error => {
        this.setState({[error]: error});
      })
  }

  render() {

    const {
      activeItem, user, teachingList, attendingCourses,
      sidebarOpened, handlePusherClick, handlePusherClickAndLogout, handleToggle,
      searchFieldActive, handleSearchField, handleSearchClick,
      } = this.state

    const { children, authUser, fixed } = this.props

    return (
      <div>
      <Responsive minWidth={992}>

        <Segment
          // inverted
          basic
          textAlign='center' vertical
          style={style.NAV_MENU_SEGMENT_BORDER}
           >
          <Menu
            style={style.NAV_MENU_BORDER}
            fixed={fixed ? 'top' : null}
            // inverted={!fixed}
            // pointing={!fixed}
            // secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item as={Link} to={routes.HOME}
                // name='Weqna'
                 active={activeItem === 'home'} onClick={this.handleItemClick} >
                <img src={logo} />
              </Menu.Item>
              {/* <Category /> */}
              <Menu.Item>
                  <Input placeholder='Search...' action={{ icon: 'search' }} style={{width: '350px'}}/>
              </Menu.Item>
              <Menu.Menu  position='right'>
                {!!teachingList ?
                <Dropdown item text='Teacher'>
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
                : <Menu.Item as={Link} to={routes.TEACHER_INTRO}
                  name='teaching' active={activeItem === 'teaching?'} onClick={this.handleItemClick}> Are You Teaching?</Menu.Item>
                }

                <Menu.Item as={Link} to={routes.LEARNING}
                  name='my courses' active={activeItem === 'mycourses'} onClick={this.handleItemClick} />

                <Dropdown item text={!!user ? user.username : 'Account'} >
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
          {/* <HomepageHeading /> */}
          {children}
        </Segment>

      </Responsive>

      <Responsive minWidth={320} maxWidth={991}>
        <Sidebar.Pushable>
           <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
             <Menu.Item
               as={Link} to={routes.ACCOUNT}
               onClick={this.handlePusherClick} >{!!user ?
                 <Header as='h5' inverted>
                   <Image circular src={!!user.photoUrl ? user.photoUrl : profile } />
                   <Header.Content>
                     {user.username}
                     <Header.Subheader>
                       {user.email}
                     </Header.Subheader>
                   </Header.Content>
                 </Header>
                 : 'My Account'
               }
             </Menu.Item>
             {/* <Menu.Item as={Link} to='/category' onClick={this.handlePusherClick}>Category</Menu.Item> */}
             <Menu.Item as={Link} to={routes.LEARNING} onClick={this.handlePusherClick}>My Courses</Menu.Item>
             <Menu.Item as={Link} to='/notifications' onClick={this.handlePusherClick}>My Notifications</Menu.Item>
             <Menu.Item as={Link} to={!!teachingList ? routes.DASHBOARD : routes.TEACHER_INTRO} onClick={this.handlePusherClick}>{!!teachingList ? 'Instructor Dashboard' : 'Are You Teaching?'} </Menu.Item>
             <Menu.Item as={Link} to={routes.FOOTER_HELP} onClick={this.handlePusherClick}>Help</Menu.Item>
             <Menu.Item as='a' onClick={this.handlePusherClickAndLogout}>Log out</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}
            onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment
              inverted
              textAlign='center'
              style={{
                 // minHeight: 350,
                 padding: '1em 0em'
               }}
              // style={NAV_MOBILE_AUTH}
              vertical>
              <Container>

                    <Menu.Item as='a' onClick={this.handleToggle} style={{float:'left', color: 'white'}} >
                      <Icon name='sidebar' />
                    </Menu.Item>

                    <Menu.Item as='a' onClick={this.handleSearchField} style={{float:'left', color: 'white', marginLeft: '1rem'}}>
                      {/* was 0.5  */}
                      <Icon name='search' />
                    </Menu.Item>

                    <Menu.Item as='a' style={{color: 'white'}}
                      as={Link} to={routes.HOME}
                      > We question and answer </Menu.Item>
                    <Menu.Item as={Link} to={routes.ACCOUNT} onClick={this.handleItemClick} style={{float:'right', color: 'white', marginLeft: '1rem'}} >
                      <Icon name='user circle' />
                    </Menu.Item>

                    <Menu.Item  as={Link} to={routes.LEARNING}
                      style={{float:'right', color: 'white',}}
                      >
                      <Icon name='folder outline' />
                    </Menu.Item>

                      {searchFieldActive
                        ? <Input className='icon' placeholder='Search...'
                          fluid
                          // size='large'
                          style={{marginTop: '1em'}} // action={{ icon: 'search' }}
                        icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>} />
                        : null
                      }

              </Container>
              {/* <HomepageHeading mobile /> */}
            </Segment>
          {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>

      </div>
    )
  }
}

AuthContainer.propTypes = {
  children: PropTypes.node,
}

export default AuthContainer
