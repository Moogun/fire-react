import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

class CEditMeta extends Component {

  render() {
    console.log('edit meta render props', this.props);
    const { textbook, date, location, time, submit } = this.props

    return (
      <Segment basic>
        <Header as='h2'>Basic Info</Header>
        <Divider />

          <Form>
             <Form.Field>
               <label>Textbook</label>
               <Input placeholder='Textbook'
                 value={textbook || ''}
                  name='textbook'
                  onChange={this.props.change}
                />
             </Form.Field>
             <Form.Field>
               <label>Date</label>
               <Input placeholder='Date'
                 value={date || ''}
                 name='date'
                 onChange={this.props.change}
               />
             </Form.Field>
             <Form.Field>
               <label>Time</label>
               <Input placeholder='Time'
                 value={time || ''}
                 name='time'
                 onChange={this.props.change}
               />
             </Form.Field>
             <Form.Field>
               <label>Location</label>
               <Input placeholder='Location'
                 value={location || ''}
                 name='location'
                 onChange={this.props.change}
               />
             </Form.Field>
             <Button onClick={submit}>저장</Button>
           </Form>
         </Segment>
    );
  }
}

export default CEditMeta
