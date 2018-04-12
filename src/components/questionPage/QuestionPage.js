import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

import Question from './Question'
import CommentForm from './CommentForm'
import AnswerList from './AnswerList'
import {db} from '../../firebase';

const INITIAL_STATE = {
  answerText: '333',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class QuestionPage extends Component {
  state = {
    INITIAL_STATE,

  }

  handleSubmit = (event) => {

    const {answerText} = this.state;
    const {tid, cid,} = this.props.location.state.q
    const qid = this.props.location.state.qid
    const {authUser} = this.context

    db.doSaveAnswer(tid, cid, qid, authUser.uid, answerText, "2days ago", 'img')
      .then(res => {
        console.log('res', res)
        this.setState({...INITIAL_STATE})
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
    const {answers} = this.props.location.state.q
    this.setState({answers: answers})
  }

  render() {
    const { answerText, answers } = this.state
    let answerList = answers ? answers : null
      return (

            <Container text>
              <Segment>
                {/* <Icon name='left arrow' /> */}
                <Question question={this.props.location.state.q}/>
                <AnswerList answers={answerList} value={answerText} submit={this.handleSubmit} change={this.handleChange}/>
                {/* <CommentForm value={answerText} submit={this.handleSubmit} change={this.handleChange}/> */}
              </Segment>
            </Container>

        )
    }
}

QuestionPage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(QuestionPage)
