import React from 'react'
import { Segment, Container, Header, Grid } from 'semantic-ui-react'

const CourseCurri = ({curri}) => {

  return (
    <Grid.Row style={{margin: '0em 0em'}}>
      <Grid.Column>
        <Segment basic>
        <Header as="h1" dividing>Curriculum </Header>
          {curri}
          <li>abc</li>
          <li>abc</li>
          <li>abc</li>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )
}
export default CourseCurri;
