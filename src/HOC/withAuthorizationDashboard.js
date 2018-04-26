import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {

  class WithAuthorization extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        user: null,
        courseTeaching: null,
      }
    }
    componentDidMount(){

      firebase.auth.onAuthStateChanged(authUser => {
        if(!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        } else {
          db.onceGetUser(authUser.uid)
            .then(res => {
              this.setState ({ uid: authUser.uid, user: res.val(), })

              db.doFetchTeaching(authUser.uid)
              .then(snap => {

                let teaching = snap.val()
                let selectOption=[{key: 'default', text: 'All', value: 'default'}]
                let item;
                Object.keys(teaching).map(key => {
                  item={key: key, text: teaching[key].metadata.title, value: key}
                  selectOption.push(item)
                })

                this.setState( () => ({
                  courseTeaching: teaching,
                  'selectOption': selectOption,
                }))
              })
              .catch(error => {
                this.setState({[error]: error});
              });

            })
            .catch(error => {
              this.setState({[error]: error});
            });

        }
      });
    }

    render() {
      const {match, history} = this.props
      const { courseTeaching, selectOption} = this.state
      return this.context.authUser
      ? <Component match={match} history={history}
        user={this.state.user} uid={this.state.uid}
        courseTeaching={courseTeaching} selectOption={selectOption}
      />
      : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
