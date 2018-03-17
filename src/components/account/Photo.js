import React from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Image, Form, Input } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const Photo = () => {
  return (
      <Segment basic>
        <Header as='h2'>Photo</Header>
        <Divider />

        <Form onSubmit>
          <Image src={profile} circular centered size='small'/>
          <br/>
          <Form.Field>
            <Input type='file' placeholder='upload new file'/>
          </Form.Field>
          <Button type='submit'>Save</Button>
        </Form>
      </Segment>
  );
}

export default Photo
