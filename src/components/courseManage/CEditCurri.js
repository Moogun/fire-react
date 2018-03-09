import React from 'react'
import { Form, Input, Button, Segment, Icon } from 'semantic-ui-react'

const CEditCurri = () => {
  return (
    <Segment>
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
