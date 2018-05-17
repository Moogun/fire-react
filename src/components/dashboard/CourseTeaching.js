import React from 'react'
import { Table, Responsive, Image, List, Grid, Segment, Container,  Loader, Dimmer  } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import * as style from '../../style/inline';

const CourseTeaching = ({click, courses, loading}) => {
  console.log('courses', courses);
  let courseList = courses
  ? <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
    <Responsive minWidth={768} >

        <Grid centered>
        <Grid.Column mobile={16} tablet={16} computer={16}>

          <Table selectable attached celled textAlign='center'>
              <Table.Header >
                <Table.Row >
                  <Table.HeaderCell collapsing>상태</Table.HeaderCell>
                  <Table.HeaderCell >제목</Table.HeaderCell>
                  <Table.HeaderCell >기간</Table.HeaderCell>
                  <Table.HeaderCell collapsing>학생</Table.HeaderCell>
                  <Table.HeaderCell collapsing>질문</Table.HeaderCell>
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
                    {courses[key].metadata.attendeeCount ? courses[key].metadata.attendeeCount : 0}
                  </Table.Cell>
                  <Table.Cell textAlign='center' >
                    {courses[key].metadata.questionCount ? courses[key].metadata.questionCount : 0}
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

    <Responsive minWidth={320} maxWidth={767}>
        {/* <Container> */}
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
        {/* </Container> */}
    </Responsive>

    </Segment>
    : <Loader active size='massive' inline='centered'>Loading</Loader>


  return (
      <div>
        {courseList}
      </div>
  );
}

export default CourseTeaching
