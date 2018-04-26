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
  state = {}

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
    const { children, mobile } = this.props
    const { fixed, activeItem, sidebarOpened, searchFieldActive } = this.state
    // console.log('mobile container', authUser);
    return (
      <div>
      <Responsive minWidth={992}>
        <Segment
          // inverted
           textAlign='center' vertical
           basic
           style={style.NAV_MENU_SEGMENT_BORDER}
           >
          <Menu
            fixed={fixed ? 'top' : null}
            // inverted={!fixed}
            // color='blue'
            // pointing={!fixed}
            // secondary={!fixed}
            size='large'
            style={style.NAV_MENU_BORDER}
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
      </Responsive>
      <Responsive minWidth={320} maxWidth={991}>

          <Sidebar.Pushable>
             <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
                <Menu.Item as={Link} to='/' active onClick={this.handlePusherClick} >We </Menu.Item>
                <Menu.Item as='a'>Category</Menu.Item>
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
              <Segment inverted textAlign='center'
                style={NAV_MOBILE_NON_AUTH}
                // style={{ minHeight: 350, padding: '1em 0em' }}
                vertical>
                {/* <Container> */}
                    <Menu inverted pointing secondary >
                      <Menu.Item onClick={this.handleToggle}>
                        <Icon name='sidebar' />
                      </Menu.Item>
                      <Menu.Item position='right'>
                        <Button
                          as={Link} to={routes.SIGN_IN} inverted>
                          Log in</Button>
                        <Button   as={Link} to={routes.SIGN_UP} inverted style={{ marginLeft: '0.5em' }}>
                          Sign Up</Button>
                      </Menu.Item>
                    </Menu>
                      {searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid
                        // size='large'
                      icon={<Icon name='search' inverted circular link onClick={this.handleSearchClick}/>}
                     /> : null}
                {/* </Container>*/}
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

NonAuthContainer.propTypes = {
  children: PropTypes.node,
}

export default NonAuthContainer


// export const DesktopNonAuth = ({fixed, activeItem}) => {
  // return (
    // <Segment
    //   // inverted
    //    textAlign='center' vertical
    //    basic
    //    style={style.NAV_MENU_SEGMENT_BORDER}
    //    >
    //   <Menu
    //     fixed={fixed ? 'top' : null}
    //     // inverted={!fixed}
    //     // color='blue'
    //     // pointing={!fixed}
    //     // secondary={!fixed}
    //     size='large'
    //     style={style.NAV_MENU_BORDER}
    //   >
    //     <Container>
    //       <Menu.Item  as={Link} to={routes.LANDING}
    //         active={activeItem === 'weqna'} onClick={this.handleItemClick}> We qna </Menu.Item>
    //         <Category />
    //       <Menu.Item>
    //           <Input placeholder='Search...' action={{ icon: 'search' }}/>
    //       </Menu.Item>
    //
    //       <Menu.Menu position='right'>
    //         <Menu.Item as={Link} to={routes.SIGN_IN}
    //           name='Sign In' active={activeItem === 'signin'}
    //           onClick={this.handleItemClick}
    //            >
    //         </Menu.Item>
    //
    //         <Menu.Item as={Link} to={routes.SIGN_UP}
    //           name='Sign Up' active={activeItem === 'signup'}
    //           onClick={this.handleItemClick}
    //            >
    //         </Menu.Item>
    //       </Menu.Menu>
    //
    //     </Container>
    //   </Menu>
    //   {/* <HomepageHeading /> */}
    // </Segment>
  // );
// }
//
// const MobileNonAuth = ({children, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem}) => {
//   return (
//     <Sidebar.Pushable>
//        <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
//           <Menu.Item as={Link} to='/' active onClick={handlePusherClick} >We </Menu.Item>
//           <Menu.Item as='a'>Category</Menu.Item>
//           <Menu.Item
//             as={Link} to={routes.TEACHER_INTRO} onClick={handlePusherClick}
//             >Are you teaching?</Menu.Item>
//           <Menu.Item
//             as={Link} to={routes.FOOTER_HELP}
//             onClick={handlePusherClick}
//             >Help</Menu.Item>
//           <Menu.Item name='Log in' active={activeItem === 'signin'}
//             as={Link} to={routes.SIGN_IN}
//             onClick={handlePusherClick}
//              >
//           </Menu.Item>
//
//           <Menu.Item name='Sign Up' active={activeItem === 'signup'}
//             as={Link} to={routes.SIGN_UP}
//             onClick={handleToggle}
//              >
//           </Menu.Item>
//       </Sidebar>
//
//       <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
//         <Segment inverted textAlign='center'
//           style={NAV_MOBILE_NON_AUTH}
//           // style={{ minHeight: 350, padding: '1em 0em' }}
//           vertical>
//           {/* <Container> */}
//               <Menu inverted pointing secondary >
//                 <Menu.Item onClick={handleToggle}>
//                   <Icon name='sidebar' />
//                 </Menu.Item>
//                 <Menu.Item position='right'>
//                   <Button
//                     as={Link} to={routes.SIGN_IN} inverted>
//                     Log in</Button>
//                   <Button   as={Link} to={routes.SIGN_UP} inverted style={{ marginLeft: '0.5em' }}>
//                     Sign Up</Button>
//                 </Menu.Item>
//               </Menu>
//                 {searchFieldActive? <Input className='icon' icon='search' placeholder='Search...' fluid
//                   // size='large'
//                 icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>}
//                /> : null}
//           {/* </Container>*/}
//           {/* <HomepageHeading mobile /> */}
//         </Segment>
//       {children}
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// }
