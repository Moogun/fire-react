import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

// const CEditMetaBorder = {

class CEditMeta extends Component {

  render() {
    const { course, textbook, date, location, time, submit } = this.props

    let textbookChanged = !!course && course.metadata.textbook !== textbook
    let dateChanged = !!course && course.metadata.date !== date
    let locationChanged = !!course && course.metadata.location !== location
    let timeChanged = !!course && course.metadata.time !== time

    const isInvalid =
    textbook === ''||
    date === ''||
    location === ''||
    time === ''||
	  (textbookChanged === false && dateChanged === false && locationChanged === false && timeChanged === false)

    return (
      <React.Fragment >
        {/* <Segment basic style={{boxShadow:'1px 1px 10px 1px grey', padding: '0'}}> */}
          <Header as='h1' attached='top'>Basic Info
            <Button disabled={isInvalid} onClick={submit} floated='right' color='red'>Save</Button>
          </Header>

          <Segment attached stacked
            // style={CEditMetaBorder}
            >
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
                 {/* <Button onClick={submit}>저장</Button> */}
               </Form>
             </Segment>
         {/* </Segment> */}
       </React.Fragment>
    );
  }
}

export default CEditMeta
