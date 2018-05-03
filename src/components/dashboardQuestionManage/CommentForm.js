import React, {Component} from 'react'
import { Form, Button } from 'semantic-ui-react'

const CommentForm = ({answerText, change, submit}) =>
  <Form reply onSubmit={submit}>
    <Form.TextArea
      value={answerText}
      name="answerText"
      placeholder="Enter your answer repliedBy, title + text, createdAt, image"
      onChange={change}/>
    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
  </Form>

export default CommentForm
