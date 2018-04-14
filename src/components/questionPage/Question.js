import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const Question = (props) => {
  console.log('qqqq ', props.question[0], props.question[0].title);
  return (

    <Comment.Group>
      <Comment>
        <Comment.Avatar src={profile} />
        <Comment.Content>
          <Comment.Author>{props.question[0].title}</Comment.Author>
            <Comment.Metadata>
              <div>{props.question[0].askedByUsername}</div>
              <div>
                {props.question[0].createdAt}
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {props.question[0].text}
            </Comment.Text>

          <Comment.Actions>
            <Comment.Action>나도 궁금</Comment.Action>
            {/* <Comment.Action>Save</Comment.Action>
            <Comment.Action>Hide</Comment.Action> */}
          </Comment.Actions>

        </Comment.Content>
      </Comment>
  </Comment.Group>
  )
}

export default Question
