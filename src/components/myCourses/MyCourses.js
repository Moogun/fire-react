import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import CourseCards from '../courses/CourseCards'
import { Grid, Header, Menu, Visibility, Responsive } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

const dashboardHeader = {marginTop: '0rem', paddingTop: '2rem', backgroundColor: '#2980b9'}
const dashboardHeaderColor = {color: '#fff'}
const dashboardHeaderMenuBorderColor = {borderColor: '#2980b9'}
const dashboardBody = {marginTop: '0rem', backgroundColor: '#ecf0f1'}

class MyCourses extends Component {

    state = {
      activeItem : '',
      calculations: {
        width: 0,
        topPassed: false,
        bottomPassed: false,
        pixelsPassed: 0,
        percentagePassed: 0,
        topVisible: false,
        bottomVisible: false,
        fits: false,
        passing: false,
        onScreen: false,
        offScreen: false,
      },
  }

  handleUpdate = (e, { calculations }) => this.setState({ calculations })

  componentDidMount(){
    console.log('my courses did mount 1 ', )
    const {authUser} = this.context
    if (!!authUser) {

      let myCourses = []

      db.onceGetUser(authUser.uid)
        .then(userSnap => {
          console.log('user snap', userSnap.val())
          let cAttending = userSnap.val().courseAttending

          // this.handleFetchMyCourses(cAttending)
          Object.keys(cAttending).map(key => {
            db.onceGetCourse(key)
              .then(res => {
                console.log('get course', res.val());
                let course = res.val()
                let tid = res.val().metadata.teacherId
                // console.log('return', this.handleFetchTeacher(tid))
                db.onceGetUser(tid)
                  .then(res => {
                    console.log('res teacher', res.val())
                    let tName = res.val().username
                    course.metadata.username = tName
                    console.log('c meta username',course.metadata.username)
                    myCourses.push(course)
                    this.setState ({attendingCourses: myCourses})
                  })
              })
          })
        })
    }
  }

  handleFetchMyCourses(cAttending){
    console.log('course attending', cAttending);
    console.log('attending', Object.keys(cAttending));

    let myCourses = []

    // Object.keys(cAttending).map(key => {
    //   db.onceGetCourse(key)
    //     .then(res => {
    //       console.log('get course', res.val());
    //       let course = res.val()
    //       let tid = res.val().metadata.teacherId
    //       // console.log('return', this.handleFetchTeacher(tid))
    //       db.onceGetUser(tid)
    //         .then(res => {
    //           console.log('res teacher', res.val())
    //           let tName = res.val().username
    //           course.metadata.username = tName
    //           console.log('c meta username',course.metadata.username)
    //           myCourses.push(course)
    //         })
    //     })
    // })
  }

  render() {

    const {calculations, activeItem, attendingCourses} = this.state
    console.log('width', calculations.width, 'attendingCourses', attendingCourses);
    let margin;
    if (calculations.width > 1127 ) {
      margin = '3em'
    } else if (calculations.width > 933) {
      margin = '0em'
    }

      return (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              //setting high min width removes the error 'getBoundingClientRect'
              {/* <Responsive minWidth={320}>
                <Visibility onUpdate={this.handleUpdate}> */}
                  <Grid style={dashboardHeader} centered>
                    <Grid.Row>
                      <Grid.Column width={12}>

                        <Header as='h1' style={dashboardHeaderColor}x>My Courses</Header>

                          {/* <Menu size='small' secondary style={dashboardHeaderMenuBorderColor}>
                              <Menu.Item name='home'
                                active={activeItem === 'home'} onClick={this.handleItemClick}/>
                              <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                              <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                          </Menu> */}

                          <Menu size='small' secondary pointing inverted
                            style={dashboardHeaderMenuBorderColor} >
                              <Menu.Item name='courses'
                                active={activeItem === 'courses'}
                                onClick={this.handleItemClick}
                                // as={Link} to={`${match.url}/courses`}
                              />
                              <Menu.Item
                                name='questions'
                                active={activeItem === 'questions'}
                                onClick={this.handleItemClick}
                                // as={Link} to={`${match.url}/questions`}
                              />
                              <Menu.Item
                                name='announcement'
                                active={activeItem === 'announcement'}
                                onClick={this.handleItemClick} />
                            </Menu>


                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid style={dashboardBody} centered>
                    <Grid.Row>
                      <Grid.Column width={12}>

                        {/* <Switch>
                          <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                          <Route path={routes.DASHBOARD_COURSES} render = {(props) => <CourseTeaching {...props} courses={courseTeaching} click={this.handleCourseClick}/> } />
                          <Route path={routes.DASHBOARD_Q_PANEL} component = {QPanel} />
                        </Switch> */}
                        <CourseCards courses={attendingCourses}/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                {/* </Visibility>
              </Responsive> */}

            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
}

MyCourses.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(MyCourses)
