import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Segment,Container, Table, Button, Responsive, Loader} from 'semantic-ui-react'
import QuestionRow from './QuestionRow'

const qPanelQuestionTablePadding = {paddingTop: '0px', 'paddingLeft': '0px'}

class QuestionTable extends Component {

  handleQueClick = (qid) => {
    // console.log('q table',qid);
    this.props.click(qid)
  }

  render() {
    const {questions, loadMore, isLoading, lastPage} = this.props
    // console.log('q table lastPage', lastPage);
    return (
      <div>
        <Table unstackable style={{marginTop: '1rem'}}>
          <Table.Body>

            {Object.keys(questions).map((q, index) =>
              <QuestionRow
                key={index}
                question={questions[q]}
                click={()=> this.handleQueClick(questions[q].qid)} /> )}
            {/* {questions.map((q, index) =>
              <QuestionRow
              key={index}
              question={q}
              click={()=> this.handleQueClick(q.qid)}
             />
           )} */}

          </Table.Body>
        </Table>
        {/* <Pagination defaultActivePage={3} totalPages={3} /> */}
        <Loader active={isLoading} inline='centered' />

        {/* May 1 hide it until pagination is implemented
          <Segment basic textAlign='center'>
          <Button content='Load more' disabled={lastPage} onClick={loadMore}/>
        </Segment> */}
      </div>
    );
  }
}

export default withRouter(QuestionTable)
