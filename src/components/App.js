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
        <ResponsiveContainer></ResponsiveContainer>
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
