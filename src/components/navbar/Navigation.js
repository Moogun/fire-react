import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../account/SignOut';
import * as routes from '../../constants/routes';
import PropTypes from 'prop-types'
// import SignUp from './account/SignUp'
// import SignIn from './account/SignIn'
import AuthModal from '../account/AuthModal'
import PasswordForget from '../account/PasswordForget'

import Create from '../courseManage/Create'
import {auth, db} from '../../firebase'
import imageSrc from '../../assets/helen.png'
import Category from './Category'
import NavAuth from './NavAuth'
import NavNonAuth from './NavNonAuth'

import { Responsive, Visibility, Segment, Container, Menu, Icon, Grid, Input, Button, Dropdown, Header, Modal, Feed, Sidebar, Form, Divider, Checkbox } from 'semantic-ui-react'


const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavAuth authUser={authUser}/>
        : <NavNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};


export default Navigation;
