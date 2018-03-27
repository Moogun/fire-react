import React, {Component} from 'react'
import QSearch from '../questions/QSearch'
import QuestionTable from '../questions/QuestionTable'
import profile from '../../assets/profile-lg.png'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
    }
  }

  handleNewQ = () => {
    this.props.click()
  }

  handleQueClick = (qid) => {
    // console.log('questions qid', qid);
    this.props.queClick(qid)
    // this.props.history.push(`${this.props.match.url}/${qid}`)
  }

  render() {
    const {tid, questions} = this.props
    // console.log('question render 1 ', questions )
    let q = questions ? <QuestionTable tid={tid} questions={questions} click={this.handleQueClick} />
     : <p>no question yet</p>
    return (
        <div>
          <QSearch tid={tid} click={() => this.props.click()}/>
          {q}
          {/* <QuestionTable tid={tid} questions={questions} click={this.handleQueClick} /> */}
        </div>
    );
  }
}

export default Questions;
