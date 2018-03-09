import React from 'react'
// import {Link, Route} from 'react-router-dom'

import { Table, Rating} from 'semantic-ui-react'

const CourseTableRow = ({course, click}) =>
  <Table.Row onClick={click}>
    <Table.Cell textAlign='left'>
        {course.title} <br />
        {course.subTitle}
    </Table.Cell>
    <Table.Cell>
      {course.date}<br/>
      {course.time}
    </Table.Cell>
    <Table.Cell>
        {course.location}
    </Table.Cell>
    <Table.Cell>
    {course.textbook}
    </Table.Cell>
    <Table.Cell>
      {/* {course.capacity} */}
      capa 0/15
    </Table.Cell>
  </Table.Row>

export default CourseTableRow
