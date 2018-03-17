import React from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider } from 'semantic-ui-react'

const CEditCurri = () => {
  return (
    <Segment basic>
      <Header as='h2'>Curriculum</Header>
      <Divider />
       <Form>
          <Form.Field>
            <input placeholder='Enter' />
          </Form.Field>
          <Form.Field>
            <Button basic> <Icon name='plus'/> New lecture </Button>
          </Form.Field>

          <Button type='submit'>저장</Button>
        </Form>
    </Segment>
  );
}

export default CEditCurri
