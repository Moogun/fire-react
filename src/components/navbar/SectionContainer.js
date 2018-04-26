import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as style from '../../style/inline';
import { Grid, Header, Menu, Visibility, Responsive, Segment } from 'semantic-ui-react'
1
class SectionContainer extends Component {
  render() {
    const { children} = this.props
    return (
      <Responsive minWidth={768}>
        <Grid style={style.DASHBOARD_HEAD} centered>

            <Grid.Column width={12}>
              {children}
            </Grid.Column>

        </Grid>
      </Responsive>

    );
  }
}

export default SectionContainer
