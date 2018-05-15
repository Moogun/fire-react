import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Dropdown, Input
} from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';
import profile from '../../assets/profile-lg.png'

import Category from './Category'
import HomepageHeading from './HomepageHeading'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {auth, db} from '../../firebase'

const NAV_MOBILE_NON_AUTH={padding: '0rem'}
const MENU_BORDER={borderRadius: '0', marginBottom: '0'}

class NonAuthContainer extends Component {
  state = {
    calculations: {
     direction: 'none',
     height: 0,
     width: 768,
     topPassed: false,
     bottomPassed: false,
     pixelsPassed: 0,
     percentagePassed: 0,
     topVisible: false,
     bottomVisible: false,
     fits: false,
     passing: false,
     onScreen: false,
     offScreen: false,
   },
  }

  handleContextRef = contextRef => this.setState({ contextRef })
  handleUpdate = (e, { calculations }) => this.setState({ calculations })

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

  render() {
    const { children } = this.props
    const { fixed, activeItem, sidebarOpened, searchFieldActive } = this.state
    // console.log('mobile container', authUser);

    const { calculations, contextRef } = this.state
    // console.log('calculations. width', calculations.width);
    let mobile = calculations.width < 768 ? true : false

    return (
      <div ref={this.handleContextRef}>
          <Sidebar.Pushable>
             <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
                <Menu.Item as={Link} to='/' active onClick={this.handlePusherClick} >We </Menu.Item>
                {/* <Menu.Item as='a'>Category</Menu.Item> */}
                <Menu.Item
                  as={Link} to={routes.TEACHER_INTRO} onClick={this.handlePusherClick}
                  >Are you teaching?</Menu.Item>
                <Menu.Item
                  as={Link} to={routes.FOOTER_HELP}
                  onClick={this.handlePusherClick}
                  >Help</Menu.Item>
                <Menu.Item name='Log in' active={activeItem === 'signin'}
                  as={Link} to={routes.SIGN_IN}
                  onClick={this.handlePusherClick}
                   >
                </Menu.Item>

                <Menu.Item name='Sign Up' active={activeItem === 'signup'}
                  as={Link} to={routes.SIGN_UP}
                  onClick={this.handleToggle}
                   >
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
              <Visibility onUpdate={this.handleUpdate}>
                <Segment textAlign='center'
                  // style={NAV_MOBILE_NON_AUTH}
                  // style={{ minHeight: 350, padding: '1em 0em' }}
                  vertical>
                  {/* <Container> */}
                      <Menu pointing secondary >
                        <Container>
                          {!mobile
                            ? null
                            : <Menu.Item onClick={this.handleToggle}>
                                <Icon name='sidebar' />
                              </Menu.Item> }
                          <Menu.Item name='weqna' active={activeItem === 'weqna'} onClick={this.handleItemClick}
                            as={Link} to={routes.HOME}>
                            {!mobile ? 'We qna' : 'We qna'}
                          </Menu.Item>

                          <Menu.Item position='right'>
                            <Button
                              as={Link} to={routes.SIGN_IN}>
                              Log in</Button>
                            <Button   as={Link} to={routes.SIGN_UP} style={{ marginLeft: '0.5em' }}>
                              Sign Up</Button>
                          </Menu.Item>
                        </Container>
                      </Menu>
                        {searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid
                          // size='large'
                        icon={<Icon name='search' inverted circular link onClick={this.handleSearchClick}/>}
                       /> : null}
                  {/* </Container>*/}
                  {/* <HomepageHeading mobile /> */}
                </Segment>
              </Visibility>
            {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    )
  }
}

NonAuthContainer.propTypes = {
  children: PropTypes.node,
}

export default NonAuthContainer
