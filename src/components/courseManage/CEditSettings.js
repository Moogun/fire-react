import React from 'react'
import { Form, Input, Button, Segment, Label } from 'semantic-ui-react'

const CEditSettings = () => {
  return (
    <Segment>
        <Form>
           <Form.Field>
             <Label>Password</Label>
             <Input placeholder='Password' />
           </Form.Field>
           <Button type='submit'>저장</Button>
         </Form>
       </Segment>
  );
}

export default CEditSettings
