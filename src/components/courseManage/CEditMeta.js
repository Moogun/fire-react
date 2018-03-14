import React, {Component} from 'react'
import { Form, Input, Button, Segment } from 'semantic-ui-react'
import {db} from '../../firebase';

const INITIAL_STATE = {
  textbook: '',
  date: '',
  time: '',
  location: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CEditMeta extends Component {
  state = {
    INITIAL_STATE,
  }

  componentDidMount() {
    // Mar 14 if a user tries to access this route directly, props will not hold anything due to not proper access
    console.log('edit meta did mount');

    // this.setState({
    //   textbook: textbook,
    //   date: date,
    //   time: time,
    //   location: location
    // })
  }

  onSubmit = (event) => {
    const {textbook, date, time, location} = this.state;
    const { history, match, courseId, teacherId } = this.props;

    db.doUpdateCourseMeta(courseId, date, time, location, textbook, teacherId )
      .then((res)=> {
        this.setState({...INITIAL_STATE})
        console.log(' meta saved', res);
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
      event.preventDefault();
  }

  render() {
    console.log('edit meta render');
    return (
      <Segment>
          <Form onSubmit={this.onSubmit}>
             <Form.Field>
               <label>Textbook</label>
               <Input placeholder='Textbook'
                  // value={}
                  onChange={(event) => this.setState(byPropKey('textbook', event.target.value))}
                />
             </Form.Field>
             <Form.Field>
               <label>Date</label>
               <Input placeholder='Date'
                 onChange={(event) => this.setState(byPropKey('date', event.target.value))}/>
             </Form.Field>
             <Form.Field>
               <label>Time</label>
               <Input placeholder='Time'
                 onChange={(event) => this.setState(byPropKey('time', event.target.value))}/>
             </Form.Field>
             <Form.Field>
               <label>Location</label>
               <Input placeholder='Location'
                 onChange={(event) => this.setState(byPropKey('location', event.target.value))}/>
             </Form.Field>
             <Button>저장</Button>
           </Form>
         </Segment>
    );
  }
}

// }

export default CEditMeta
