import React from 'react'
import { Table, Header, Image,  } from 'semantic-ui-react'
import helen from '../../assets/helen.png'

const QuestionRow = ({question, click}) => (
  <Table.Row onClick={click}>
    <Table.Cell
      collapsing
      >
      <Header as='h4' image>
        <Image src={!!question.photoUrl ? question.photoUrl : helen} rounded size='mini' />
      </Header>
    </Table.Cell>
    <Table.Cell>

      <Header.Content>
        {question.title}
        <Header.Subheader>{question.text} </Header.Subheader>
      </Header.Content>


    </Table.Cell>
    <Table.Cell
      collapsing
      textAlign='center'>
      <Header as='h5' image>
        <Header.Content>
          {question.answerCount} <br />
          <Header.Subheader>Responses</Header.Subheader>
        </Header.Content>
      </Header>

    </Table.Cell>
  </Table.Row>
)

export default QuestionRow
