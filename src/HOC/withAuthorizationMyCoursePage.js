import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';
import { Loader } from 'semantic-ui-react'

const withAuthorizationMyCoursePage = (authCondition, verifyStudent) => (Component) => {

  class WithAuthorization extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        user: null,
        course: null,
        attending: null,
        questions: null,
      }
    }
    componentDidMount(){

      firebase.auth.onAuthStateChanged(authUser => {
        if(!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        } else {
          db.onceGetUser(authUser.uid)
            .then(userSnap => {
              this.setState ({ uid: authUser.uid, user: userSnap.val(), })

              let cTitle = this.props.match.params.cTitle
              let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
              db.onceGetCourseWithTitle(title)
              .then(res => {
                let cid = Object.keys(res.val())
                let course = res.val()[cid]
                let tid = course.metadata.tid

                if (verifyStudent(authUser.uid, course.attendee)) {
                  this.setState({cid: cid, course: res.val(), attending: true, })

                } else {
                  this.setState ({attending: false })
                  // this.props.history.push(routes.SIGN_IN);
                }
              }).catch(error => {
                this.setState({[error]: error});
              })
            }).catch(error => {
              this.setState({[error]: error});
            });

          // .then(res => {
            // console.log('res', res.val())
            // // let qList =[]
            // // let fetchedItem = 1
            // const {tid, cid} = this.state
            // console.log('tid, cid');
            // db.doFetchQuestions(tid, cid)
            // .then(res => this.setState ({ questions: res.val()}))
            // .catch(error => {
            //   this.setState({[error]: error});
            // });
          // })

        }
      });

    }

    render() {
      const {match, history} = this.props
      const { user, uid, cid, course, attending, questions } = this.state
      return course && attending ? <Component
        match={match} history={history}
        cid={cid}
        course={course}
        attending={attending}
        questions={questions}
        user={user} uid={  uid}
      /> : <Loader active inline='centered' />
    }
  }

  WithAuthorization.contextTypes = {
    course: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorizationMyCoursePage;
