import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import { Segment,Container, Table, Header, Grid, Image, Menu, Item, Button, Form, Icon, Input, Divider, Popup } from 'semantic-ui-react'

import CEditTitle from './CEditTitle'
import CEditMeta from './CEditMeta'
import CEditCurri from './CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import withAuthorization from '../../HOC/withAuthorization'

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
    };
  }

  componentDidMount() {
    console.log(1);

    const {isLoading } = this.state
    const {match} = this.props

    this.setState({isLoading: !isLoading})

    let courseId = match.params.id
    db.onceGetCourse(match.params.id)
      .then(snapshot => {
        // console.log('sna', snapshot.val());

        db.onceGetUser(snapshot.val().metadata.teacherId)
          .then(user => {
            // setStateError 
            let meta = user.val().courseTeaching[courseId].metadata

            this.setState ({
              courseId: courseId, title: snapshot.val().metadata.title,
              teacherId: snapshot.val().metadata.teacherId, teacherName: user.val().username,

              textbook: meta.textbook, date: meta.date, time: meta.time, location: meta.location,
              openCourse: meta.openCourse, password: meta.password,
              isPublished: meta.isPublished,

              curri: snapshot.val().curri,
              })

            const {isLoading } = this.state
            this.setState({isLoading: !isLoading})
            console.log(2);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  componentWillUnmount(){
    console.log(0);
  }

  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

  handleInputChange = (event) => {
    this.setState(byPropKey(event.target.name, event.target.value))
  }

  handleSettingsOpenOrClose = (btn) => {
    const { openCourse } = this.state
    if (btn === 1) {
      this.setState({openCourse: true})
    } else {
      this.setState({openCourse: false})
    }
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

  onSettingsSubmit = (event) => {
      const {courseId, teacherId, open, password } = this.state;
      console.log('on settings submit public', this.state.open );

      db.doUpdateCoursePrivacy(courseId, open, password, courseId )
        .then((res)=> {
          console.log(' doUpdateCoursePrivacy', res);
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
        event.preventDefault();
  }

  handlePublish = () => {

    const {courseId, teacherId, isPublished, isLoading, textbook} = this.state
      console.log('1 textbook', !!textbook);
      // if (!!textbook) {
      console.log('before 1',isLoading);

      this.setState({isLoading: !isLoading})
      console.log('handle publish', courseId, teacherId, isPublished);
      db.doPublishCourse(courseId, teacherId, isPublished)
        .then(response =>
          // console.log('succeed uploading')
          this.setState({isLoading: !isLoading})
        )
        .catch(error => {
            this.setState(byPropKey('error', error))
        })
  }


  render() {

    const {activeItem, isLoading,
      courseId, title, teacherName, teacherId,
      textbook, date, time, location,
      curri,
      openCourse, password,
    } = this.state
    const {match} = this.props

    console.log('openCourse', openCourse);

    return (
      <Segment basic loading={isLoading} ref="myRef">

        <Container>

            <CEditTitle title={title} teacherName={teacherName} teacherId={teacherId} />

            <Container>
              <Grid celled stackable>
                <Grid.Column width={3}>
                  <Menu vertical fluid secondary>
                    <Menu.Item name='info'
                       active={activeItem === 'info'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/info`}
                       >
                       Info <Icon name='list' />
                    </Menu.Item>
                    <Menu.Item name='curri'
                       active={activeItem === 'curri'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/curriculum`}
                       >
                       Curriculum  <Icon name='book' />
                    </Menu.Item>
                    <Menu.Item name='settings'
                       active={activeItem === 'settings'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/settings`}
                       >
                       <Icon name='setting' />Settings
                    </Menu.Item>

                    <Menu.Item name='assignment'
                      disabled
                       active={activeItem === 'assignment'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/assignment`}
                       >
                       Assignment (Coming soon)
                    </Menu.Item>
                    <Menu.Item>
                       <Popup
                          trigger={<Button primary fluid
                            // active={isPublished}
                            onClick={this.handlePublish}
                            >Publish</Button>}
                          content='Need to update info first before publishing'
                        />
                     </Menu.Item>
                   </Menu>

                </Grid.Column>

                <Grid.Column width={10}>
                    <Switch>
                      <Redirect exact from={match.url} to={`${match.url}/info`} />
                      <Route path={`${match.url}/info`} render={(props) => <CEditMeta
                        {...props}
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
                        curri={curri}
                      />} />
                      <Route path={`${match.url}/settings`} render={() => <CEditSettings
                        openCourse={openCourse}
                        password={password}
                        change={this.handleInputChange}
                        toggle={this.handleSettingsOpenOrClose}
                        submit={this.onSettingsSubmit}
                      />} />
                      <Route path={`${match.url}/assignment`} render={() => <CEditSettings />} />
                    </Switch>
                </Grid.Column>

                <Grid.Column width={3}>

                </Grid.Column>

              </Grid>
            </Container>
        </Container>

      </Segment>
    );
  }
}

export default withRouter(CourseEdit)


// secure course key 1) from create page, 2) from the url match, 3)
// 1. fetch course meta info
// 2. check teacher id
// compare ids
// const teacherId = () => db.onceGetCourse(courseKey);
//
// const authCondition = (authUser) => !!authUser
//
// export default withTeacherAuthorization(authCondition)(CourseEdit);
