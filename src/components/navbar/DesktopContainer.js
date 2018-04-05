import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Dropdown, Input
} from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import Category from './Category'
import HomepageHeading from './HomepageHeading'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {auth} from '../../firebase'

const segmentBorder={padding: '0'}
const menuBorder={borderRadius: '0'}

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, st, authUser } = this.props
    const { fixed, activeItem } = this.state
    console.log('st', st);
    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
            { authUser
                ? <DesktopAuth fixed={fixed} activeItem={activeItem} st={st} authUser={authUser}/>
                : <DesktopNonAuth fixed={fixed} activeItem={activeItem} st={st}/>
            }

        </Visibility>
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer

const DesktopAuth = ({authUser, fixed, activeItem, st}) => {
  return (
    <Segment
      // inverted
      basic
      textAlign='center' vertical
      style={segmentBorder}>
      <Menu
        style={menuBorder}
        fixed={fixed ? 'top' : null}
        // inverted={!fixed}
        // pointing={!fixed}
        // secondary={!fixed}
        // size='large'
      >
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
      {/* <HomepageHeading /> */}
    </Segment>
  );
}

const DesktopNonAuth = ({fixed, activeItem, st}) => {
  return (
    <Segment
      // inverted
       textAlign='center' vertical
       basic
       style={segmentBorder}
       >
      <Menu
        fixed={fixed ? 'top' : null}
        // inverted={!fixed}
        // color='blue'
        // pointing={!fixed}
        // secondary={!fixed}
        // size='large'
        style={menuBorder}
      >
        <Container>
          <Menu.Item  as={Link} to={routes.LANDING}
            active={activeItem === 'weqna'} onClick={this.handleItemClick}> We qna </Menu.Item>
            <Category />
          <Menu.Item>
              <Input placeholder='Search...' action={{ icon: 'search' }}/>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item as={Link} to={routes.SIGN_IN}
              name='Sign In' active={activeItem === 'signin'}
              onClick={this.handleItemClick}
               >
            </Menu.Item>

            <Menu.Item as={Link} to={routes.SIGN_UP}
              name='Sign Up' active={activeItem === 'signup'}
              onClick={this.handleItemClick}
               >
            </Menu.Item>
          </Menu.Menu>

        </Container>
      </Menu>
      {/* <HomepageHeading /> */}
    </Segment>
  );
}
