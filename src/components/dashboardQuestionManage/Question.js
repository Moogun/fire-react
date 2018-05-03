import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import {db} from '../../firebase';
import Moment from 'react-moment';

const Question = ({question, uid, handleDeleteQuestion, handleFollowQuestion}) => {

  let remove = !!question && question[0].askedById == uid
  ? <Comment.Action onClick={() => handleDeleteQuestion(question[0])}>Delete ?</Comment.Action>
  : <Comment.Action onClick={() => handleFollowQuestion(question[0])}>Follow the answer (fixing) </Comment.Action>

  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar src={question.photoUrl !== undefined ? question.photoUrl : profile} />
        <Comment.Content>
          <Comment.Author>{question[0].title}</Comment.Author>
            <Comment.Metadata>
              <div>{question[0].askedByUsername}</div>
              <div>
                <Moment fromNow unix>{question[0].timeStamp / 1000}</Moment>
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {question[0].text}
            </Comment.Text>

          <Comment.Actions>
            {remove}
          </Comment.Actions>

        </Comment.Content>
      </Comment>
  </Comment.Group>
  )
}

export default Question
