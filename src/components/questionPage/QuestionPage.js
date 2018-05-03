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

    if (this.props.location.state.q != 'null') {
      // CASE: MY COURSE PAGE
      const {tid, cid,} = this.props.location.state.q[0]
      const {username, photoUrl, uid,} = this.props.location.state
      const qid = this.props.location.state.qid
      const {authUser} = this.context

      console.log('answers save', answerText, tid, cid, username, photoUrl, uid, qid,);
      db.doSaveAnswer(tid, cid, qid, uid, username, photoUrl, answerText, "2days ago", 'img', aid)
        .then(res => {
          this.setState({answerText: '', error: null,})
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
    } else {
      // CASE: DASHBOARD Q PANEL
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

    }
    event.preventDefault();
  }

  handleChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  componentDidMount(){
    console.log('did mount in [question page]', '-----------------');
    if (this.props.location.state.q != 'null') {
      let question = this.props.location.state.q
      console.log('did mount in [question page]', question[0]['qid']);
      let cid = question[0]['cid']
      let qid = question[0]['qid']
      console.log('question', question);
      fb.database().ref('answers').child(qid).on('child_added', this.handleAnswerDataSave)
    }
  }

  handleAnswerDataSave = (data) => {
    const {answers } = this.state
    let a = {}
    a = data.val()
    a['aid'] = data.key
    answers.push(a)
    let question = this.props.location.state.q
    this.setState ({ question: question, answers})
    console.log('[dmt question]', this.state.question);
  }

  handleDeleteAnswer = (answer) => {
    console.log('d answer', answer);
    const {answers } = this.state
    let tid = answer['tid']
    let qid = answer['qid']
    let aid = answer['aid']
    db.doDeleteAnswer(tid, qid, aid)
    .then(res => {

        let index = answers.map(a => a['aid'] == aid).indexOf(true)
        answers.splice(index, 1)
        console.log('index', index, answers);
        this.setState ({answers})
    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  handleHelpfulAnswer = (answer) => {
    console.log('hh answer', answer);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate: ", nextProps, nextState);
  //   return true;
  // }

  render() {
    const { answers, answerText } = this.state
    const { location, handleDeleteQuestion, handleFollowQuestion,
       selectedQuestion, user, uid } = this.props
    console.log('rdr', 'selectedQuestion', selectedQuestion, user, uid);

    let question
    if (location.state.q != 'null') {
      // console.log('location.state.q', location.state.q);
      question = <React.Fragment>
            <Question
              question={location.state.q}
              uid={location.state.uid}
              handleDeleteQuestion={handleDeleteQuestion}
              handleFollowQuestion={handleFollowQuestion}
            />
            <AnswerList
              // answers={location.state.q[0].answers}
              answers={answers}
              uid={location.state.uid}
              answerText={answerText}
              change={this.handleChange}
              submit={this.handleAnswerSubmit}
              handleDeleteAnswer={this.handleDeleteAnswer}
              handleHelpfulAnswer={this.handleHelpfulAnswer}
              />
          </React.Fragment>
      } else if (selectedQuestion != null){
        question = <React.Fragment>
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
      }

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
