import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import Category from './Category'
import AuthModal from '../account/AuthModal'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox, } from 'semantic-ui-react'

const menuStyle ={borderRadius: '0px'}
class NavNonAuth extends Component {

  state = {
    activeItem: '',
  }
  //
  // hideFixedMenu = () => this.setState({ fixed: false })
  // showFixedMenu = () => this.setState({ fixed: true })
  //

  handleSearchField = () => this.setState ({ searchFieldActive: !this.state.searchFieldActive})

  render() {

    const {activeItem, searchFieldActive, sidebarOpened} = this.state

    let searchField = searchFieldActive ? <Grid.Column><Input className='icon' icon='search' placeholder='Search...' fluid transparent iconPosition='left'/></Grid.Column> : null

    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
            <Menu style={menuStyle}>
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
        </Responsive>

        <Responsive {...Responsive.onlyMobile}>
          <Menu style={menuStyle} icon size='tiny'>
            <Container>
              <Menu.Item  as={Link} to={routes.LANDING}
                active={activeItem === 'weqna'} onClick={this.handleItemClick}> Wq </Menu.Item>
              <Menu.Item  as={Link} to={routes.LANDING}
                active={activeItem === 'weqna'} onClick={this.handleItemClick}> <Icon name='browser' /> </Menu.Item>
              <Menu.Item>
                  <Input placeholder='Search...' action={{ icon: 'search' }}/>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item as={Link} to={routes.SIGN_IN}
                  active={activeItem === 'signin'}
                  onClick={this.handleItemClick}>
                     <Icon name='signup' />
                </Menu.Item>

              </Menu.Menu>
           </Container>

         </Menu>
        </Responsive>

      </div>
    )
  }
}


export default NavNonAuth
