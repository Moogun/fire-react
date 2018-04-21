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
        console.log('courseSnap', courseSnap);
        if (courseSnap) {
          this.setState({courses: courseSnap})
        }
      })
  }

  render() {

    const {users, courses, isLoading} = this.state;
    let cList = courses ? <CourseCards courses={courses}/>
    : <Segment basic textAlign='center'>
      <p>No course yet</p>
    </Segment>
    return (
      // <Segment basic loading={isLoading} style={{backgroundColor: '#f2f2f2', margin: '0rem'}}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Segment inverted color='teal'>Enroll your course and help your students while promoting your course</Segment>
              <Grid container columns={3}>
                <Grid.Row>

                <Header as='h5' style={{marginTop: '2rem'}}>Header</Header>
                {cList}
                </Grid.Row>
              </Grid>


                <Segment basic textAlign='center'>
                  <Button primary>Load more</Button>
                </Segment>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      // </Segment>
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
