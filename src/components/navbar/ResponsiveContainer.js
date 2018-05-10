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

import TeacherIntro from '../teacherIntro/TeacherIntro';

import Teacher from '../teacher/Teacher';
import Courses from '../teacher/Courses';
import Question from '../questionPage/QuestionPage';


import CEdit from '../courseManage/CEdit';
// import Create from '../courseManage/Create';
import Create from '../courseManage/CreateC';
import CoursePage from '../coursePage/CoursePage';
import MyCoursePage from '../coursePageMy/MyCoursePage';


import MyCourses from '../myCourses/MyCourses';


import Dashboard from '../dashboard/Dashboard';


import QuizEdit from '../quiz/QuizEdit'


import Footer from '../footer/Footer';
import About from '../footer/About';
import Faq from '../footer/Faq';
import Terms from '../footer/Terms';
import Help from '../footer/Help';


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
                exact path={routes.ACCOUNT} layout={MainLayout} authUser={authUser}
                component={() => <AccountPage />}
              />


              <AppRoute exact path={routes.LEARNING} layout={MainLayout} authUser={authUser}
                component={() => <MyCourses />} />

              <AppRoute exact path={routes.TEACHER_INTRO} layout={MainLayout} authUser={authUser} component={() => <TeacherIntro />} />

              <AppRoute
                exact path={routes.CREATE} layout={MainLayout} authUser={authUser}
                component={() => <Create />} />

              <AppRoute path={routes.COURSE_MANAGE} layout={MainLayout} authUser={authUser} component={() => <CEdit />} />

              <AppRoute path={routes.DASHBOARD} layout={MainLayout} authUser={authUser} component={() => <Dashboard />} />

              <AppRoute path={routes.QUIZ_MANAGE} layout={MainLayout} authUser={authUser} component={() => <QuizEdit />} />

              <AppRoute
                path={routes.TEACHER_PAGE} layout={MainLayout} authUser={authUser} component={() => <Teacher />} />

              <AppRoute
                exact path={routes.COURSE_PAGE} layout={MainLayout} authUser={authUser} component={() => <CoursePage />} />

              <AppRoute
                path={routes.MY_COURSE_PAGE} layout={MainLayout} authUser={authUser} component={() => <MyCoursePage />} />

              <AppRoute exact path={routes.FOOTER_ABOUT} layout={MainLayout} authUser={authUser} component={() => <About />} />
              <AppRoute exact path={routes.FOOTER_TERMS} layout={MainLayout} authUser={authUser} component={() => <Terms />} />
              <AppRoute exact path={routes.FOOTER_FAQ} layout={MainLayout} authUser={authUser} component={() => <Faq />} />
              <AppRoute exact path={routes.FOOTER_HELP} layout={MainLayout} authUser={authUser} component={() => <Help />} />

              {/* <AppRoute layout={MainLayout} component={NoMatch} /> */}

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
      <p>Footer</p>
    </div>
  )
}

  const AltLayoutFor = (props) => (
    <div>
      <h1>Alt</h1>
      {props.authUser
        ? <p>auth container 2</p>
        : <p>non auth container 2 </p> }
    </div>
  )

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
