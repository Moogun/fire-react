import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
import * as style from '../../style/inline'

class CEditMeta extends Component {

  render() {
    const { course, textbook, date, location, time, submit, infoToSave } = this.props

    let textbookChanged = !!course && course.metadata.textbook !== textbook
    let dateChanged = !!course && course.metadata.date !== date
    let locationChanged = !!course && course.metadata.location !== location
    let timeChanged = !!course && course.metadata.time !== time

    let noChange = textbookChanged === false && dateChanged === false && locationChanged === false && timeChanged === false

    const isInvalid =
    textbook === '' || textbook == undefined ||
    date === '' || date == undefined ||
    location === ''|| location == undefined ||
    time === ''|| time == undefined ||
	  noChange === true ||
    infoToSave === false

    return (
      <React.Fragment >
        {/* <Segment basic style={{boxShadow:'1px 1px 10px 1px grey', padding: '0'}}> */}
          <Header as='h1' attached='top'>Basic Info
            {isInvalid ?
              <Button basic disabled floated='right' content='Saved' />
            : <Button onClick={submit} floated='right' color='red' content='Save'/>
            }
          </Header>

          <Segment attached stacked style={style.C_EDIT_MENU_PADDING} >
              <Form>
                 <Form.Field required>
                   <label>Textbook</label>
                   <Input placeholder='Textbook'
                     value={textbook || ''}
                      name='textbook'
                      onChange={this.props.change}
                    />
                 </Form.Field>
                 <Form.Field required>
                   <label>Date</label>
                   <Input placeholder='Date'
                     value={date || ''}
                     name='date'
                     onChange={this.props.change}
                   />
                 </Form.Field>
                 <Form.Field required>
                   <label>Time</label>
                   <Input placeholder='Time'
                     value={time || ''}
                     name='time'
                     onChange={this.props.change}
                   />
                 </Form.Field>
                 <Form.Field required>
                   <label>Location</label>
                   <Input placeholder='Location'
                     value={location || ''}
                     name='location'
                     onChange={this.props.change}
                   />
                 </Form.Field>
               </Form>
             </Segment>
         {/* </Segment> */}
       </React.Fragment>
    );
  }
}

export default CEditMeta
