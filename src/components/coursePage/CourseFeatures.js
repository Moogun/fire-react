import React from 'react'
import { Segment, Grid, Header } from 'semantic-ui-react'

const CourseMeta = ({mobile}) => {

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Grid.Column >
        <Segment basic>

          <Header as="h1" dividing>Course Features</Header>
             <Grid columns={2} stackable doubling>

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
            </Segment>

        </Grid.Column>
      </Grid.Row>
  )
}
export default CourseMeta;
