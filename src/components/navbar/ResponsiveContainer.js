import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility,
} from 'semantic-ui-react'

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
          {authUser
          ? <AuthContainer authUser={authUser}> {this.props.children} </AuthContainer>
          : <NonAuthContainer> {this.props.children} </NonAuthContainer> }
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
