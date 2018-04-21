import React from 'react'
import { Table, Responsive, Image, List, Grid, Segment, Container, Message } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import * as style from '../../style/inline';

const CourseTeaching = ({click, courses, loading}) => {
  // console.log('course teaching', courses);
  let courseList = courses
  ? <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
    <Responsive {...Responsive.onlyComputer} >

        <Grid centered>
        <Grid.Column width={12}>

          <Table selectable attached celled textAlign='center'>
              <Table.Header >
                <Table.Row >
                  <Table.HeaderCell collapsing>Status</Table.HeaderCell>
                  <Table.HeaderCell >Title</Table.HeaderCell>
                  <Table.HeaderCell >Date</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Students</Table.HeaderCell>
                  <Table.HeaderCell collapsing>Questions</Table.HeaderCell>
                  {/* <Table.HeaderCell width='six'>reviews</Table.HeaderCell> */}
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
                  <Table.Cell textAlign='center' >
                    26
                  </Table.Cell>
                  <Table.Cell textAlign='center' >
                    30
                  </Table.Cell>
                  {/* <Table.Cell textAlign='left' >
                    14
                  </Table.Cell> */}
                </Table.Row>
              )}
            </Table.Body>
          </Table>

      </Grid.Column>
      </Grid>
    </Responsive>

    <Responsive minWidth={320} maxWidth={991}>
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

    </Segment>
    : <Grid centered>
        <Grid.Column width={12}>
          <p> Looks like you haven't registered any course yet. Register your course</p>
        </Grid.Column>
      </Grid>

  return (
      <div>
        {courseList}
      </div>
  );
}

export default CourseTeaching
