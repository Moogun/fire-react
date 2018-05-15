import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as style from '../../constants/styles';
import { Grid, Header, Menu, Visibility, Responsive, Segment } from 'semantic-ui-react'
1
class SectionContainer extends Component {
  render() {
    const { children} = this.props
    return (
      <Responsive minWidth={768}>
        <Grid style={style.DASHBOARD_HEAD}>
            {/* May 11, 18 above grid is for colored background stretching to the both ends  */}
          <Grid.Row style={style.DASHBOARD_HEAD_M_ROW} >

              <Grid container centered>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                  {children}
                </Grid.Column>
              </Grid>

          </Grid.Row>
        </Grid>
      </Responsive>

    );
  }
}

export default SectionContainer
