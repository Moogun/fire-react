import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'
import * as style from '../../style/inline'

const CourseFeatures = ({mobile, features}) => {
  // console.log('features', features && Object.keys(features).map(i => features[i].header) )

  let featureList = features ?
    <Grid container doubling centered columns={3} style={{padding: '5rem 0rem', }}>
      {Object.keys(features).map(key =>
        <Grid.Column key={key} textAlign='center'>
          <Header as="h3" attached='top' style={{fontSize: '2rem',}}> {features[key].header}
          </Header>
          <Segment attached>{features[key].sub}</Segment>
        </Grid.Column>
      )}
      </Grid>
    : null

  return (
    <div>
      {featureList}
    </div>
  )
}
export default CourseFeatures;
