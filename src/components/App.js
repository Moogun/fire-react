import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Segment, Header, Grid} from 'semantic-ui-react'

import * as routes from '../constants/routes';
import * as style from '../style/inline';

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
import MyCoursePage from './coursePageMy/MyCoursePage';


import MyCourses from './myCourses/MyCourses';


import Dashboard from './dashboard/Dashboard';


import QuizEdit from './quiz/QuizEdit'


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

          <Switch>
            <Route exact path='/structure' component={() => <Structure />} />

            <Route exact path={routes.LANDING} component={() => <LandingPage />} />
            <Route exact path={routes.HOME} component={() => <HomePage />} />
            <Route exact path={routes.SIGN_IN} render={() => <SignInPage />} />
            <Route exact path={routes.SIGN_UP} render={() => <SignUpPage />} />

            <Route path={routes.ACCOUNT} render={() => <AccountPage />} />


            <Route exact path={routes.LEARNING} component={() => <MyCourses />} />


            <Route exact path={routes.TEACHER_INTRO} render={() => <TeacherIntro />} />

            <Route
              // eaact path='/create'
              exact path={routes.CREATE} render={() => <Create />} />

            <Route path={routes.COURSE_MANAGE} render={() => <CEdit />} />

            <Route path={routes.DASHBOARD} render={() => <Dashboard />} />

            <Route path={routes.QUIZ_MANAGE} render={() => <QuizEdit />} />

            <Route
              // exact path='/teacher/:teacherId'
              // exact path='/:teacherName'
              path={routes.TEACHER_PAGE} render={() => <Teacher />} />

            <Route
              // exact path='/:teacherName/courses/:courseName'
              exact path={routes.COURSE_PAGE} render={() => <CoursePage />} />

            <Route
              // exact path='/:teacherName/courses/:courseName'
              path={routes.MY_COURSE_PAGE} render={() => <MyCoursePage />} />

               {/* <PrivateRoute
                 path={routes.MY_COURSE_PAGE} render={() => <MyCoursePage />} /> */}

            {/* <Route
              // path='/teacher/:teacherId/question/:questionId'
              exact path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
              render={() => <Question />}
            /> */}



            <Route exact path={routes.FOOTER_ABOUT} render={() => <About />} />
            <Route exact path={routes.FOOTER_TERMS} render={() => <Terms />} />
            <Route exact path={routes.FOOTER_FAQ} render={() => <Faq />} />
            <Route exact path={routes.FOOTER_HELP} render={() => <Help />} />

            <Route component={NoMatch} />
          </Switch>

          <Footer />

        </ResponsiveContainer>

      </Router>
    );
  }
}


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => authFake.isAuthenticated
//       ? ( <Component {...props} /> )
//        : (
//         <Redirect
//           to={{
//             pathname: "/login",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );
//
// const authFake = {
//   isAuthenticated: false,
//   authenticate(cb){
//     firebase.db.
//     this.isAuthenticated = true
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb){
//     this.isAuthenticated = false
//      setTimeout(cb, 100); // fake async
//   }
// }

const NoMatch = ({ location }) => (
  <Grid verticalAlign='middle' textAlign='center' style={style.NO_MATCH_MIN_HEIGHT}>
    <Grid.Row>
    <Grid.Column>

      <Header as='h1' style={{fontSize: '4rem'}}>
        Sorry!
        <Header.Subheader>
          We can't find the page you're looking for.
          Visit our support page for any questions. (404)
        </Header.Subheader>
      </Header>
    </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default withAuthentication(App);
