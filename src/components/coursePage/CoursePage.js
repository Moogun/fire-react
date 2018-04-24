import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseGallery from './CourseGallery'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button, Item, Modal, Form, Input, Icon, Message } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

import {Link, withRouter} from 'react-router-dom';
import * as style from '../../style/inline';

import {db} from '../../firebase';

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

const textColor = {color: '#fff'}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})



class CoursePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      subTitle: '',
      menuFixed: false,
      openCourse: false,
      modalOpen: false,
      registered: false,
    }
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  handleRegisterSubmit = (event) => {
    const {openCourse} = this.state;
    console.log('handleRegisterSubmit open course?', openCourse);
    if (openCourse) {
      //register
      console.log('on submit openCourse', openCourse);
      // route to teacher page ? to ask a question ?
    } else {
      console.log('on submit closed Course', openCourse);
      this.handleRegisterForClosed()
    }
      event.preventDefault();
  }

  handleRegisterForClosed () {
    const {tid, cid, coursePass, password} = this.state;
    let uid = this.context.authUser.uid
    console.log('register', tid, cid, coursePass, password, uid);
    if (coursePass === password) {
      db.doEnrollInCourse(tid, cid, password, uid)
        .then(res => {
          console.log('enroll in res succedded ', res);
          this.handleRegisterModalClose ()
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
    } else {
      console.log('handle register pass is wrong', );
      this.setState(byPropKey('error', 'Wrong Password'))
    }
  }

  handleRegisterForOpenCourse = () => {
    console.log('handleRegisterForOpenCourse');
    const {tid, cid} = this.state;
    let uid = this.context.authUser.uid
    console.log('register', tid, cid, uid);
      db.doEnrollInCourse(tid, cid, '', uid)
        .then(res => {
          // console.log('enroll in res succedded ', res);
          const { match } = this.props
          // console.log('match', match);
          this.props.history.push('/my/' + match.params.tname + '/' + match.params.cTitle)
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
  }

  handleRegisterModalOpen = () => this.setState({ modalOpen: true })

  handleRegisterModalClose  = () => this.setState({ modalOpen: false, error: null })

  handleNavToTeacher = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName })
  }

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
            subTitle: course.metadata.subTitle,
            tName: course.metadata.tName,
            tEmail: course.metadata.tEmail,
            tProfileImg: course.metadata.tProfileImg,
            cid: key[0],
            course: course,
            openCourse: course.metadata.openCourse,
            coursePass: course.metadata.password,
            attendee: course.attendee,
            features: course.features,
            images: course.images,
            curri: course.curri,
            attendee: course.attendee,
          })
          const {tid, cid} = this.state
          console.log('tid, cid', tid, cid);
          let curri = course.curri
          console.log('curri', curri);

        } else {
          console.log('find a way to display course titles that have dash in it');
        }
      })
  }

  handleSecToggle = (e, secIndex) => {
    const { curri } = this.state
    console.log('sections' ,curri, 'secIndex', curri);
    curri[secIndex].expanded = !curri[secIndex].expanded
    this.setState ({curri})
  }

  // componentWillReceiveProps(nextProps){
  //   console.log('will receive props', nextProps);
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should Component Update', nextProps, nextState);
  //   return true
  // }
  componentWillUnMount(){
    console.log('UnMount');
  }
  render() {
    // const {menuFixed} = this.state
    // console.log('render');
    let authUser = this.context.authUser

    const {tName, cTitle,} = this.props.match.params

    const { course, cid, subTitle, openCourse, coursePass, error, modalOpen, tProfileImg,  features, images, curri, attendee } = this.state

    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacherName = tName ? tName : 'Teacher'
    let teacherProfile = tProfileImg ? tProfileImg : profile
    let meta = course ? course.metadata : null

    let lock = openCourse ? 'unlock' : 'lock'
    let authUserRegistered = !!attendee && Object.keys(attendee).filter(i => i === authUser.uid).length === 1 ? true : false
    console.log('userRegistered', authUserRegistered)

    let register = authUserRegistered ? null : openCourse ? <Button icon={lock} content='Register' onClick={this.handleRegisterForOpenCourse} />
    : <Modal size='mini'
        trigger={<Button icon={lock} content='Register' onClick={this.handleRegisterModalOpen}/>}
        open={modalOpen}
        onClose={this.handleRegisterModalClose }
      >
       <Modal.Header>Enter the password </Modal.Header>
       <Modal.Content image>
         <Modal.Description>
           <Form onSubmit={this.handleRegisterSubmit}>
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
             {error && <Message negative>{error}</Message>}
               <Button color='blue' fluid>
                 <Icon name='checkmark' /> Register
               </Button>
           </Form>

         </Modal.Description>
       </Modal.Content>
     </Modal>

    return (
      <div>
          <Grid style={style.COURSE_PAGE_HEAD_GRID} stackable centered>
                <Grid.Row
                  style={style.COURSE_PAGE_HEAD_GRID_ROW}
                  >
                  <Grid.Column width={12} >

                       <Header as='h1' inverted content={title} subheader='좌절하지 말고 오라' />
                       <Header as='h2' onClick={this.handleNavToTeacher}  style={{color: '#fff'}}>
                        <Image circular src={profile}/>
                        <Header.Content>
                          {tName} <Rating icon='star' defaultRating={5} maxRating={5} disabled/>
                          <Header.Subheader style={{color: '#fff'}}>
                            The best of the best
                          </Header.Subheader>
                        </Header.Content>

                      </Header>

                       {register}
                  </Grid.Column>
                </Grid.Row>
            </Grid>


            <Grid style={{ backgroundColor: '#ecf0f1', marginTop: '0rem'}}       stackable centered
              >
                <Grid.Column width={10} >

                    <CourseMeta meta={meta}/>
                    <CourseFeatures features={features}/>
                    <CourseGallery images={images}/>
                    <CourseCurri sections={curri} handleSecToggle={this.handleSecToggle}/>

                </Grid.Column>
             </Grid>

          </div>

    )
  }
}

CoursePage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(CoursePage);
