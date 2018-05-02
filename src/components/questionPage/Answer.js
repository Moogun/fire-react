import React from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import Moment from 'react-moment';

const Answer = ({answer, uid, handleDeleteAnswer, handleHelpfulAnswer}) => {
  console.log('answer', answer);
  let remove = answer['answeredById'] == uid
  ? <Comment.Action onClick={() => handleDeleteAnswer(answer)}>Delete ?</Comment.Action>
  : <Comment.Action onClick={() => handleHelpfulAnswer(answer)}>Helpful (fixing) <Icon name='thumbs up' /></Comment.Action>

  return (
    <Comment>
      <Comment.Avatar src={profile} />
      <Comment.Content>
        <Comment.Author as='a'>{answer.answeredByUsername}</Comment.Author>
        <Comment.Metadata>
            <Moment fromNow unix>{answer.timeStamp / 1000}</Moment>
        </Comment.Metadata>
        <Comment.Text>{answer.text}</Comment.Text>
        <Comment.Actions>
          {remove}  
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  )
}
export default Answer
