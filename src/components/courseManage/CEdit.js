import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import * as routes from '../../constants/routes';
import { Segment,Container, Table, Header, Grid, Image, Menu, Item, Button, Form, Icon, Input, Divider, Popup, Checkbox } from 'semantic-ui-react'

import CEditTitle from './CEditTitle'
import CEditTitleEdit from './CEditTitleEdit'
import CEditMeta from './CEditMeta'
import CEditCurri from './CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import withAuthorization from '../../HOC/withAuthorization'

import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState,} from 'medium-draft';
import 'medium-draft/lib/index.css';

const CEditBody = {backgroundColor: '#ecf0f1', marginTop: '0px', minHeight: '700px'}
const CEditTitleBg = {backgroundColor: '#2c3e50'}
const CEditMenu = {marginTop: '4rem'}

const INITIAL_STATE = {
  open: true,
  closed: false,
  password: '',
  isLoading: false,
  activeItem: 'info',
  openCourse: true,
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
       notifications: OrderedSet(),
       count: 0,
       key: 0,
       editorState: createEditorState(), // for empty
    };
    this.sideButtons = [{
      title: 'Image',
      component: ImageSideButton,
      // component: CustomImageSideButton,
    }];

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  //life cycle
  componentDidMount() {

    const {isLoading } = this.state
    const {match} = this.props
    console.log('did mount 1 ', 'beforeIsLoading')
    this.setState({isLoading: !isLoading})

    let courseId = match.params.cid
    db.onceGetCourse(match.params.cid)
      .then(snapshot => {
        console.log('did mount 2 sna', snapshot.val());
        let course = snapshot.val()
        let meta = course.metadata

        db.onceGetUser(course.metadata.teacherId)
          .then(user => {
            console.log('did mount 3 user', user.val().courseTeaching[courseId].metadata);

            const {isLoading } = this.state

            this.setState ({
              courseId: courseId,

              title: meta.title,
              subTitle: meta.subTitle,
              teacherId: meta.teacherId,

              teacherName: user.val().username,

              textbook: meta.textbook,
              date: meta.date,
              time: meta.time,
              location: meta.location,
              openCourse: meta.openCourse ? meta.openCourse : false,
              password: meta.password ? meta.password : '',
              isPublished: meta.isPublished,

              // editorState: creategEditorState(JSON.parse(course.curri)),
              isLoading: !isLoading
              })
            this.onChange(createEditorState(JSON.parse(course.curri)))
            console.log('did mount', 4);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  componentWillUnmount(){
    console.log('will un mount', 0);
  }

  //
  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

  // course edit
  handleInputChange = (event) => {
    this.setState(byPropKey(event.target.name, event.target.value))
  }

  onTitleSubmit = (e) => {
    console.log('title submit');
    const { courseId, teacherId, title, subTitle } = this.state
    db.doUpdateCourseTitle(courseId, teacherId, title, subTitle)
      .then(res => {
        console.log('title submit res', res)
      }).catch(error => {
        this.setState(byPropKey('error', error))
      })
    e.preventDefault()
  }

  onInfoSubmit = (event) => {
    const {courseId, teacherId, textbook, date, time, location, isLoading} = this.state
    console.log('onInfoSubmit', courseId, teacherId, textbook, date, time, location, isLoading);
    this.setState({isLoading: !isLoading})

    db.doUpdateCourseMeta(courseId, teacherId, textbook, date, time, location)
        .then((res)=> {
          console.log(' meta saved', res);
          const {isLoading} = this.state
          console.log('is Loading', isLoading);
          this.setState({isLoading: !isLoading})
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
      event.preventDefault();
  }

  onCurriSubmit = ( ) => {
    const {courseId, teacherId} = this.state
    console.log('course teacher', courseId, teacherId);

    var editorData = convertToRaw(this.state.editorState.getCurrentContent());
    console.log('editor1 data getCurrentContent',editorData);

    var strData = JSON.stringify(editorData)

    db.doUpdateCourseCurri(courseId, teacherId, strData)
      .then(response => console.log('succeded uploading',response))
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  onSettingsSubmit = (event) => {
      const {courseId, teacherId, openCourse, password } = this.state;
      console.log('on settings submit public', this.state.openCourse );

      db.doUpdateCoursePrivacy(courseId, teacherId, openCourse, password)
        .then((res)=> {
          console.log(' doUpdateCoursePrivacy', res);
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
        event.preventDefault();
  }

  handleSettingsOpenOrClose = (btn) => {
    const { openCourse } = this.state
    if (btn === 1) {
      this.setState({openCourse: true})
    } else {
      this.setState({openCourse: false})
    }
  }

  handleRemoveCourse = () => {

    const { teacherId, courseId} = this.state
    const {history} = this.props
    db.doRemoveCourse(teacherId, courseId)
      .then(res => {
        console.log('remove', res)
        console.log('history', history)
        history.replace({pathname: '/dashboard/courses'})
        })
  }

  handlePublish = () => {

    const {courseId, teacherId, isPublished, isLoading, textbook} = this.state
      console.log('1 textbook', !!textbook);
      // if (!!textbook) {
      console.log('before 1',isLoading);
      this.setState({isLoading: !isLoading})
      console.log('handle publish', courseId, teacherId, isPublished);

      db.doPublishCourse(courseId, teacherId, isPublished)
        .then(response => {
          console.log('succeed uploading')
          const { isLoading } = this.state
          this.setState({isLoading: !isLoading})
          this.addNotification()
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        })
  }

  //notification
  barStyleFactory = (index, style) => {
    return Object.assign(
      {},
      style,
      { top: `${2 + (index * 4)}rem`, left: 'auto', right: '-100%', height: '3rem', backgroundColor: '#0E6EB8'}
    );
  }

  activeBarStyleFactory = (index, style) => {
    return Object.assign(
      {},
      style,
      { top: `${2 + (index * 4)}rem`, left: 'auto', right: '1rem', height: '3rem', color: '#fff', font: 'Lato'}
    );
  }

  addNotification = () => {
    const {count, key} = this.state
    const newCount = count + 1;
    const newkey = key + 1

    this.setState ({ key: newkey})
      return this.setState({
        notifications: this.state.notifications.add({
          message: `Succesfully saved `,
          key: newkey,
        })
      });
    }

  removeNotification = (count) => {
    this.setState({
      notifications: this.state.notifications.filter(n => n.key !== count)
    })
  }

  handleSettingsClick = () => {
    const { history, match } = this.props
    history.push({ pathname: `${match.url}/settings`})
  }

  render() {
    console.log('render', 1);
    const {activeItem, isLoading,
      courseId, title, subTitle, teacherName, teacherId,
      textbook, date, time, location,
      curri,
      openCourse, password, isPublished,
      editorState
    } = this.state
    const {match} = this.props

    console.log('render 2 course info', courseId, title, teacherName, teacherId, textbook, openCourse);
    let published = isPublished ? 'Unpublish' : 'Publish'
    return (
      <Segment basic loading={isLoading} style={CEditBody}>

        <Grid centered>
          {/* <Grid.Row centered> */}
            <Grid.Column>

            <Grid >
              <Grid.Column style={CEditTitleBg}>
                <CEditTitle
                  title={title} teacherName={teacherName} teacherId={teacherId} isPublished={isPublished}
                  settingsClick={this.handleSettingsClick}/>
              </Grid.Column>
            </Grid>

              <Grid container stackable>
                <Grid.Column width={3}>
                  <Menu vertical fluid style={CEditMenu} >
                    <Menu.Item name='titleEdit'
                       active={activeItem === 'titleEdit'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/titleEdit`}
                       >
                       <Icon name='check circle outline'  size='large'/> title
                    </Menu.Item>
                    <Menu.Item name='info'
                       active={activeItem === 'info'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/info`}
                       >
                       <Icon name='check circle outline'  size='large'/> Info
                    </Menu.Item>
                    <Menu.Item name='features'
                       active={activeItem === 'features'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/features`}
                       >
                      <Icon name='radio'  size='large'/> Features
                    </Menu.Item>
                    <Menu.Item name='curri'
                       active={activeItem === 'curri'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/curriculum`}
                       >
                       <Icon name='radio'  size='large'/> Curriculum
                    </Menu.Item>

                    <Menu.Item name='assignment'
                      disabled
                       active={activeItem === 'assignment'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/assignment`}
                       >
                       Assignment (Coming soon)
                    </Menu.Item>
                   </Menu>

                </Grid.Column>

                <Grid.Column width={11}>
                    <Switch>
                      <Redirect exact from={match.url} to={`${match.url}/info`} />
                      <Route path={`${match.url}/titleEdit`} render={(props) => <CEditTitleEdit
                        {...props}
                        title={title}
                        subTitle={subTitle}
                        change={this.handleInputChange}
                        titleSubmit={this.onTitleSubmit}
                      /> }/>
                      <Route path={`${match.url}/info`} render={(props) => <CEditMeta
                        {...props}
                        title={title}
                        subTitle={subTitle}
                        textbook={textbook}
                        date={date}
                        time={time}
                        location={location}
                        change={this.handleInputChange}
                        submit={this.onInfoSubmit}
                      /> }/>
                      <Route path={`${match.url}/curriculum`} render={(props) =><CEditCurri
                        {...props}
                        courseId={courseId}
                        teacherId={teacherId}
                        editorState={editorState}
                        change={this.onChange}
                        submit={this.onCurriSubmit}
                      />} />
                      <Route path={`${match.url}/settings`} render={() => <CEditSettings
                        courseId={courseId}
                        teacherId={teacherId}
                        openCourse={openCourse}
                        password={password}
                        change={this.handleInputChange}
                        toggle={this.handleSettingsOpenOrClose}
                        submit={this.onSettingsSubmit}
                        remove={this.handleRemoveCourse}
                      />} />
                      <Route path={`${match.url}/assignment`} render={() => <CEditSettings />} />

                    </Switch>
                </Grid.Column>

              </Grid>

        {/* <NotificationStack
          barStyleFactory={this.barStyleFactory}
          activeBarStyleFactory={this.activeBarStyleFactory}
          // notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification)
          })}
        /> */}
              </Grid.Column>
          {/* </Grid.Row> */}

        </Grid>
      </Segment>
    );
  }
}

// class CourseEdit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//
//     };
//   }
//   componentDidMount(){
//     console.log('did mount 1 ', )
//   }
//
//   componentWillUnmount(){
//     console.log('will un mount 0 ', )
//   }
//
//   shouldComponentUpdate(nextProps, nextState){
//     console.log('should cpnt update', nextProps, nextState);
//   }
//
//   render() {
//     console.log('render 1 ', )
//     return (
//         <div>
//
//         </div>
//     );
//   }
// }

export default withRouter(CourseEdit)
// export default CourseEdit


// secure course key 1) from create page, 2) from the url match, 3)
// 1. fetch course meta info
// 2. check teacher id
// compare ids
// const teacherId = () => db.onceGetCourse(courseKey);
//
// const authCondition = (authUser) => !!authUser
//
// export default withTeacherAuthorization(authCondition)(CourseEdit);
