import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Segment,Container, Table, Button, Responsive, Pagination} from 'semantic-ui-react'
import QuestionRow from './QuestionRow'

const qPanelQuestionTablePadding = {paddingTop: '0px', 'paddingLeft': '0px'}

class QuestionTable extends Component {

  handleQueClick = (qid) => {
    console.log('q table',qid);
    this.props.click(qid)
  }

  render() {
    const {questions} = this.props

    return (
      <div>
        <Table unstackable style={{marginTop: '1rem'}}>
          <Table.Body>

            {/* {Object.keys(questions).map(qid =>
              <QuestionRow key={qid}
                question={questions[qid]}
                click={()=> this.handleQueClick(qid)} /> )} */}
            {questions.map((q, index) =>
              <QuestionRow
              key={index}
              question={q}
              click={()=> this.handleQueClick(q.qid)}
             />
           )}

          </Table.Body>
        </Table>
        <Pagination defaultActivePage={3} totalPages={3} />
        <Segment basic textAlign='center'>
          <Button content='Load more'/>
        </Segment>
      </div>
    );
  }
}

export default withRouter(QuestionTable)
