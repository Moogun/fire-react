import React from 'react'
import { Table, Responsive, Image, List, Grid, Segment, Container } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const CourseTeaching = ({click, courses}) => {
  console.log('course teaching', courses);
  let courseList = courses
  ? <div>
    <Responsive {...Responsive.onlyComputer} >
        <Grid centered>
        <Grid.Column width={12}>
          <Table selectable attached celled textAlign='center'>
              <Table.Header >
                <Table.Row >
                  <Table.HeaderCell width={3}>Status</Table.HeaderCell>
                  <Table.HeaderCell width='six'>Title</Table.HeaderCell>
                  <Table.HeaderCell width='six'>Date</Table.HeaderCell>
                  <Table.HeaderCell width='six'>Students Enrolled</Table.HeaderCell>
                  <Table.HeaderCell width='six'>Questions</Table.HeaderCell>
                  <Table.HeaderCell width='six'>reviews</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {Object.keys(courses).map(key =>
                <Table.Row  key={key} onClick={()=> click(key)}>
                  <Table.Cell textAlign='left' >
                    {courses[key].metadata.isPublished ? <p>Published</p> : <p>draft</p>}
                  </Table.Cell>
                  <Table.Cell textAlign='left' >
                    {courses[key].metadata.title}
                  </Table.Cell>
                  <Table.Cell textAlign='left' >
                    {courses[key].metadata.date}
                  </Table.Cell>
                  <Table.Cell textAlign='left' >
                    26
                  </Table.Cell>
                  <Table.Cell textAlign='left' >
                    30
                  </Table.Cell>
                  <Table.Cell textAlign='left' >
                    14
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
      </Grid.Column>
      </Grid>
    </Responsive>

    <Responsive {...Responsive.onlyMobile}>
        <Container>
            <List divided >
              {Object.keys(courses).map(key =>
                <List.Item key={key} onClick={()=> click(key)}>

                  <Image src={profile} size='tiny'/>

                  <List.Content  verticalAlign='top'>
                    <List.Header>{courses[key].metadata.title}</List.Header>
                    {courses[key].metadata.date}
                    {courses[key].metadata.isPublished ? <p>Published</p> : <p>draft</p>}
                  </List.Content>

                  <List.Content floated='right' >
                    {courses[key].metadata.openCourse ? <p>Open</p> : <p>Private</p>}
                  </List.Content>
                </List.Item>
              )}
            </List>
        </Container>
    </Responsive>

    </div>
    : <Container> <p> Looks like you haven't registered any course yet. Register your courses</p> </Container>

  return (
      <div>
        {courseList}
      </div>
  );
}

export default CourseTeaching
