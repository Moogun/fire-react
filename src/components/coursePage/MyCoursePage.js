import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseGallery from './CourseGallery'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button, Item, Modal, Form, Input, Icon } from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

import profile from '../../assets/profile-lg.png'

import * as style from '../../style/inline';

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

const textColor = {color: '#fff'}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

const COURSE_PAGE_HEADER = { backgroundColor: '#34495e', marginTop: '0rem'}

class MyCoursePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      subTitle: '',
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
          })
          const {tid, cid} = this.state
          console.log('tid, cid', tid, cid);
          let curri = course.curri
          console.log('curri', curri);
          this.onChange(createEditorState(JSON.parse(curri)))
        } else {
          console.log('find a way to display course titles that have dash in it');
        }
      })

  }

  handleNavToTeacher = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {

    console.log('render');
    const {tName, cTitle,} = this.props.match.params
    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacherName = tName ? tName : 'Teacher'

    const { course, cid, subTitle, openCourse, coursePass, attendee, modalOpen, tProfileImg, editorState, features, images, activeItem } = this.state

    let teacherProfile = tProfileImg ? tProfileImg : profile

    const renderedHtml = mediumDraftExporter(editorState.getCurrentContent())

    let meta = course ? course.metadata : null
    const {match} = this.props

    return (
      <Grid >
          <Grid.Column>
              <SectionContainer>
                <Header as='h1' style={style.DASHBOARD_HEADER}>Dashboard</Header>

                <Menu size='small' secondary pointing inverted
                  style={style.DASHBOARD_MENU} >
                    <Menu.Item
                      name='questions'
                      active={activeItem === 'questions'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/questions`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='announcement'
                      active={activeItem === 'announcement'}
                      onClick={this.handleItemClick}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                  </Menu>
              </SectionContainer>
              <SectionContainer_M>
                <Header as='h3'
                  style={style.DASHBOARD_HEADER_M}
                  >Course title goes here </Header>

                <Menu size='small' secondary pointing inverted
                  style={style.DASHBOARD_MENU_M}
                   >
                    <Menu.Item
                      name='questions'
                      active={activeItem === 'questions'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/questions`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='announcement'
                      active={activeItem === 'announcement'}
                      onClick={this.handleItemClick}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                  </Menu>
              </SectionContainer_M>

              <Grid style={style.DASHBOARD_BODY}>
                  <Grid.Column>

                    menu itesm
                    {/* <Switch>
                      <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                      <Route path={routes.DASHBOARD_COURSES} render = {(props) => <CourseTeaching {...props} courses={courseTeaching} click={this.handleCourseClick}/> } />
                      <Route path={routes.DASHBOARD_Q_PANEL} render = {() => <QPanel
                        options={selectOption}
                        questions={questions}
                        didChooseCourse={this.handleDidChooseCourse}
                        selectedCourse={cid}
                        queClick={this.handleQuestionClick}
                       />} />
                    </Switch> */}

                  </Grid.Column>
              </Grid>

          </Grid.Column>
      </Grid>

    )
  }
}

MyCoursePage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(MyCoursePage);
