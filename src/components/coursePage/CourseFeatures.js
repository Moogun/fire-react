import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'

const CourseMeta = ({mobile}) => {

  return (
    // <Grid.Row style={{margin: '3em 0em'}}>
    //   <Grid columns={3} stackable container>
    <Grid.Row style={{margin: '3em 0em'}}>
         <Grid columns={3} stackable container>
          <Header as="h1" dividing>Course Features</Header>

          <Grid.Column>
            <Header as="h2" attached='top'>something</Header>
            <Segment attached> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nulla, omnis. Libero laboriosam delectus, recusandae, quo neque quisquam molestiae ut!</Segment>
          </Grid.Column>

          <Grid.Column>
            <Header as="h2" attached='top'>something</Header>
            <Segment attached> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nulla, omnis. Libero laboriosam delectus, recusandae, quo neque quisquam molestiae ut!</Segment>
          </Grid.Column>

          <Grid.Column>
            <Header as="h2" attached='top'>something</Header>
            <Segment attached> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nulla, omnis. Libero laboriosam delectus, recusandae, quo neque quisquam molestiae ut!</Segment>
          </Grid.Column>

          <Grid.Column>
            <Header as="h2" attached='top'>something</Header>
            <Segment attached> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas nulla, omnis. Libero laboriosam delectus, recusandae, quo neque quisquam molestiae ut!</Segment>
          </Grid.Column>

          </Grid>
      </Grid.Row>

  )
}
export default CourseMeta;
