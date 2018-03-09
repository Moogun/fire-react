import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './footer/Footer';
import * as routes from '../constants/routes';

import LandingPage from './Landing';
import HomePage from './Home';

import SignUpPage from './account/SignUp';
import SignInPage from './account/SignIn';
import PasswordForgetPage from './account/PasswordForget';
import AccountPage from './account/Account';

import Teacher from './teacher/Teacher';
import Courses from './teacher/Courses';
import Question from './questionPage/QuestionPage';

import CEdit from './courseManage/CEdit';
import CoursePage from './coursePage/CoursePage';

import MyCourses from './myCourses/MyCourses';

import {firebase} from '../firebase';
import withAuthentication from '../HOC/withAuthentication';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation/>

          <Route
          exact path={routes.LANDING}
          component={() => <LandingPage />}
          />

          <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          />
          <Route
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
          <Route
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />

          <Route
            exact path={routes.MY_COURSES}
            component={() => <MyCourses />}
          />

          <Route
            path={routes.TEACHER}
            component={() => <Teacher />}
          />

          <Route
            path='/question'
            component={() => <Question />}
          />

          <Route
            path='/coursePage'
            component={() => <CoursePage />}
          />

          <Route
            path='/cedit'
            component={() => <CEdit />}
          />
          

          <Footer />
        </div>

      </Router>
    );
  }
}

export default withAuthentication(App);
