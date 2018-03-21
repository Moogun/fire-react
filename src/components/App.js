import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './navbar/Navigation';
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
import Create from './courseManage/Create';
import CoursePage from './coursePage/CoursePage';

import MyCourses from './myCourses/MyCourses';
import Dashboard from './dashboard/Dashboard';

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
            path={routes.ACCOUNT}
            render={() => <AccountPage />}
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
            exact path='/teacher/:teacherId'
            render={() => <Teacher />}
          />

          <Route
            path='/teaching'
            render={() => <Dashboard />}
          />

          <Route
            exact path='/teacher/:teacherId/course/:courseId'
            render={() => <CoursePage />}
          />


          <Route
            path='/teacher/:teacherId/question/:questionId'
            render={() => <Question />}
          />

          <Route
            eaact path='/create'
            render={() => <Create />}
          />

          <Route
            path='/course_manage/:id/edit'
            component={() => <CEdit />}
          />


          <Footer />
        </div>

      </Router>
    );
  }
}

export default withAuthentication(App);
