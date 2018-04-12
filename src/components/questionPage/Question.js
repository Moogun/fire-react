import React, {Component} from 'react'
import { Comment } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const Question = (props) => {
  return (

    <Comment.Group>
      <Comment>
        <Comment.Avatar src={profile} />
        <Comment.Content>
          <Comment.Author>{props.question.title}</Comment.Author>
            <Comment.Metadata>
              <div>{props.question.askedBy}</div>
              <div>
                {props.question.createdAt}
              </div>
            </Comment.Metadata>
            <Comment.Text>
              {props.question.text}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus repellat iusto, dolorem quae quas dicta nobis autem, eum. Voluptatum nulla ad officiis qui quibusdam atque, minima incidunt obcaecati iusto consectetur.
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
