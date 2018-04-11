import PropTypes from 'prop-types'
import React, { Component } from 'react'
import * as style from '../../style/inline';
import { Grid, Header, Menu, Visibility, Responsive, Segment } from 'semantic-ui-react'

class SectionContainer_M extends Component {
  render() {
    const { children} = this.props
    return (
      <Responsive {...Responsive.onlyMobile} >
        <Grid style={style.DASHBOARD_HEAD_M} >
            <Grid.Row style={style.DASHBOARD_HEAD_M_ROW} >

              <Grid container>
                  <Grid.Column >

                    {children}

                  </Grid.Column>
              </Grid>

            </Grid.Row>
          </Grid>
      </Responsive>

    );
  }
}

export default SectionContainer_M
