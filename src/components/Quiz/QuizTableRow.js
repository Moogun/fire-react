import React from 'react'
import { Table, Rating} from 'semantic-ui-react'

const QuizTableRow = ({course, click}) =>
  <Table.Row onClick={click}>
    <Table.Cell textAlign='left'>
        {/* {course.metadata.title} <br />
        {course.metadata.subTitle} */}
    </Table.Cell>
    <Table.Cell>
      {/* {course.metadata.date}<br/> */}
      {/* {course.metadata.time} */}
    </Table.Cell>
    <Table.Cell>
        {/* {course.metadata.location} */}
    </Table.Cell>
    <Table.Cell>
    {/* {course.metadata.textbook} */}
    </Table.Cell>
    <Table.Cell>
      {/* {course.capacity} */}
      capa 0/15
    </Table.Cell>
  </Table.Row>

export default QuizTableRow
