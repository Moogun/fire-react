import React, {Component} from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import Answer from './Answer'

const AnswerList = (props) => {
  let answers = props.answers
  let aList = answers ? Object.keys(answers).map(aid =>
     <Answer key={aid} answer={answers[aid]} />)
     : <p>no answer yet</p>
  return (
    <Comment.Group>
      <Header as='h3' dividing>Comments</Header>
      {aList}
    </Comment.Group>
  )
}

export default AnswerList
