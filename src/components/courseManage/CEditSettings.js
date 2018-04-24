import React, {Component} from 'react'
import { Form, Input, Button, Segment, Label, Header, Divider, Dropdown } from 'semantic-ui-react'
import * as style from '../../style/inline'

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
      const options = [ { key: '1', value: 'private', text: 'Private' },
      { key: '2', value: 'public', text: 'Public' } ]
      return (
        <React.Fragment>
          <Header as='h1' attached='top'>Course settings</Header>
          <Segment attached style={style.C_EDIT_MENU_PADDING}>
            <p>Privacy</p>
              {/* <Form> */}
              {/* <Button.Group>
                 <Button primary basic={closed} active = {open}
                   onClick={() => this.props.toggle(1)}
                   >Public</Button>
                 <Button color='red' basic={open} active = {closed}
                   onClick={() => this.props.toggle(0)}
                   >Private</Button>
               </Button.Group> */}
                {/* <p> Setting a password makes your course private, and available by those who knows your password' </p>
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
               </Form> */}
               <Form>
                <Form.Select fluid options={options} placeholder='Privacy' />
                <Form.Button>Save</Form.Button>
              </Form>
           </Segment>
           <Segment attached stacked style={style.C_EDIT_MENU_PADDING}>
             <p>Course Status</p>
               <Segment basic style={{padding: '0'}}>
                  <Button basic color='grey' size='small'>Unpublish</Button> This will unpublish your course. 
                </Segment>
                <Segment basic style={{padding: '0'}}>
                  <Button basic color='red' size='small' onClick={remove} style={{paddingLeft: '29px', paddingRight: '29px'}}>Delete</Button> Needs caution Confirm This will remove your course permantaly
                </Segment>
           </Segment>
         </React.Fragment>
      );
    }
}

export default CEditSettings
