import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Navbar.css'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility, Dropdown, Input
} from 'semantic-ui-react'
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';

import Category from './Category'
import HomepageHeading from './HomepageHeading'
import {Route, Link, withRouter } from 'react-router-dom';
import {auth, db} from '../../firebase'
import logo from '../../assets/logo.png'

import MyCourseQuizTaking from '../coursePageMy/MyCourseQuizTaking';

import profile from '../../assets/profile-lg.png'

const MENU_BORDER={borderRadius: '0', marginBottom: '0'}

class AuthContainer extends Component {
  state = {
    activeItem: 'home',
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
  handleItemClick = (e, {name}) => this.setState ({ activeItem: name})

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

    const { children, authUser, fixed, match } = this.props

    const { calculations, contextRef } = this.state
    // console.log('calculations. width', calculations.width, match);
    let mobile = calculations.width < 768 ? true : false

    return (
      <div ref={this.handleContextRef}>

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
                 : '내 계정'
               }
             </Menu.Item>
             {/* <Menu.Item as={Link} to='/category' onClick={this.handlePusherClick}>Category</Menu.Item> */}

              {/* {additionalMenu} */}

             <Menu.Item as={Link} to={routes.LEARNING} onClick={this.handlePusherClick}>내 수업</Menu.Item>
             <Menu.Item as={Link} to='/notifications' onClick={this.handlePusherClick}>알림 (준비 중)</Menu.Item>
             <Menu.Item as={Link} to={!!teachingList ? routes.DASHBOARD : routes.TEACHER_INTRO} onClick={this.handlePusherClick}>{!!teachingList ? '대쉬보드' : '선생님이세요?'} </Menu.Item>
             <Menu.Item as={Link} to={routes.FOOTER_HELP} onClick={this.handlePusherClick}>도와주세요</Menu.Item>
             <Menu.Item as='a' onClick={this.handlePusherClickAndLogout}>로그 아웃</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}
            onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>

            <Visibility onUpdate={this.handleUpdate}>

                <Menu style={{fontSize: '1.3rem', borderStyle: 'solid', borderWidth: '0px 0px 1px 0px', borderColor: '#dfe6e9', marginBottom: '0rem'}} text>
                  <Container>
                    {!mobile
                      ? null
                      : <Menu.Item onClick={this.handleToggle}>
                          <Icon name='sidebar' style={{marginLeft: '1rem'}}/>
                        </Menu.Item> }

                    {/* <Menu.Item Header name='home' active={activeItem === 'home'} onClick={this.handleItemClick}
                      as={Link} to={routes.HOME}
                      >
                      {!mobile ? 'We qna' : 'We qna'}
                    </Menu.Item> */}

                    <Menu.Item
                      name='home'
                      style={{backgroundColor: 'white', color: '#e0004d'}}
                      active={activeItem === 'home'}
                      onClick={this.handleItemClick}
                      as={Link} to={routes.HOME}>
                        We QnA
                    </Menu.Item>


                    {/* <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}
                      as={Link} to={routes.DASHBOARD}> <Icon name='dashboard' /></Menu.Item> */}
                    <Menu.Menu position='right'>
                      {mobile ? null :
                      !!teachingList ?
                      <Dropdown item text='대쉬보드'>
                          <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={routes.CREATE}
                              name='create' active={activeItem === 'create'} onClick={this.handleItemClick}>
                              <Icon name='pencil' style={{marginRight: '0.5rem'}} />
                              수업 정보 등록
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={routes.DASHBOARD}
                              name='dashboard'
                              active={activeItem === 'dashboard'}
                              onClick={this.handleItemClick}
                              >
                              <Icon name='dashboard' style={{marginRight: '0.5rem'}} />
                              대쉬보드
                            </Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                      : <Menu.Item as={Link} to={routes.TEACHER_INTRO}
                        name='teaching' active={activeItem === 'teaching'} onClick={this.handleItemClick}>선생님이세요?</Menu.Item>
                      }

                      {/* <Menu.Item name='teaching' active={activeItem === 'teaching'} onClick={this.handleItemClick}
                        as={Link} to={routes.DASHBOARD}
                      > {!mobile ? 'Are you teaching?' : <Icon name='pencil' />}</Menu.Item> */}

                      <Menu.Item name='mycourses' active={activeItem === 'mycourses'} onClick={this.handleItemClick}
                        as={Link} to={routes.LEARNING}
                        > {!mobile ? '내 수업' : <Icon name='folder outline' />}</Menu.Item>

                      {mobile ? <Menu.Item name='user' active={activeItem === 'user'} onClick={this.handleItemClick}
                          as={Link} to={routes.ACCOUNT}> <Icon name='user circle outline' style={{marginRight: '1rem'}}/></Menu.Item> :

                      <Dropdown style={{fontSize: '1.3rem'}} item text={ !!user ? user.username : '계정' } button >
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to={routes.ACCOUNT} name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
                            프로필
                          </Dropdown.Item>
                          <Dropdown.Item onClick={auth.doSignOut}>
                               로그 아웃
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      }

                      {/* <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick}
                        as={Link} to={routes.ACCOUNT}
                        > {!mobile ? 'username' : <Icon name='user outline' />}</Menu.Item> */}
                    </Menu.Menu>
                  </Container>
                  </Menu>

              {/* <HomepageHeading mobile /> */}
            </Visibility>
          {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    )
  }
}

AuthContainer.propTypes = {
  children: PropTypes.node,
}

export default withRouter(AuthContainer)
