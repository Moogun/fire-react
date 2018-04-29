import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import AuthUserContext from './AuthUserContext'; // error - createContext is not a function

import {firebase, db} from '../firebase';
import * as routes from '../constants/routes';

// const byPropKey = (propertyName, value) => ()=> ({
//   [propertyName]: value
// })

const withAuthorization = (authCondition) => (Component) => {

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
      return this.context.authUser ? <Component match={match} history={history} user={this.state.user} uid={this.state.uid}/> : null;
    }
  }

  WithAuthorization.contextTypes = {
    authUser: PropTypes.object,
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;

//below is auth user context reference
// import AuthUserContext from './AuthUserContext';
// render() {
//      const { authUser } = this.state;
//
//      return (
//        <AuthUserContext.Provider value={authUser}>
//          <Component />
//        </AuthUserContext.Provider>
//      );
//    }


// const AccountPage = () =>
//   <AuthUserContext.Consumer>
//     {authUser =>
//       <div>
//         <h1>Account: {authUser.email}</h1>
//         <PasswordForgetForm />
//         <PasswordChangeForm />
//       </div>
//     }
//   </AuthUserContext.Consumer>

// const AdminPage = () =>
//   <AuthUserContext.Consumer>
//     {authUser =>
//       <div>
//         <h1>Admin</h1>
//         <p>Restricted area! Only users with the admin rule are authorized.</p>
//       </div>
//     }
//   </AuthUserContext.Consumer>
//
// const authCondition = (authUser) => !!authUser && authUser.role === 'ADMIN';
//
// export default withAuthorization(authCondition)(AdminPage);

// const withAuthorization = (authCondition) => (Component) => {
//
//   class WithAuthorization extends React.Component {
//
//     componentDidMount(){
//       firebase.auth.onAuthStateChanged(authUser => {
//         if(!authCondition(authUser)) {
//           this.props.history.push(routes.SIGN_IN);
//         }
//       });
//     }
//
//     render() {
//       return this.context.authUser ? <Component /> : null;
//     }
//   }
//
//   WithAuthorization.contextTypes = {
//     authUser: PropTypes.object,
//   }
//
//   return withRouter(WithAuthorization);
// }
//
// export default withAuthorization;
