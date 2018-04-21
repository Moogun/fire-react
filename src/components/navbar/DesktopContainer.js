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

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children, authUser } = this.props
    const { fixed, activeItem } = this.state
    return (
      <Responsive minWidth={992}>
        {/* <Visibility once={false} onBottomPassed={this.showFixedMenu}  onBottomPassedReverse={this.hideFixedMenu}> */}
            { authUser
                ? <DesktopAuth fixed={fixed} activeItem={activeItem} authUser={authUser}/>
                : <DesktopNonAuth fixed={fixed} activeItem={activeItem} />
            }

        {/* </Visibility> */}
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

export default DesktopContainer

class DesktopAuth extends Component {
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
    const {authUser, fixed, activeItem} = this.props
    const {user, teachingList } = this.state
    console.log('desktop authUser', user, 'teachingList', teachingList);
    return (
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
            <Category />
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
      </Segment>
    );
  }
}

// const DesktopAuth = ({authUser, fixed, activeItem, st}) => {
//   return (
//     <Segment
//       // inverted
//       basic
//       textAlign='center' vertical
//       style={style.NAV_MENU_SEGMENT_BORDER}
//        >
//       <Menu
//         style={style.NAV_MENU_BORDER}
//         fixed={fixed ? 'top' : null}
//         // inverted={!fixed}
//         // pointing={!fixed}
//         // secondary={!fixed}
//         size='large'
//       >
//         <Container>
//           <Menu.Item as={Link} to={routes.HOME}
//             // name='Weqna'
//              active={activeItem === 'home'} onClick={this.handleItemClick} >
//             <img src={logo} />
//           </Menu.Item>
//           <Category />
//           <Menu.Item>
//               <Input placeholder='Search...' action={{ icon: 'search' }} style={{width: '350px'}}/>
//           </Menu.Item>
//           <Menu.Menu  position='right'>
//             <Dropdown item text='Teacher' >
//               <Dropdown.Menu>
//                 <Dropdown.Item as={Link} to={routes.CREATE}
//                   name='create' active={activeItem === 'create'} onClick={this.handleItemClick}>
//                   Create New Course
//                 </Dropdown.Item>
//                 <Dropdown.Item as={Link} to={routes.DASHBOARD}
//                   name='dashboard'
//                   active={activeItem === 'dashboard'}
//                   onClick={this.handleItemClick}
//                   >
//                     Manage Courses
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//
//             <Menu.Item as={Link} to={routes.LEARNING}
//               name='my courses' active={activeItem === 'mycourses'} onClick={this.handleItemClick} />
//
//             <Dropdown item text='Account' >
//               <Dropdown.Menu>
//                 <Dropdown.Item as={Link} to={routes.ACCOUNT}>
//                   {authUser.email}
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={auth.doSignOut}>
//                      SignOut
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//         </Menu.Menu>
//
//         </Container>
//       </Menu>
//       {/* <HomepageHeading /> */}
//     </Segment>
//   );
// }

const DesktopNonAuth = ({fixed, activeItem, st}) => {
  return (
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
  );
}
