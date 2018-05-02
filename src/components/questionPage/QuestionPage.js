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
    const {tid, cid,} = this.props.location.state.q[0]
    const {username, photoUrl, uid,} = this.props.location.state
    const qid = this.props.location.state.qid
    const {authUser} = this.context

    db.doSaveAnswer(tid, cid, qid, uid, username, photoUrl, answerText, "2days ago", 'img')
      .then(res => {
        console.log('res', res)
        this.setState({answerText: '', error: null,})
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

     // collapsed: true,
     // comment: {
     //   1: {title: '1' children: {}},
     //   2: {title: '2'},
     //   3: {title: '3', parent: {1}}
     // }
     //
     // 1. fetch all
     // 2. if !!parent, find the parent's place and splice into it ???

    event.preventDefault();
  }

  handleChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  componentDidMount(){

    let question = this.props.location.state.q
    let cid = question[0]['cid']
    let qid = question[0]['qid']
    // console.log('qqq', question[0]['qid'], question);
    fb.database().ref('answers').child(qid).on('child_added', this.handleAnswerDataSave)
  }

  handleAnswerDataSave = (data) => {
    // console.log('data', data.val());
    // let question = this.props.location.state.q
    const {answers } = this.state
    let a = {}
    a = data.val()
    a['aid'] = data.key
    answers.push(a)
    this.setState ({ answers})
  }

  handleDeleteAnswer = (answer) => {
    console.log('d answer', answer);
    const {answers } = this.state
    let qid = answer['qid']
    let aid = answer['aid']
    db.doDeleteAnswer(qid, aid)
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

  render() {
    const { answers, answerText } = this.state
    const { location, handleDeleteQuestion, handleFollowQuestion } = this.props
    // console.log('rdr', 'q page', this.props.location.state.q);
      return (
          <Segment textAlign='left'>
              <Question
                question={location.state.q}
                uid={location.state.uid}
                handleDeleteQuestion={handleDeleteQuestion}
                handleFollowQuestion={handleFollowQuestion}
              />
              <AnswerList
                // answers={location.state.q[0].answers}
                uid={location.state.uid}
                answers={answers}
                answerText={answerText}
                change={this.handleChange}
                submit={this.handleAnswerSubmit}
                handleDeleteAnswer={this.handleDeleteAnswer}
                handleHelpfulAnswer={this.handleHelpfulAnswer}
                />
          </Segment>
        )
    }
}

QuestionPage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(QuestionPage)
