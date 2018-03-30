import React from 'react'
import { Table, Header, Image,  } from 'semantic-ui-react'
import helen from '../../assets/helen.png'

const QuestionRow = ({question, click}) => (
  <Table.Row onClick={click}>
    <Table.Cell
      // collapsing
      >
      <Header as='h4' image>
        <Image src={helen} rounded size='mini' />
        <Header.Content>
             {question.title}
          <Header.Subheader>{question.text}</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell collapsing textAlign='center'>
      <Header as='h5' image>
        <Header.Content>
          1{question.answerCount} <br />
          <Header.Subheader>Responses</Header.Subheader>
        </Header.Content>
      </Header>

    </Table.Cell>
  </Table.Row>
)

{/* <Table.Row>
  <Table.Cell >
    <Header as='h4' image>
      <Image src='/assets/images/avatar/small/lena.png' rounded size='mini' />
      <Header.Content>
          Lena
        <Header.Subheader>Human Resources</Header.Subheader>
      </Header.Content>
    </Header>
  </Table.Cell>
  <Table.Cell collapsing textAlign='center'>
      22 <br/>
      Responses
  </Table.Cell>
</Table.Row> */}

export default QuestionRow
