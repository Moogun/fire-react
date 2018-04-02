import React, {Component} from 'react'
import { Form, Input, Button, Segment, Label, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

const CEditMetaBorder = {borderRadius: '0px'}

class CEditSettings extends Component {

    render() {

      const { teacherId, courseId, openCourse, password, change, submit, remove } = this.props
      console.log('settings passowrd', password, teacherId, courseId, openCourse, password);

      let open, closed
      if (openCourse) {
        open = true, closed =false
      } else {
        open = false, closed =true
      }
      const isInvalid = closed && password.length < 4 ;

      return (
        <Segment style={CEditMetaBorder}>
          <Header as='h3' content='Course settings'></Header>
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
             <Divider />
             <Segment>
               <Header as='h5' content='Course status'></Header>
               <Button>Unpublish</Button>
               {/* <Popup
                  trigger={<Button primary fluid
                    // active={isPublished}
                    onClick={this.handlePublish}
                    >{published}</Button>}
                  content='Need to update info first before publishing'
                /> */}
               <Button onClick={remove}>Delete</Button>

             </Segment>

           </Segment>
      );
    }
}

export default CEditSettings
