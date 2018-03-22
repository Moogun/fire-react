import React from 'react'
import { Table  } from 'semantic-ui-react'

const CourseTeaching = ({click, courses}) => {
  console.log('course teaching', courses);
  let courseList = courses ?
    <Table basic='very' selectable striped>
        <Table.Body>
          {Object.keys(courses).map(key =>
          <Table.Row  key={key} onClick={()=> click(key)}>
            <Table.Cell textAlign='left' >
              {courses[key].metadata.isPublished ? <p>Published</p> : <p>draft</p>}
            </Table.Cell>
            <Table.Cell textAlign='left' >
              date
            </Table.Cell>
            <Table.Cell>
              {courses[key].metadata.title}
              </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    : <p> Looks like you haven't registered any course yet. Register your courses</p>

  return (
      <div>
        {courseList}
      </div>
  );
}

export default CourseTeaching
