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

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeItem: 'info',
      activePublish: true,
    };
  }

  componentDidMount() {

    const {isLoading } = this.state
    const {match} = this.props

    this.setState({isLoading: !isLoading})

    let courseId = match.params.id
    db.onceGetCourse(match.params.id)
      .then(snapshot => {
        console.log('sna', snapshot.val());

        db.onceGetUser(snapshot.val().metadata.teacherId)
          .then(user => {
            //console.log('user', user.val());

            let meta = user.val().courseTeaching[courseId].metadata

            this.setState ({
              courseId: courseId, title: snapshot.val().metadata.title,
              teacherId: snapshot.val().metadata.teacherId, teacherName: user.val().username,

              textbook: meta.textbook, date: meta.date, time: meta.time, location: meta.location,
              openCourse: meta.openCourse, password: meta.password,
              isPublished: meta.isPublished,

              curri: snapshot.val().curri,
              isLoading: !isLoading
              })
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

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

  handleInfoUpdate = () => {

  }

  handleSettingsUpdate = () => {

  }

  

  render() {

    const {activeItem, isLoading,
      courseId, title, teacherName, teacherId,
      textbook, date, time, location,
      curri,
      openCourse, password,
      activePublish
    } = this.state
    const {match} = this.props

    console.log(' textbook', textbook);

    return (
      <Segment basic loading={isLoading} >

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
                            active={activePublish}
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
                        courseId={courseId}
                        teacherId={teacherId}
                        textbook={textbook}
                        date={date}
                        time={time}
                        location={location}
                      /> }/>
                      <Route path={`${match.url}/curriculum`} render={(props) =><CEditCurri
                        {...props}
                        courseId={courseId}
                        teacherId={teacherId}
                        curri={curri}
                      />} />
                      <Route path={`${match.url}/settings`} render={() => <CEditSettings
                        courseId={courseId}
                        teacherId={teacherId}
                        openCourse={openCourse}
                        currentPassword={password}
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
