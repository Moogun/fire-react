import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Button } from 'semantic-ui-react'
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
    // 1. get all users value under at a single node
    db.onceGetUsers().then(snapshot=>
      this.setState(() => ({users: snapshot.val() }))
    )

    //2. get all users and map with saved courses ,,
    //** caution: local looping is far faster than another db fetching
    // ex : below tid prints all tid, then db request get excuted

    db.onceGetPublishedCourses()
      .then(snap => {
        let courseSnap = snap.val()

        Object.keys(courseSnap).map(key => {
          // console.log('course key', key);
          // console.log('meta t id', courseSnap[key].metadata.teacherId);
          let tid = courseSnap[key].metadata.teacherId
          db.onceGetUser(tid)
            .then(userSnap => {
                // console.log('userSnap', userSnap.val())
                let tName = userSnap.val().username
                courseSnap[key].metadata.teacherName = tName
                this.setState({courses: courseSnap})
              })
        })
      })

    //3. get all keys of children
    // db.onceGetPublishedCourses()
    //   .then(res => {
    //     console.log('res', res.val())
    //     console.log('obj keys', Object.keys(res.val()))
    //   }).

    //3-1. get values of children and attach a data from other node
      // db.fetchingCoursesThenAttach()
      //   .then(res => {
      //     console.log('res', res)
      //   //   console.log('res', res.val())
      //   })
  }
  render() {

    const {users, courses, isLoading} = this.state;
    //console.log('render 1 ', courses)
    return (
      <Segment basic loading={isLoading} style={{backgroundColor: '#f2f2f2', margin: '0rem'}}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>

              <Header as='h5' style={{marginTop: '2rem'}}>Header</Header>
              <CourseCards courses={courses}/>
              <br/>
              <Button primary>Load more</Button>
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
