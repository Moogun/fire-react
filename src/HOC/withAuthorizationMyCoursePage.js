import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';

const withAuthorizationMyCoursePage = (verifyStudent) => (Component) => {

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
      let cTitle = this.props.match.params.cTitle
      let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
      db.onceGetCourseWithTitle(title)
      .then(res => {
        if (verifyStudent) {
          this.setState ({course: res.val(), attending: true })
        } else {
          this.setState ({attending: false })
        }
      })
      .catch(error => {
        this.setState({[error]: error});
      });

      // firebase.auth.onAuthStateChanged(authUser => {
      //   if(!authCondition(authUser)) {
      //     this.props.history.push(routes.SIGN_IN);
      //   } else {
      //
      //   }
      // });
    }

    render() {
      const {match, history} = this.props
      const { user, uid, course, attending } = this.state
      return course ? <Component
        match={match} history={history}
        course={course}
        attending={attending}
        // user={this.state.user} uid={this.state.uid}
      /> : <p>aa</p>
    }
  }

  WithAuthorization.contextTypes = {
    course: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorizationMyCoursePage;
