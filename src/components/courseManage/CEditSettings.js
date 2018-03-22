import React, {Component} from 'react'
import { Form, Input, Button, Segment, Label, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

class CEditSettings extends Component {

    render() {
      // const { open, closed, password } = this.state
      const { openCourse, password, change, submit } = this.props
      console.log('settings passowrd', password);
      let open, closed
      if (openCourse) {
        open = true, closed =false
        // console.log('open', open, 'closed', closed);
      } else {
        open = false, closed =true
        // console.log('open', open, 'closed', closed);
      }
      const isInvalid = closed && password.length < 4 ;

      return (
        <Segment basic>
          <Header as='h3' content='Course privacy settings'></Header>
          <Divider />
           <Segment basic>
              <Form>
                <Button.Group>
                 <Button primary basic={closed} active = {open}
                   onClick={() => this.props.toggle(1)}
                   >Public</Button>
                 <Button color='red' basic={open} active = {closed}
                   onClick={() => this.props.toggle(0)}
                   >Private</Button>
               </Button.Group>

                <Header as="h4" content='Setting a password makes your course private, and available by those who knows your password'/>
                 <Form.Field>
                   <Input placeholder='Password'
                     name='password'
                     disabled={open}
                     onChange={this.props.change}

                   />
                 </Form.Field>
                 <Button type='submit'
                   disabled={isInvalid}
                   onClick={submit}>저장</Button>
               </Form>
             </Segment>
           </Segment>
      );
    }
}

export default CEditSettings
