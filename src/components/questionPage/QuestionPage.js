import React from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import profile from '../../assets/profile-lg.png'

import AnswerList from './AnswerList'

const QuestionPage = (props) => {
  // console.log('q page render 1 ', props.location.state)
  return (
      <Segment basic>
        <Container text>

          <Question question={props.location.state.q}/>
          <AnswerList />
          <CommentForm />

        </Container>
      </Segment>
    )
}

export default withRouter(QuestionPage)

const Question = (props) => {
  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar src={profile} />
        <Comment.Content>
          <Comment.Author as='a'>{props.question.username}</Comment.Author>
          <Comment.Metadata>
            <div>5days ago</div>
          </Comment.Metadata>
          <Comment.Text>{props.question.title}
            {/* <Image src={profile}/> */}
          </Comment.Text>
          <Comment.Text>
            {props.question.text}
          </Comment.Text>
          <Comment.Actions>
            <Button as='div' labelPosition='right'>
              <Button basic color='blue'>
                <Icon name='bookmark' />
                궁금
              </Button>
              <Label as='a' basic color='blue' pointing='left'>11</Label>
            </Button>

          </Comment.Actions>
        </Comment.Content>
      </Comment>
  </Comment.Group>
  )
}

const CommentForm = () =>
  <Form reply>
    <Form.TextArea />
    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
  </Form>
