import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps',nextProps);
      this.setState({
        textbook: nextProps.textbook,
        date: nextProps.date,
        time: nextProps.time,
        location: nextProps.location
      });
  }

  shouldComponentUpdate(nextProps) {
    console.log('nextProps ',nextProps);
      return this.state.textbook !== nextProps.textbook ||
      this.state.date !== nextProps.date ||
      this.state.time !== nextProps.time ||
      this.state.location !== nextProps.location ;
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
    console.log('edit meta render props', this.props);
    return (
      <Segment basic>
        <Header as='h2'>Basic Info</Header>
        <Divider />

          <Form onSubmit={this.onSubmit}>
             <Form.Field>
               <label>Textbook</label>
               <Input placeholder='Textbook'
                  value={this.state.textbook}
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
