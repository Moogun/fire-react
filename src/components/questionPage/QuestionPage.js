import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label, Responsive } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

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
    // console.log('handle answer submit tid, cid', tid, cid, username, uid);

    db.doSaveAnswer(tid, cid, qid, uid, username, photoUrl, answerText, "2days ago", 'img')
      .then(res => {
        console.log('res', res)
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

    let question = this.props.location.state.q
    let cid = question[0]['cid']
    let qid = question[0]['qid']
    console.log('qqq', question[0]['qid'], question);

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

  render() {
    const { answers, answerText } = this.state
    const { location } = this.props
    // let answerList = answers ? answers : null
    console.log('rdr', 'q page', this.props.location.state.q);
    // console.log('rdr', 'q page props', this.props);
      return (
          <Segment textAlign='left'>
              <Question question={location.state.q}/>
              <AnswerList
                // answers={location.state.q[0].answers}
                answers={answers}
                answerText={answerText}
                change={this.handleChange}
                submit={this.handleAnswerSubmit}
                />
          </Segment>
        )
    }
}

QuestionPage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(QuestionPage)
