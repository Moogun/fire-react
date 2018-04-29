import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';

const withAuthorizationMyCoursePage = (authCondition) => (Component) => {

  class WithAuthorization extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        user: null,
      }
    }
    componentDidMount(){
      firebase.auth.onAuthStateChanged(authUser => {
        if(!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        } else {
          db.onceGetUser(authUser.uid)
            .then(res => this.setState ({ uid: authUser.uid, user: res.val(), }))
            .catch(error => {
              this.setState({['error']: error});
            });
        }
      });
    }

    render() {
      const {match, history} = this.props
      const { user, uid } = this.state
      return this.context.authUser
      ? <Component
        match={match} history={history}
        user={this.state.user} uid={this.state.uid}
      />
      : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorizationMyCoursePage;
