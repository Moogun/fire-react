import React from 'react'
import { Segment, Container, List } from 'semantic-ui-react'

const CourseMeta = () => {

  return (
        <Segment basic style={{ padding: '4em 0em' }}>
          <Container text>
            <h2>Course Info</h2>
            <List as='ul'>
             <List.Item as='li'>date </List.Item>
             <List.Item as='li'>time </List.Item>
             <List.Item as='li'> textbook </List.Item>
             <List.Item as='li'> location</List.Item>
             <List.Item as='li'> phone / email </List.Item>
           </List>

          </Container>
        </Segment>
  )
}
export default CourseMeta;
