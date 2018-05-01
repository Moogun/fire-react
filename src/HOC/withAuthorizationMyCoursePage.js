import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';

const withAuthorizationMyCoursePage = (authCondition, verifyStudent) => (Component) => {

  class WithAuthorization extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        user: null,
        course: null,
        attending: null,
      }
    }
    componentDidMount(){

      firebase.auth.onAuthStateChanged(authUser => {
        if(!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        } else {

          let cTitle = this.props.match.params.cTitle
          let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
          db.onceGetCourseWithTitle(title)
          .then(res => {
            let key = Object.keys(res.val())
            let course = res.val()[key]

            if (verifyStudent(authUser.uid, course.attendee)) {
              this.setState ({cid: key, course: res.val(), attending: true })
            } else {
              this.setState ({attending: false })
              // this.props.history.push(routes.SIGN_IN);
            }
          })
          .catch(error => {
            this.setState({[error]: error});
          });
        }
      });

    }

    render() {
      const {match, history} = this.props
      const { user, uid, cid, course, attending } = this.state
      return course && attending ? <Component
        match={match} history={history}
        cid={cid}
        course={course}
        attending={attending}
        // user={this.state.user} uid={this.state.uid}
      /> : <p>loading</p>
    }
  }

  WithAuthorization.contextTypes = {
    course: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorizationMyCoursePage;
