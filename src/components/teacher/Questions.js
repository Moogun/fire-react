import React, {Component} from 'react'
import QSearch from '../questions/QSearch'
import QuestionTable from '../questions/QuestionTable'
import profile from '../../assets/profile-lg.png'

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {id:1, title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, mollitia.', text: 'details', image: 'y', userAsking:'uid-1', answerCount:3,},
        {id:2, title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', text: 'details', image: 'x', userAsking:'uid-2', answerCount:0,},
      ]
    };
  }

  handleNewQ = () => {
    // console.log('new q', this.props.click);
    this.props.click()
  }

  handleQueClick = (qid) => {
    console.log('questions qid', qid);
    this.props.queClick(qid)
    // this.props.history.push(`${this.props.match.url}/${qid}`)
  }

  render() {
    const {questions} = this.state
    const {tid} = this.props
    return (
        <div>
          <QSearch tid={tid} click={() => this.props.click()}/>
          <QuestionTable tid={tid} questions={questions} click={this.handleQueClick} />
        </div>
    );
  }
}

export default Questions;
