import React from 'react'
import { Form, Input, Button, Segment } from 'semantic-ui-react'

const CEditMeta = () => {
  return (
    <Segment>
        <Form>
           <Form.Field>
             <label>Textbook</label>
             <input placeholder='Textbook' />
           </Form.Field>
           <Form.Field>
             <label>Date</label>
             <input placeholder='Date' />
           </Form.Field>
           <Form.Field>
             <label>Time</label>
             <input placeholder='Time' />
           </Form.Field>
           <Form.Field>
             <label>Location</label>
             <input placeholder='Location' />
           </Form.Field>
           <Form.Field>
             <label>Password</label>
             <input placeholder='Password' />
           </Form.Field>

           <Button type='submit'>저장</Button>
         </Form>
       </Segment>
  );
}

export default CEditMeta
