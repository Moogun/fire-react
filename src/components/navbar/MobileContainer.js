import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Dropdown, Input
} from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import Category from './Category'
import HomepageHeading from './HomepageHeading'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {auth, db} from '../../firebase'

import Dashboard from '../dashboard/Dashboard';

const NAV_MOBILE_AUTH={padding: '0rem'}
const NAV_MOBILE_NON_AUTH={padding: '0rem'}
const MENU_BORDER={borderRadius: '0', marginBottom: '0'}

class MobileContainer extends Component {
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

  handleSearchField = () => {this.setState ({ searchFieldActive: !this.state.searchFieldActive})
    console.log('s field', this.state.searchFieldActive);
  }
  handleSearchClick = () => { console.log('search clicked')}

  render() {
    const { children, authUser, mobile } = this.props
    const { fixed, activeItem, sidebarOpened, searchFieldActive } = this.state
    console.log('mobile container', authUser);
    return (
      <Responsive minWidth={320} maxWidth={991}>
          { authUser
              ? <MobileAuth
                authUser={authUser}
                activeItem={activeItem}
                children={children}
                sidebarOpened={sidebarOpened}
                handlePusherClick={this.handlePusherClick}
                handlePusherClickAndLogout={this.handlePusherClickAndLogout}
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

class MobileAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount(){
    // console.log('did mount 1 M Container', )
    const {authUser} = this.props
      db.onceGetUser(authUser.uid)
      .then(res => this.setState ({ user: res.val() }))
      .catch(error => {
        this.setState({[error]: error});
      })
  }

  render() {
    const {children, authUser, sidebarOpened, handlePusherClick, handlePusherClickAndLogout, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem} = this.props
    // console.log('mobile auth props user', authUser);
    const { user } = this.state
    // console.log('mobile state user', user);
    return (
      <Sidebar.Pushable>
         <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
           <Menu.Item
             as={Link} to={routes.ACCOUNT}
             onClick={handlePusherClick} >{!!user ?
               <Header as='h5' inverted>
                 <Image circular src={user.photoUrl} />
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
           <Menu.Item as={Link} to='/category' onClick={handlePusherClick}>Category</Menu.Item>
           <Menu.Item as={Link} to={routes.LEARNING} onClick={handlePusherClick}>My Courses</Menu.Item>
           <Menu.Item as={Link} to='/notifications' onClick={handlePusherClick}>My Notifications</Menu.Item>
           <Menu.Item as={Link} to={routes.DASHBOARD} onClick={handlePusherClick}>Instructor Dashboard</Menu.Item>
           <Menu.Item as={Link} to={routes.FOOTER_HELP} onClick={handlePusherClick}>Help</Menu.Item>
           <Menu.Item as='a' onClick={handlePusherClickAndLogout}>Log out</Menu.Item>
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
            // style={NAV_MOBILE_AUTH}
            vertical>
            <Container>

                  <Menu.Item as='a' onClick={handleToggle} style={{float:'left', color: 'white'}} >
                    <Icon name='sidebar' />
                  </Menu.Item>

                  <Menu.Item as='a' onClick={handleSearchField} style={{float:'left', color: 'white', marginLeft: '1rem'}}>
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
}
// const MobileAuth = ({children, authUser, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem}) => {
//   console.log('mobile auth', authUser);
//   return (
//     <Sidebar.Pushable>
//        <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
//          <Menu.Item
//            as={Link} to={routes.ACCOUNT}
//            onClick={handlePusherClick} >My Account</Menu.Item>
//          <Menu.Item as={Link} to='/category' >Category</Menu.Item>
//          <Menu.Item as='a'>My Courses</Menu.Item>
//          <Menu.Item as='a'>My Notifications</Menu.Item>
//          <Menu.Item as={Link} to={routes.DASHBOARD}>Instructor Dashboard</Menu.Item>
//          <Menu.Item as='a'>Help</Menu.Item>
//          <Menu.Item as='a' onClick={auth.doSignOut}>Log out</Menu.Item>
//       </Sidebar>
//
//       <Sidebar.Pusher dimmed={sidebarOpened}
//         onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
//         <Segment
//           inverted
//           textAlign='center'
//           style={{
//             // minHeight: 350,
//              padding: '1em 0em'
//            }}
//           // style={NAV_MOBILE_AUTH}
//           vertical>
//           <Container>
//
//                 <Menu.Item as='a' onClick={handleToggle} style={{float:'left', color: 'white'}} >
//                   <Icon name='sidebar' />
//                 </Menu.Item>
//
//                 <Menu.Item as='a' onClick={handleSearchField} style={{float:'left', color: 'white', marginLeft: '1rem'}}>
//                   {/* was 0.5  */}
//                   <Icon name='search' />
//                 </Menu.Item>
//
//                 <Menu.Item as='a' style={{color: 'white'}}
//                   as={Link} to={routes.HOME}
//                   > We question and answer </Menu.Item>
//                 <Menu.Item as={Link} to={routes.ACCOUNT} onClick={this.handleItemClick} style={{float:'right', color: 'white', marginLeft: '1rem'}} >
//                   <Icon name='user circle' />
//                 </Menu.Item>
//
//                 <Menu.Item  as={Link} to={routes.LEARNING}
//                   style={{float:'right', color: 'white',}}
//                   >
//                   <Icon name='folder outline' />
//                 </Menu.Item>
//
//                   {searchFieldActive
//                     ? <Input className='icon' placeholder='Search...' fluid size='large' style={{marginTop: '1em'}} // action={{ icon: 'search' }}
//                     icon={<Icon name='search' inverted circular link onClick={handleSearchClick}/>} />
//                     : null
//                   }
//
//           </Container>
//           {/* <HomepageHeading mobile /> */}
//         </Segment>
//       {children}
//       </Sidebar.Pusher>
//     </Sidebar.Pushable>
//   );
// }

const MobileNonAuth = ({children, sidebarOpened, handlePusherClick, handleToggle, searchFieldActive, handleSearchField, handleSearchClick, activeItem}) => {
  return (
    <Sidebar.Pushable>
       <Sidebar as={Menu} animation='push' inverted vertical visible={sidebarOpened}>
          <Menu.Item as={Link} to='/' active onClick={handlePusherClick} >We </Menu.Item>
          <Menu.Item as='a'>Category</Menu.Item>
          <Menu.Item
            as={Link} to={routes.TEACHER_INTRO} onClick={handlePusherClick}
            >Are you teaching?</Menu.Item>
          <Menu.Item
            as={Link} to={routes.FOOTER_HELP}
            onClick={handlePusherClick}
            >Help</Menu.Item>
          <Menu.Item name='Log in' active={activeItem === 'signin'}
            as={Link} to={routes.SIGN_IN}
            onClick={handlePusherClick}
             >
          </Menu.Item>

          <Menu.Item name='Sign Up' active={activeItem === 'signup'}
            as={Link} to={routes.SIGN_UP}
            onClick={handleToggle}
             >
          </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened} onClick={handlePusherClick} style={{ minHeight: '100vh' }}>
        <Segment inverted textAlign='center'
          style={NAV_MOBILE_NON_AUTH}
          // style={{ minHeight: 350, padding: '1em 0em' }}
          vertical>
          {/* <Container> */}
              <Menu inverted pointing secondary size='large'>
                <Menu.Item onClick={handleToggle}>
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
