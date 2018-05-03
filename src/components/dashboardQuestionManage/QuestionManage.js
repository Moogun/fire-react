import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label, Responsive } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import * as routes from '../../constants/routes';

import Question from './Question'
import CommentForm from './CommentForm'
import AnswerList from './AnswerList'
import {db} from '../../firebase';
import {fb} from '../../firebase/firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class QuestionPage extends Component {
  state = {
    answers: [],
    answerText: '',
    error: null,
  }

  handleAnswerSubmit = (event) => {

    const {answerText} = this.state;
    let aid = db.newKey()

    console.log('[q page] why');
    const {selectedQuestion, user, uid } = this.props
    let tid = selectedQuestion[0].tid
    let cid = selectedQuestion[0].cid
    let qid = selectedQuestion[0].qid
    let answeredById = uid
    let answeredByUsername = user.username
    let answeredByUserPhoto = user.photoUrl
    let text = answerText
    let timeStamp = fb.database.ServerValue.TIMESTAMP
    let img = 'img'
    db.doSaveAnswer(tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, "2days ago", img, aid)
      .then(res => {
        //CALL FUNC IN DASHBOARD AND ADD NEW ANSWER TO THE CURRENT QUESTION - ANSWERS NODE
        // console.log('[q page] here?');
        let answer = {tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, timeStamp, img}
        // console.log('[q page], added answer', answer);
        this.props.answerAdded(qid, aid, answer)
        this.setState({answerText: '', error: null,})
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault();
  }

  handleChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  componentDidMount(){
    console.log('did mount in [question page]', '-----------------');
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate: ", nextProps, nextState);
  //   return true;
  // }

  render() {
    const { answers, answerText } = this.state
    const { handleDeleteQuestion, handleFollowQuestion,
       selectedQuestion, user, uid } = this.props
    // console.log('rdr', 'selectedQuestion', selectedQuestion, user, uid);

    let question = selectedQuestion
      ? <React.Fragment>
          <Question
            question={selectedQuestion}
            uid={uid}
            handleDeleteQuestion={handleDeleteQuestion}
            handleFollowQuestion={handleFollowQuestion}
          />
          <AnswerList
            // answers={location.state.q[0].answers}
            user={user}
            uid={uid}
            answers={selectedQuestion[0].answers}
            answerText={answerText}
            change={this.handleChange}
            submit={this.handleAnswerSubmit}
            handleDeleteAnswer={this.handleDeleteAnswer}
            handleHelpfulAnswer={this.handleHelpfulAnswer}
            />
        </React.Fragment>
      : <p>Select Question</p>

    return (
        <Segment textAlign='left'>
            {question}
        </Segment>
      )
    }
}

QuestionPage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(QuestionPage)
