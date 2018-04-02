import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import CourseCards from '../courses/CourseCards'
import { Grid, Header, Menu, Visibility, Responsive, Card, Button } from 'semantic-ui-react'
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

          if (cAttending) {
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
          }
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

  handleQuestion = () => {
    const { history } = this.props
    console.log('my courses match', this.props);
    history.push({pathname: 'teacher/moo6/questions'})
  }

  render() {

    const {calculations, activeItem, attendingCourses} = this.state
    console.log('width', calculations.width, 'attendingCourses', attendingCourses);
    console.log('setting high min width removes the error', 'getBoundingClientRect');
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

              {/* <Responsive minWidth={320}>
                <Visibility onUpdate={this.handleUpdate}> */}
                  <Grid
                    style={dashboardHeader} 
                    centered>
                    <Grid.Row>
                      <Grid.Column width={12}>

                        <Header as='h1'
                          style={dashboardHeaderColor}>My Courses</Header>

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
                        {/* <CourseCards courses={attendingCourses}/> */}

                        <Card>
                            <Card.Content>
                             <a>
                             {/* <Image floated='left' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
                               <Button floated='right' color='red' onClick={this.handleQuestion}> Q</Button>
                              <Card.Header> Steve Sanders</Card.Header>
                              <Card.Meta> Friends of Elliot </Card.Meta>
                              </a>
                            </Card.Content>

                            <Card.Content extra>
                              <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                            </Card.Content>
                            <Card.Content extra>
                              <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                            </Card.Content>
                            <Card.Content extra>
                              <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                            </Card.Content>
                          </Card>

                          <Card>
                              <Card.Content>
                               <a>
                               {/* <Image floated='left' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
                                 <Button floated='right' color='red' onClick={this.handleQuestion}> Q</Button>
                                <Card.Header> Steve Sanders</Card.Header>
                                <Card.Meta> Friends of Elliot </Card.Meta>
                                </a>
                              </Card.Content>

                              <Card.Content extra>
                                <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                              </Card.Content>
                            </Card>

                            <Card>
                                <Card.Content>
                                 <a>
                                 {/* <Image floated='left' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
                                   <Button floated='right' color='red' onClick={this.handleQuestion}> Q</Button>
                                  <Card.Header> Steve Sanders</Card.Header>
                                  <Card.Meta> Friends of Elliot </Card.Meta>
                                  </a>
                                </Card.Content>

                                <Card.Content extra>
                                  <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                                </Card.Content>
                              </Card>

                              <Card>
                                  <Card.Content>
                                   <a>
                                   {/* <Image floated='left' size='mini' src='/assets/images/avatar/large/steve.jpg' /> */}
                                     <Button floated='right' color='red' onClick={this.handleQuestion}> Q</Button>
                                    <Card.Header> Steve Sanders</Card.Header>
                                    <Card.Meta> Friends of Elliot </Card.Meta>
                                    </a>
                                  </Card.Content>

                                  <Card.Content extra>
                                    <a> 그로스해킹과 구글 애널리틱스 실전 CAMP <br /> 18.04~18.05</a>
                                  </Card.Content>
                                </Card>

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
