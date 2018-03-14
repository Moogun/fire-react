import React, {Component} from 'react'
import { Form, Input, Button, Segment, Label, Header } from 'semantic-ui-react'
import {db} from '../../firebase';

const INITIAL_STATE = {
  open: true,
  closed: false,
  password: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CEditSettings extends Component {
  state = {
     ...INITIAL_STATE,
   }

    handleClick = () => this.setState({ active: !this.state.active })

    onSubmit = (event) => {
      const { open, password } = this.state;
      const { history, match, courseId, teacherId } = this.props;

      // console.log('public', this.state.open );

      db.doUpdateCoursePrivacy(courseId, open, password, teacherId )
        // .then((res)=> {
        //   this.setState({...INITIAL_STATE})
        //   console.log(' meta saved', res);
        // })
        // .catch(error => {
        //   this.setState(byPropKey('error', error))
        // })
        event.preventDefault();
    }

    render() {
      const { open, closed, password } = this.state
      const { openCourse, currentPassword } = this.props
      const isInvalid =
            // open === openCourse ||
            // closed && currentPassword === password ||
            closed && password.length < 4 ;
            // 1. prev open and current open , 2 closed && pass length < 4, 3 closed && old pass === new pass 

      console.log('length', password.length);
      console.log('length --', closed &&
      password.length > 3);
      return (
        <Segment>
          <Header as='h3' content='Course privacy settings'></Header>

           <Segment basic>
              <Form onSubmit={this.onSubmit}>
                <Button.Group>
                 <Button primary basic={closed} active = {open} onClick={() => this.setState({ closed: false, open: true}) } >Public</Button>
                 <Button color='red' basic={open} active = {closed} onClick={() => this.setState({ closed: true, open: false}) }>Private</Button>
               </Button.Group>

                <Header as="h4" content='Setting a password makes your course private, and available by those who knows your password'/>
                 <Form.Field>
                   <Input placeholder='Password' disabled={this.state.open} onChange={(event) =>this.setState({password: event.target.value}) } />
                 </Form.Field>
                 <Button type='submit' disabled={isInvalid}>저장</Button>
               </Form>
             </Segment>
           </Segment>
      );
    }
}

export default CEditSettings
