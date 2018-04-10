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

import Dashboard from '../dashboard/Dashboard';

const SEGMENT_BORDER={padding: '0'}
const MENU_BORDER={borderRadius: '0', marginBottom: '0'}

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
  handleSearchClick = () => { console.log('search clicked')}

  render() {
    const { children, st, authUser } = this.props
    const { fixed, activeItem, sidebarOpened, searchFieldActive } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
          { authUser
              ? <MobileAuth
                activeItem={activeItem}
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handleToggle={this.handleToggle}
                searchFieldActive={searchFieldActive}
                handleSearchField={this.handleSearchField}
                handleSearchClick={this.handleSearchClick}
              />
              : <MobileNonAuth
                activeItem={activeItem}
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


const MobileAuth = ({children, authUser, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
         <Menu.Item as={Link} to={routes.ACCOUNT} >Username</Menu.Item>
         <Menu.Item as={Link} to='/category' >Category</Menu.Item>
         <Menu.Item as='a'>My Courses</Menu.Item>
         <Menu.Item as='a'>My Notifications</Menu.Item>
         <Menu.Item as={Link} to={routes.DASHBOARD}>Instructor Dashboard</Menu.Item>
         <Menu.Item as='a'>Help</Menu.Item>
         <Menu.Item as='a' onClick={auth.doSignOut}>Log out</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}
        onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment
          inverted
          textAlign='center'
          style={{
            // minHeight: 350,
             padding: '1em 0em'
           }}
          // style={SEGMENT_BORDER}
          vertical>
          <Container>

                <Menu.Item as='a' onClick={handleToggle} style={{float:'left', color: 'white'}} >
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item as='a' onClick={handleSearchField} style={{float:'left', color: 'white', marginLeft: '1em'}}>
                  {/* was 0.5  */}
                  <Icon name='search' />
                </Menu.Item>
                <Menu.Item as='a' style={{color: 'white'}}> We question and answer </Menu.Item>
                <Menu.Item as={Link} to={routes.ACCOUNT} onClick={this.handleItemClick} style={{float:'right', color: 'white', marginLeft: '1em'}} >
                     <Icon name='user circle' />
                </Menu.Item>
                <Menu.Item  as={Link} to={routes.LEARNING} style={{float:'right', color: 'white',}} >
                  <Icon name='book' />
                </Menu.Item>

                  {searchFieldActive
                    ? <Input className='icon' placeholder='Search...' fluid size='large' style={{marginTop: '1em'}} // action={{ icon: 'search' }}
                    icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>} />
                    : null
                  }

          </Container>
          {/* <HomepageHeading mobile /> */}
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

const MobileNonAuth = ({children, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to='/' active>Home</Menu.Item>
          <Menu.Item as='a'>Category</Menu.Item>
          <Menu.Item as='a'>Are you teaching?</Menu.Item>
          <Menu.Item as='a'>Help</Menu.Item>
          {/* <Menu.Item as='a'>Sign Up</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item> */}
          <Menu.Item as={Link} to={routes.SIGN_IN}
            name='Log in' active={activeItem === 'signin'}
            onClick={handlePusherClick}
             >
          </Menu.Item>

          <Menu.Item as={Link} to={routes.SIGN_UP}
            name='Sign Up' active={activeItem === 'signup'}
            onClick={handleToggle}
             >
          </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment inverted textAlign='center'
          style={SEGMENT_BORDER}
          // style={{ minHeight: 350, padding: '1em 0em' }}
          vertical>
          {/* <Container> */}
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
          {/* </Container>
          <HomepageHeading mobile /> */}
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
