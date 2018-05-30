import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Button, Visibility } from 'semantic-ui-react'
import withAuthorization from '../HOC/withAuthorization';
import {db} from '../firebase';

import CourseCards from './courses/CourseCards'

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: null,
      courses: null,
      isLoading: false,
      calculations: {
        width: null,
      },
    };
  }

  handleContextRef = contextRef => this.setState({ contextRef })
  handleUpdate = (e, { calculations }) => this.setState({ calculations })


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

    const {calculations} = this.state
    const { isMobile } = this.props
    console.log('isMobile', isMobile);
    calculations.width = isMobile ? 767 : 768
    this.setState ({calculations })
  }

  render() {

    const {users, courses, isLoading, calculations, contextRef } = this.state;
    let mobile = calculations.width < 768 ? true : false

    const { isMobile } = this.props
    console.log('isMobile' , isMobile);
    return (
      <div ref={this.handleContextRef}>
        <Visibility onUpdate={this.handleUpdate}>
          <CourseCards courses={courses} loading={isLoading} mobile={mobile}/>
         </Visibility>
      </div>
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

// const authCondition = (authUser) => !!authUser;

// export default withAuthorization(authCondition)(HomePage);
//May 16 this keeps loading
export default HomePage;
