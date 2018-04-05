import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button, Item, Modal, Form, Input, Icon } from 'semantic-ui-react'

import {Link, withRouter} from 'react-router-dom';
import {db} from '../../firebase';

import { createEditorState, Editor,} from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 1px rgba(0,0,0, 0.2)',
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

const coursePageHeader = { backgroundColor: '#34495e', marginTop: '0rem'}

class CoursePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      menuFixed: false,
      openCourse: false,
      modalOpen: false,
      registered: false,
      editorState: createEditorState(),
    }
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  componentDidMount() {
    console.log('course page did mount', this.props.match.params);
    let cTitle = this.props.match.params.cTitle
    let title = cTitle.replace(/-/g, ' ');

    db.onceGetCourseWithTitle(title)
      .then(cSnap => {
        let c = cSnap.val()

        if (c) {
          let key = Object.keys(c)
          let course = c[key]
          console.log('course', course);
          this.setState ({
            tid: course.metadata.tid,
            tName: course.metadata.tName,
            tEmail: course.metadata.tEmail,
            tProfileImg: course.metadata.tProfileImg,
            cid: key[0],
            course: course,
            openCourse: course.metadata.openCourse,
            coursePass: course.metadata.password,
            attendee: course.attendee,
          })

          let curri = course.curri
          console.log('curri', curri);
          this.onChange(createEditorState(JSON.parse(curri)))
        } else {
          console.log('find a way to display course titles that have dash in it');
        }
      })

  }

  handleRoute = () => {
      const {tName,} = this.props.match.params
      this.props.history.push('/teacher' + '/' + tName)
  }

  onSubmit = (event) => {
    const {openCourse} = this.state;

    if (openCourse) {
      //register
      console.log('on submit openCourse', openCourse);
      // route to teacher page ? to ask a question ?
    } else {
      console.log('on submit closed Course', openCourse);
      this.handleRegister()
    }
      event.preventDefault();
  }

  handleRegister () {
    const {tid, cid, coursePass, password} = this.state;
    let uid = this.context.authUser.uid
    console.log('register', tid, cid, coursePass, password, uid);
    if (coursePass === password) {
      db.doEnrollInCourse(tid, cid, password, uid)
        .then(res => {
          console.log('enroll in res succedded ', res);
          this.handleModalClose()
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
    } else {
      console.log('handle register pass is wrong', );
    }
  }

  handleModalOpen = () => this.setState({ modalOpen: true })

  handleModalClose = () => this.setState({ modalOpen: false })

  handleClick = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName})
  }

  componentWillReceiveProps(nextProps){
    console.log('will receive props', nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should Component Update', nextProps, nextState);
    return true
  }

  render() {
    // const {menuFixed} = this.state
    const {tName, cTitle,} = this.props.match.params
    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacher = tName ? tName : 'Teacher'

    const { course, cid, openCourse, coursePass, attendee, modalOpen, tProfileImg, editorState } = this.state
    console.log('c page render course modalOpen', modalOpen);
    console.log('edi state', mediumDraftExporter(editorState.getCurrentContent()) );
    const renderedHtml = mediumDraftExporter(editorState.getCurrentContent())


    let meta = course ? course.metadata : null

    let lock = openCourse ? 'unlock' : 'lock'

    let register = openCourse ? <Button icon={lock} content='Register' onClick={this.handleModalOpen} />
    : <Modal size='mini'
        trigger={<Button icon={lock} content='Register'
        onClick={this.handleModalOpen}
        open={modalOpen}
        onClose={this.handleModalClose}
      />}>
       <Modal.Header>Enter the password </Modal.Header>
       <Modal.Content image>
         <Modal.Description>
           <Form onSubmit={this.onSubmit}>
             <Form.Field>
               <Input
                   icon='lock'
                   iconPosition='left'
                   // value={lock}
                   onChange={(event) => this.setState(byPropKey('password', event.target.value))}
                   type="text"
                   placeholder="Password"
                 />
             </Form.Field>
               <Button color='blue' fluid>
                 <Icon name='checkmark' /> Register
               </Button>
           </Form>

         </Modal.Description>
       </Modal.Content>
     </Modal>

    return (
      <Grid>
        <Grid.Row>
            <Grid.Column>

                <Grid style={coursePageHeader} stackable centered>

                      <Grid.Row
                        style={{ marginTop: '2rem', marginBottom: '2rem'}}
                        >
                        <Grid.Column width={12} >

                          <Segment basic style={{margin: '0rem'}}>
                            <Header as='h1'
                              style={{color: '#fff'}}
                              content={title}
                             />
                             <Header as='h4' style={{marginTop: '0', color: '#fff'}}>  to be filled with subheader </Header>
                             <Header as='h4' style={{marginTop: '0', color: '#fff'}}>   {tName} </Header>
                             {register}
                          </Segment>

                        </Grid.Column>


                      </Grid.Row>
                  </Grid>

                  <Grid style={{ backgroundColor: '#ecf0f1', marginTop: '0rem'}}       stackable centered
                    >
                      <Grid.Column width={10} >
                          <CourseMeta meta={meta}/>
                          <CourseFeatures/>
                          <CourseCurri curri={renderedHtml}/>
                      </Grid.Column>
                  </Grid>

            </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}

CoursePage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(CoursePage);
