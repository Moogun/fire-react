import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Segment,Container, Table, Button, Responsive} from 'semantic-ui-react'
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
        <Responsive {...Responsive.onlyComputer}>
           <Container text>

            <Q_Table questions={questions}/>

          </Container>
        </Responsive>


        {/* This produced the same with below, Guess it has something to do with 
           <Responsive {...Responsive.onlyTablet}>
          <Q_Table questions={questions}/>
        </Responsive> */}

        <Responsive minWidth={320} maxWidth={991}>
          <Q_Table questions={questions}/>
        </Responsive>
    </div>
    );
  }
}

export default withRouter(QuestionTable)


const Q_Table = ({questions}) => {
  return (
    <div>
      <Table unstackable style={{marginTop: '1rem'}}>
        <Table.Body>

          {Object.keys(questions).map(qid =>
            <QuestionRow key={qid}
              question={questions[qid]}
              click={()=> this.handleQueClick(qid)} /> )}

        </Table.Body>
      </Table>
      <Segment basic textAlign='center'>
        <Button content='Load more'/>
      </Segment>
    </div>
  );
}
