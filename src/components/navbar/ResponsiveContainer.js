import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Responsive, Segment, Sidebar, Visibility,
} from 'semantic-ui-react'

import DesktopContainer from './DesktopContainer'
import MobileContainer from './MobileContainer'

class ResponsiveContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    // console.log('authUser respsonvie', this.context.authUser);
    return (
        <div>
          <DesktopContainer authUser={this.context.authUser}>{this.props.children}</DesktopContainer>
          <MobileContainer authUser={this.context.authUser}>{this.props.children}</MobileContainer>
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
