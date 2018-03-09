import React from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

import AnswerList from './AnswerList'

const QuestionPage = () => (
  <Segment>
    <Container text>

      <Question />
      <AnswerList />
      <CommentForm />

    </Container>
  </Segment>
)

export default QuestionPage

const Question = () =>
  <Comment.Group>
    <Comment>
      <Comment.Avatar src={profile} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic! Lorem ipsum dolor sit amet, consectetur adipisicing   elit. Quidem, ullam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum enim consectetur nulla suscipit, atque ad. Consequuntur laborum tempora officia laboriosam ipsam sit sed incidunt! Quasi dolores nobis cupiditate eos praesentium.
          <Image src={profile}/>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, nemo.
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

const CommentForm = () =>
  <Form reply>
    <Form.TextArea />
    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
  </Form>
