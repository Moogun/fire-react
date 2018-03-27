import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Segment,Container, Table, Button} from 'semantic-ui-react'
import QuestionRow from './QuestionRow'

class QuestionTable extends Component {

  handleQueClick = (qid) => {
    console.log('q table',qid);
    this.props.click(qid)
  }

  render() {
    const {questions} = this.props

    return (
      <Segment basic>
        <Container text>
            <Table basic='very' selectable>
            <Table.Body>

              {Object.keys(questions).map(qid =>  <QuestionRow key={qid} question={questions[qid]} click={()=> this.handleQueClick(qid)} /> )}

            </Table.Body>
          </Table>
          <Button>infinite scroll</Button>
      </Container>
      </Segment>
    );
  }
}

export default withRouter(QuestionTable)
