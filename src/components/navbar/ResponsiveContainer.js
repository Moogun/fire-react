import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as routes from '../../constants/routes';
import * as style from '../../constants/styles';

import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility,
} from 'semantic-ui-react'
import { Route, } from 'react-router-dom';

import LandingPage from '../Landing';
import HomePage from '../Home';

import SignUpPage from '../account/SignUp';
import SignInPage from '../account/SignIn';
import PasswordForgetPage from '../account/PasswordForget';
import AccountPage from '../account/Account';

import AuthContainer from './AuthContainer'
import NonAuthContainer from './NonAuthContainer'

class ResponsiveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { authUser } = this.context
    return (
        <div>
            <AppRoute
              exact path={routes.LANDING} layout={MainLayout} authUser={authUser}
              component={() => <LandingPage />}
              />

              <AppRoute
                exact path={routes.HOME} layout={MainLayout} authUser={authUser}
                component={() => <HomePage />}
              />

              <AppRoute
                exact path={routes.SIGN_UP} layout={MainLayout}
                component={() => <SignUpPage />}
              />
              <AppRoute
                exact path={routes.SIGN_IN} layout={MainLayout}
                component={() => <SignInPage />}
              />

              <AppRoute
                exact path={routes.ACCOUNT} layout={AltLayout} authUser={authUser}
                component={() => <AccountPage />}
              />
        </div>
    );
  }
}

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}
ResponsiveContainer.contextTypes ={
  authUser: PropTypes.object,
}

export default ResponsiveContainer


const AppRoute = ({ component: Component, layout: Layout, authUser: authUser, ...rest }) => {
  // console.log('res', rest);
  return (
  <Route {...rest} render={props => (
    <Layout {...rest} authUser={authUser}>
      <Component {...props} />
    </Layout>
  )} />
)}

const MainLayout = (props) => {
  return (
    <div>
      {props.authUser
        ? <AuthContainer authUser={props.authUser}> {props.children}   </AuthContainer>
        : <NonAuthContainer> {props.children} </NonAuthContainer> }

      {props.children}
      <p>Footer</p>
    </div>
  )
}

  const AltLayout = (props) => (
    <div>
      <h1>Alt</h1>
      {props.authUser
        ? <p>auth container 2</p>
        : <p>non auth container 2 </p> }
      {props.children}
    </div>
  )
