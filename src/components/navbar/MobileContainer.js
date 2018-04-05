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

class MobileContainer extends Component {
  state = {}

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { children, st, authUser } = this.props
    const { fixed, activeItem, sidebarOpened } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>
          { authUser
              ? <MobileAuth
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handleToggle={this.handleToggle}/>
              : <MobileNonAuth
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handleToggle={this.handleToggle}/>
          }
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

export default MobileContainer


const MobileAuth = ({children, authUser, sidebarOpened, handlePusherClick, handleToggle}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to='/' active>Home</Menu.Item>
          <Menu.Item as={Link} to='/home'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment inverted textAlign='center' style={{ minHeight: 350, padding: '1em 0em' }} vertical>
          <Container>
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
                  <Icon name='sidebar' />
                </Menu.Item>
                <Menu.Item position='right'>
                  {/* <Button as='a' inverted>Log in</Button>
                  <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button> */}
                </Menu.Item>
              </Menu>
          </Container>
          <HomepageHeading mobile />
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

const MobileNonAuth = ({children, sidebarOpened, handlePusherClick, handleToggle}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to='/' active>Home</Menu.Item>
          <Menu.Item as={Link} to='/home'>Work</Menu.Item>
          <Menu.Item as='a'>Company</Menu.Item>
          <Menu.Item as='a'>Careers</Menu.Item>
          <Menu.Item as='a'>Log in</Menu.Item>
          <Menu.Item as='a'>Sign Up</Menu.Item>
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
          </Container>
          <HomepageHeading mobile />
        </Segment>
      {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}
