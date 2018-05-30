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

import ReactGA from 'react-ga';
import withTracker from '../HOC/withTracker';


  // ReactGA.initialize('UA-119623208-1', {
  //   debug: true,
  //   titleCase: false,
  //   gaOptions: {
  //     userId: 123
  //   }
  // });
  // ReactGA.pageview(window.location.pathname + window.location.search);


class App extends Component {

  render() {

    let isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
          console.log('hhh');
        isMobile = true;
    }
    console.log('isMobile', isMobile);
    return (
      <Router>

        <ResponsiveContainer isMobile={isMobile}>

          <Switch>
            <Route exact path='/structure' component={withTracker(() => <Structure />)} />

            <Route exact path={routes.LANDING} component={withTracker(() => <LandingPage isMobile={isMobile}/>)} />
            <Route exact path={routes.HOME} component={withTracker(() => <HomePage isMobile={isMobile} />)} />
            <Route exact path={routes.SIGN_IN} component={withTracker(() => <SignInPage />)} />
            <Route exact path={routes.SIGN_UP} component={withTracker(() => <SignUpPage />)} />

            <Route path={routes.ACCOUNT} component={withTracker(() => <AccountPage />)} />


            <Route exact path={routes.LEARNING} component={withTracker(() => <MyCourses isMobile={isMobile} />)} />


            <Route exact path={routes.TEACHER_INTRO} component={withTracker(() => <TeacherIntro isMobile={isMobile} />)} />

            <Route
              // eaact path='/create'
              exact path={routes.CREATE} component={withTracker(() => <Create />)} />

            <Route path={routes.COURSE_MANAGE} component={withTracker(() => <CEdit isMobile={isMobile} />)} />

            <Route path={routes.DASHBOARD} component={withTracker(() => <Dashboard isMobile={isMobile} />)} />

            <Route path={routes.QUIZ_MANAGE} component={withTracker(() => <QuizEdit isMobile={isMobile} />)} />

            <Route
              // exact path='/teacher/:teacherId'
              // exact path='/:teacherName'
              path={routes.TEACHER_PAGE} component={withTracker(() => <Teacher isMobile={isMobile} />)} />

            <Route
              // exact path='/:teacherName/courses/:courseName'
              exact path={routes.COURSE_PAGE} component={withTracker(() => <CoursePage isMobile={isMobile} />)} />

            <Route
              // exact path='/:teacherName/courses/:courseName'
              path={routes.MY_COURSE_PAGE} component={withTracker(() => <MyCoursePage isMobile={isMobile} />)} />

               {/* <PrivateRoute
                 path={routes.MY_COURSE_PAGE} component={() => <MyCoursePage />} /> */}

            {/* <Route
              // path='/teacher/:teacherId/question/:questionId'
              exact path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
              component={() => <Question />}
            /> */}



            <Route exact path={routes.FOOTER_ABOUT} component={withTracker(() => <About />)} />
            <Route exact path={routes.FOOTER_TERMS} component={withTracker(() => <Terms />)} />
            <Route exact path={routes.FOOTER_FAQ} component={withTracker(() => <Faq />)} />
            <Route exact path={routes.FOOTER_HELP} component={withTracker(() => <Help />)} />

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
