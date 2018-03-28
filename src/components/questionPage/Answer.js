import React from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

  const Answer = ({answer}) => {
    console.log('answer', answer);
    return (
      <Comment>
        <Comment.Avatar src={profile} />
        <Comment.Content>
          <Comment.Author as='a'>{answer.username}</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>{answer.answerText}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>답변 <Icon name='compose' /></Comment.Action>
            <Comment.Action>도움이 되요 <Icon name='thumbs up' /></Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    )
  }
export default Answer
