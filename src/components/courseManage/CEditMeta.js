import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

class CEditMeta extends Component {
  state = {
    // INITIAL_STATE,
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps',nextProps);
  //     this.setState({
  //       textbook: nextProps.textbook,
  //       date: nextProps.date,
  //       time: nextProps.time,
  //       location: nextProps.location
  //     });
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps ',nextProps);
  //     return this.state.textbook !== nextProps.textbook ||
  //     this.state.date !== nextProps.date ||
  //     this.state.time !== nextProps.time ||
  //     this.state.location !== nextProps.location ;
  // }
  //
  // onSubmit = (event) => {
  //   const {textbook, date, time, location, isLoading} = this.state;
  //   const { history, match, courseId, teacherId } = this.props;
  //   console.log('courseId', courseId, 'teacherId', teacherId);
  //   this.setState({isLoading: !isLoading})
  //   db.doUpdateCourseMeta(courseId, date, time, location, textbook, teacherId )
  //     .then((res)=> {
  //       this.setState({...INITIAL_STATE})
  //       console.log(' meta saved', res);
  //       this.setState({isLoading: !isLoading})
  //     })
  //     .catch(error => {
  //       this.setState(byPropKey('error', error))
  //     })
  //     event.preventDefault();
  // }

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
