import React, {Component} from 'react'
import { Form, Input, Button, Segment, Grid, Label, Header, Divider, Dropdown } from 'semantic-ui-react'
import * as style from '../../style/inline'

class CEditSettings extends Component {

    render() {

      const { teacherId, courseId, openCourse, coursePrivacy, password, change, submit, remove, privacyChange, course } = this.props
      console.log('settings openCourse, coursePrivacy', openCourse, coursePrivacy, password);
      // console.log('settings privacy change course', course);

      let openCourseAndNoChange = openCourse === 'public' && coursePrivacy === 'public' ;
      let privateCourseAndNoChange = openCourse !== 'public' && coursePrivacy === 'private'
      let passwordLeng = coursePrivacy === 'private' && password.length < 4

      const isInvalid = openCourseAndNoChange || privateCourseAndNoChange || coursePrivacy === '' || passwordLeng

      const options = [
        { key: '1', value: 'public', text: 'Public' },
        { key: '2', value: 'private', text: 'Private' } ]
      return (
        <React.Fragment>
          <Header as='h1' attached='top'>Course settings</Header>
          <Segment attached style={style.C_EDIT_MENU_PADDING}>
            <p>Privacy</p>
              <Grid columns={2}>
                  <Grid.Column>
                    <Form>
                     <Form.Select fluid options={options} placeholder='Privacy' defaultValue={coursePrivacy} onChange={privacyChange}/>
                     {coursePrivacy === 'private' ?
                       <Form.Input fluid
                         placeholder='Password (more than 4 characters)'
                         name='password'
                         //disabled={!closedAndPasswordReady}
                         onChange={this.props.change}
                       /> : null }

                     {coursePrivacy === 'public' || coursePrivacy === ''
                     ? <p>Public courses show up in search result</p>
                     : <p>Private courses don't show up in search result. Instead, share the course URL and password directly with students you want to enroll in your course.</p> }


                     {isInvalid
                      ? <Button basic disabled color='red' content='Saved' />
                      : <Form.Button onClick={submit} color='red' content='Save' />
                     }
                   </Form>
                  </Grid.Column>
                  <Grid.Column>
                  </Grid.Column>
                </Grid>
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
