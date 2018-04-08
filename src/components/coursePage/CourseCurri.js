import React from 'react'
import { Segment, Container, Header, Grid } from 'semantic-ui-react'

const CourseCurri = ({curri}) => {

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column>
        <Segment basic>
        <Header as="h1" dividing>Curriculum </Header>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere laudantium id eligendi, vero dolores, dolorum delectus veritatis voluptate inventore ex est quo, rem autem, repudiandae nihil minima atque omnis. Aliquid.
        </p>
          {/* {curri}
          <li>abc</li>
          <li>abc</li>
          <li>abc</li> */}
        </Segment>
      </Grid.Column>
    </Grid.Row>
  )
}
export default CourseCurri;
