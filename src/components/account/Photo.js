import React, {Component} from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Image, Form, Input } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import {db} from '../../firebase';

const Photo = ({image, photo, photoChange, submit}) => {
  let photoUrl
  console.log('img[0]', !!image && !!Object.keys(image)[0]);
  if (!!image && !!Object.keys(image)[0]) {
    let i = Object.keys(image)[0]
    photoUrl = image[i].imagePreviewUrl
  } else {
    photoUrl = photo
  }

  const isInvalid = photo === photoUrl

  return (
      <Segment basic>
        <Header as='h2'>Photo</Header>
        <Divider />

        <Form onSubmit={submit}>
          <Image src={photoUrl} circular centered size='small'/>
          <br/>
          <Form.Field>
            <Input type='file' placeholder='upload new file' onChange={photoChange}/>
          </Form.Field>
          <Button type='submit' disabled={isInvalid}>Save</Button>
        </Form>
      </Segment>
  );
}

export default Photo
