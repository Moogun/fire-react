import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

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
