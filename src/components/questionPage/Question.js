import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import {db} from '../../firebase';
import Moment from 'react-moment';

const Question = ({question}) => {
  console.log('qqqq ', question[0], question[0].title);
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
            <Comment.Action>Follow the answer with gcm ? fcm? </Comment.Action>
            {/* <Comment.Action>Save</Comment.Action>
            <Comment.Action>Hide</Comment.Action> */}
          </Comment.Actions>

        </Comment.Content>
      </Comment>
  </Comment.Group>
  )
}

export default Question
