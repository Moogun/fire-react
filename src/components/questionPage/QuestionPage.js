import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label, Responsive } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

import Question from './Question'
import CommentForm from './CommentForm'
import AnswerList from './AnswerList'
import {db} from '../../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class QuestionPage extends Component {
  state = {
    answerText: '',
    error: null,
  }

  handleAnswerSubmit = (event) => {

    const {answerText} = this.state;
    const {tid, cid,} = this.props.location.state.q[0]
    const qid = this.props.location.state.qid
    const {authUser} = this.context
    console.log('tid, cid', tid, cid);

    db.doSaveAnswer(tid, cid, qid, authUser.uid,  answerText, "2days ago", 'img')
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

  // componentDidMount(){
  //   // const {answers} = this.props.location.state.q
  //   // this.setState({answers: answers})
  // }

  render() {
    const { answerText } = this.state
    const { location } = this.props
    // let answerList = answers ? answers : null
    console.log('rdr', 'q page', this.props.location.state.q);
    // console.log('rdr', 'q page props', this.props);
      return (
          <Segment>
              <Question question={location.state.q}/>
              <AnswerList
                answers={location.state.q[0].answers}
                value={answerText}
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
