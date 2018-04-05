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
const menuBorder={borderRadius: '0', marginBottom: '0'}

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state
    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  handleSearchField = () => {this.setState ({ searchFieldActive: !this.state.searchFieldActive})
    console.log('s field', this.state.searchFieldActive);
  }
  handleSearchClick = () => {
    console.log('search clicked');
  }

  render() {
    const { children, st, authUser } = this.props
    const { fixed, activeItem, sidebarOpened, searchFieldActive } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
          { authUser
              ? <MobileAuth
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handleToggle={this.handleToggle}
                searchFieldActive={searchFieldActive}
                handleSearchField={this.handleSearchField}
                handleSearchClick={this.handleSearchClick}
              />
              : <MobileNonAuth
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handleToggle={this.handleToggle}
                handleSearchField={this.handleSearchField}
                handleSearchClick={this.handleSearchClick}
              />
          }
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

export default MobileContainer


const MobileAuth = ({children, authUser, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
         <Menu.Item as={Link} to='/account' active>Username</Menu.Item>
         <Menu.Item as={Link} to='/category' active>Category</Menu.Item>
         <Menu.Item as='a'>My Courses</Menu.Item>
         <Menu.Item as='a'>My Notifications</Menu.Item>
         <Menu.Item as='a'>Instructor Dashboard</Menu.Item>
         <Menu.Item as='a'>Help</Menu.Item>
         <Menu.Item as='a'>Log out</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment
          // inverted
          textAlign='center'
          // style={{ minHeight: 350, padding: '1em 0em' }}
          style={segmentBorder}
          vertical>
          {/* <Container> */}
              <Menu
                // inverted
                // pointing
                // secondary
                // size='large'
                style={menuBorder}
                >
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item as='a' onClick={handleSearchField}>
                  <Icon name='search' />
                </Menu.Item>
                <Menu.Item as='a'>
                  We qna
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item  as={Link} to={routes.MY_COURSES}>
                      <Icon name='book' />
                  </Menu.Item>
                  <Menu.Item as={Link} to={routes.ACCOUNT}
                    onClick={this.handleItemClick}
                     >
                       <Icon name='user circle' />
                  </Menu.Item>
                </Menu.Menu>
              </Menu>
              {searchFieldActive? <Input className='icon' placeholder='Search...' fluid     size='large'
                 // action={{ icon: 'search' }}
                  icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>}
               /> : null}

          {/* </Container> */}
          {/* <HomepageHeading mobile /> */}
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

const MobileNonAuth = ({children, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to='/' active>Home</Menu.Item>
          <Menu.Item as='a'>Category</Menu.Item>
          <Menu.Item as='a'>Are you teaching?</Menu.Item>
          <Menu.Item as='a'>Help</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
          <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted>Log in</Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                </Menu.Item>
              </Menu>
                {searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid
                  size='large'
                icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>}
               /> : null}
          </Container>
          <HomepageHeading mobile />
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
