import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'
import * as style from '../../style/inline'

const CourseFeatures = ({mobile, features}) => {
  // console.log('features', features && Object.keys(features).map(i => features[i].header) )

  let featureList = features ?
    <Grid stackable doubling columns={2} style={{marginTop: '0em'}}>
      {Object.keys(features).map(key =>
        <Grid.Column key={key} >
          <Header as="h3" attached='top'> {features[key].header}</Header>
          <Segment attached>{features[key].sub}</Segment>
        </Grid.Column>
      )}
      </Grid>
    : <p> no feature yet</p>

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
        <Segment basic style={style.COURSE_PAGE_BODY_SECTION}>

          <Header as="h1" dividing>Course Features</Header>
            {featureList}
          </Segment>

        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseFeatures;
