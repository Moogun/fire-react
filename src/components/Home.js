import React, {Component} from 'react';
import { Segment, Container, Grid, Header } from 'semantic-ui-react'
import withAuthorization from '../HOC/withAuthorization';
import {db} from '../firebase';

import CourseCards from './courses/CourseCards'

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      courses: null,
      isLoading: false
    };
  }
  componentDidMount(){
    const {isLoading } = this.state
    // console.log('home isLoading', isLoading);
    // this.setState ({isLoading: !isLoading })

    db.onceGetUsers().then(snapshot=>
      this.setState(() => ({users: snapshot.val() }))
    )

    db.onceGetCourses()
      .then(snap => {
        // this.setState ({courses: snap.val()})
        // console.log('courses', snap.val());
        let courses = snap.val()
        Object.keys(courses).map(key => {
          // console.log(courses[key].metadata.teacherId);
          let tid = courses[key].metadata.teacherId
          db.onceGetUser(tid)
            .then(userSnap => {
              // console.log('courses[key]', courses[key])
              courses[key].metadata.teacherName = userSnap.val().username
              const {isLoading } = this.state
              console.log('home isLoading', isLoading);
              // this.setState({courses: courses, isLoading: !isLoading})

            })
        })
      })

    // db.onceGetUserWithName()
    //   .then(res => console.log('res', res.val()))

  }
  render() {

    const {users, courses, isLoading} = this.state;
    // console.log('home', users);
    return (
      <Segment basic loading={isLoading}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>

              <Header as='h5' style={{marginTop: '3em'}}>Header</Header>
              <CourseCards courses={courses}/>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const UserList = ({users}) =>
<div>
  <h2>List of Usernames of Users </h2>
  <p>(Saved on Sign up in firebase db)</p>
  {Object.keys(users).map(key =>
    <div key={key}>{users[key].username}</div>
  )}
</div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
