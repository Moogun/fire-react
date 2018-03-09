import React from 'react'
import { Segment,Container, Table, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const Answer = () =>
  <Comment.Group>
    <Header as='h3' dividing>Comments</Header>

    <Comment>
      <Comment.Avatar src={profile} />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>답변 <Icon name='compose' /></Comment.Action>
          <Comment.Action>도움이 되요 <Icon name='thumbs up' /></Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src={profile} />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>답변 <Icon name='compose' /></Comment.Action>
          <Comment.Action>도움이 되요 <Icon name='thumbs up' /></Comment.Action>
        </Comment.Actions>
      </Comment.Content>

      <Comment.Group>
        <Comment>
          <Comment.Avatar src={profile} />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>
              Elliot you are always so right :)
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>답변 <Icon name='compose' /></Comment.Action>
              <Comment.Action>도움이 되요 <Icon name='thumbs up' /></Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src={profile} />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>
          Dude, this is awesome. Thanks so much
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>답변 <Icon name='compose' /></Comment.Action>
          <Comment.Action>도움이 되요 <Icon name='thumbs up' /></Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

  </Comment.Group>

export default Answer
