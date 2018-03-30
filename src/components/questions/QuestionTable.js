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
      <Segment basic textAlign='center'>
        <Container text>
            <Table attached celled padded>
            <Table.Body>

              {Object.keys(questions).map(qid =>
                <QuestionRow key={qid}
                  question={questions[qid]}
                  click={()=> this.handleQueClick(qid)} /> )}

            </Table.Body>
          </Table>
          <br/>
          <Button primary>Load more</Button>
        </Container>
      </Segment>
    );
  }
}

export default withRouter(QuestionTable)
