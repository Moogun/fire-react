import React, {Component} from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label, Responsive } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import Answer from './Answer'

const AnswerList = ({uid, answers, answerText, change, submit, handleDeleteAnswer, handleHelpfulAnswer}) => {
  let aList = answers ? Object.keys(answers).map(aid =>
     <Answer key={aid} answer={answers[aid]} uid={uid}
       handleDeleteAnswer={handleDeleteAnswer}
       handleHelpfulAnswer={handleHelpfulAnswer}/>)
     : <p>no answer yet</p>
  return (
    <Grid centered>
      <Grid.Column width={16}>
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          {aList}

          <Form reply onSubmit={submit}>
            <Form.TextArea
              value={answerText}
              name="answerText"
              placeholder="Enter your reply"
              onChange={change}/>
            <Button content='Add Reply' labelPosition='left' icon='edit' primary />
          </Form>
        </Comment.Group>

      </Grid.Column>
    </Grid>
  )
}

export default AnswerList
