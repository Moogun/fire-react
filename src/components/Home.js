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
    };
  }
  componentDidMount(){
    db.onceGetUsers().then(snapshot=>
      this.setState(() => ({users: snapshot.val() }))
    )
  }
  render() {

    const {users} = this.state;
    console.log(users);
    return (
      <Grid container>
        <Grid.Row>
          <Grid.Column>

            {/* <Header as='h5' style={{marginTop: '3em'}}>Header</Header>
            <CourseCards />

            <Header as='h5'>Header</Header> */}
            {/* <CourseCards /> */}

          </Grid.Column>
        </Grid.Row>
      </Grid>
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
