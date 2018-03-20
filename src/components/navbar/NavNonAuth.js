import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Category from './Category'
import AuthModal from '../account/AuthModal'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox } from 'semantic-ui-react'

class NavNonAuth extends Component {

  state = {
    activeItem: '',
    authReq: null,
  }
  //
  // hideFixedMenu = () => this.setState({ fixed: false })
  // showFixedMenu = () => this.setState({ fixed: true })
  //
  // handlePusherClick = () => {
  //   const { sidebarOpened } = this.state
  //   if (sidebarOpened) this.setState({ sidebarOpened: false })
  // }
  //
  // handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })
  test = () => this.setState ({ authReq: 'login'})
  handleToLogIn = () => this.setState ({ authReq: 'login' })
  handleToSignUp = () => this.setState ({ authReq: 'signup' })
  handleSearchField = () => this.setState ({ searchFieldActive: !this.state.searchFieldActive})

  render() {

    const {activeItem, searchFieldActive, sidebarOpened, authReq} = this.state
    let authModalHeader = authReq === 'signin' ? "Login" : "Sign Up"
    console.log('auth req', this.state.authReq);

    let searchField = searchFieldActive ? <Grid.Column><Input className='icon' icon='search' placeholder='Search...' fluid transparent iconPosition='left'/></Grid.Column> : null

    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
            <Menu >
              <Container>
                <Menu.Item  as={Link} to={routes.LANDING}
                  name='landing' active={activeItem === 'landing'} onClick={this.handleItemClick} />
                  <Category />

                  <Menu.Menu position='right'>
                    <Menu.Item as='a' name='Sign In' active={activeItem === 'signin'} >

                      <Modal trigger={<p>Log In</p>} size='mini' closeIcon >
                        <Modal.Header>Log In to We Qna</Modal.Header>
                        <AuthModal authReq={'signin'} />
                      </Modal>

                    </Menu.Item>


                    <Menu.Item as='a' name='Sign Up' active={activeItem === 'signup'}>

                      <Modal trigger={<p>Sign Up</p>} size='mini'>
                        {/* <Modal.Header>Sign Up for We QnA</Modal.Header> */}
                        <AuthModal authReq={'signup'}/>
                      </Modal>
                    </Menu.Item>

                  </Menu.Menu>
             </Container>

           </Menu>
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Sidebar.Pushable>

             <Sidebar as={Menu} animation='overlay' inverted vertical visible={sidebarOpened}>
               <Menu.Item as='a'>Categories</Menu.Item>
               <Menu.Item as='a'>Register Courses</Menu.Item>
               <Menu.Item as='a'>Help</Menu.Item>
             </Sidebar>

             <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh', margin: '0em' }}>

               <Grid celled style={{margin: '0em 0em'}}>
                <Grid.Row>
                 <Grid.Column width={2}  textAlign='center'>
                   <Menu.Item onClick={this.handleToggle}>
                     <Icon name='sidebar' />
                   </Menu.Item>
                 </Grid.Column>

                 <Grid.Column width={2}  textAlign='center'>
                   <Menu.Item onClick={this.handleSearchField}>
                     <Icon name='search'/>
                   </Menu.Item>
                 </Grid.Column>

                 <Grid.Column width={8}  textAlign='center'>
                     <Menu.Item fitted name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick}>
                     <Icon name='question'/> We Qna
                     </Menu.Item>
                  </Grid.Column>

                 <Grid.Column width={2} textAlign='center'>
                   <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick} >
                    <Icon name='book' />
                   </Menu.Item>
                 </Grid.Column>

                 <Grid.Column width={2} textAlign='center'>
                   <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
                    <Icon name='user' />
                   </Menu.Item>
                </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                  {searchField}
                </Grid.Row>
              </Grid>

             </Sidebar.Pusher>
           </Sidebar.Pushable>
        </Responsive>

      </div>
    )
  }
}


export default NavNonAuth
