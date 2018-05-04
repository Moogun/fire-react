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

  componentDidMount(){
    console.log('did mount in [question page]', '-----------------');
  }

  render() {
    const { answers } = this.state
    const { handleDeleteQuestion, handleFollowQuestion,
       selectedQuestion, user, uid, answerText, answerChange, onAnswerSubmit } = this.props
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
            change={answerChange}
            // submit={this.handleAnswerSubmit}
            submit={onAnswerSubmit}
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
