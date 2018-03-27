import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Segment,Container, Table} from 'semantic-ui-react'
import QuestionRow from './QuestionRow'

class QuestionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
              {questions.map(q => <QuestionRow key={q.id} question={q}
                click={()=> this.handleQueClick(q.id)} /> )
              }
            </Table.Body>
          </Table>
        infinite scroll
      </Container>
      </Segment>
    );
  }
}

export default withRouter(QuestionTable)
