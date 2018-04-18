import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as routes from '../constants/routes';

import Structure from '../Structure';
import LandingPage from './Landing';
import HomePage from './Home';

import SignUpPage from './account/SignUp';
import SignInPage from './account/SignIn';
import PasswordForgetPage from './account/PasswordForget';
import AccountPage from './account/Account';


import TeacherIntro from './teacherIntro/TeacherIntro';

import Teacher from './teacher/Teacher';
import Courses from './teacher/Courses';
import Question from './questionPage/QuestionPage';


import CEdit from './courseManage/CEdit';
// import Create from './courseManage/Create';
import Create from './courseManage/CreateC';
import CoursePage from './coursePage/CoursePage';
import MyCoursePage from './coursePage/MyCoursePage';


import MyCourses from './myCourses/MyCourses';


import Dashboard from './dashboard/Dashboard';


import Footer from './footer/Footer';
import About from './footer/About';
import Faq from './footer/Faq';
import Terms from './footer/Terms';
import Help from './footer/Help';


import {firebase} from '../firebase';
import withAuthentication from '../HOC/withAuthentication';
import ResponsiveContainer from './navbar/ResponsiveContainer';

class App extends Component {

  render() {
    return (
      <Router>
        <ResponsiveContainer>
          {/* <Navigation/> */}
          <Route
          exact path='/structure'
          component={() => <Structure />}
          />

          <Route
          exact path={routes.LANDING}
          component={() => <LandingPage />}
          />

          <Route
            exact path={routes.HOME}
            component={() => <HomePage />}
          />

          <Route
            path={routes.SIGN_IN}
            render={() => <SignInPage />}
          />

          <Route
            path={routes.SIGN_UP}
            render={() => <SignUpPage />}
          />

          <Route
            path={routes.ACCOUNT}
            render={() => <AccountPage />}
          />

          <Route
            exact path={routes.LEARNING}
            component={() => <MyCourses />}
          />

          <Route
            path={routes.DASHBOARD}
            render={() => <Dashboard />}
          />

          <Route
            path={routes.COURSE_MANAGE}
            component={() => <CEdit />}
          />

          <Route exact path={routes.TEACHER_INTRO} render={() => <About />} />

          <Route
            // exact path='/teacher/:teacherId'
            // exact path='/:teacherName'
            path={routes.TEACHER_PAGE}
            render={() => <Teacher />}
          />

          <Route
            // exact path='/:teacherName/courses/:courseName'
            exact path={routes.COURSE_PAGE}
            render={() => <CoursePage />}
          />

          <Route
            // exact path='/:teacherName/courses/:courseName'
            path={routes.MY_COURSE_PAGE}
            render={() => <MyCoursePage />}
          />

          {/* <Route
            // path='/teacher/:teacherId/question/:questionId'
            exact path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
            render={() => <Question />}
          /> */}

          <Route
            // eaact path='/create'
            exact path={routes.CREATE}
            render={() => <Create />}
          />

          <Route exact path={routes.FOOTER_ABOUT} render={() => <About />} />
          <Route exact path={routes.FOOTER_TERMS} render={() => <Terms />} />
          <Route exact path={routes.FOOTER_FAQ} render={() => <Faq />} />
          <Route exact path={routes.FOOTER_HELP} render={() => <Help />} />

          <Footer />
        </ResponsiveContainer>

      </Router>
    );
  }
}

export default withAuthentication(App);
