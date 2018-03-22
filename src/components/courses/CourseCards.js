import React, {Component} from 'react';
import { Segment, Container, Grid, Header } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route, withRouter } from 'react-router-dom'

class CourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
    };
  }

  handleClick = (courseId, teacherId, title) => {
    console.log('home c id', courseId);
    console.log('home c props', this.props);
    const { history, } = this.props;
    history.push({
      pathname: '/teacher/' + teacherId + '/course/' + courseId,
      search: '?query=title',
      state: {
        teacherId: teacherId,
      }
    })
    //event.preventDefault();
  }

  render() {
    // const {courses} = this.state
    const {courses} = this.props
    let courseList = courses ?
      <Grid stackable doubling columns={4} style={{marginTop: '0em'}}>{Object.keys(courses).map(key => <CourseCard key={key} course={courses[key]} click={() => this.handleClick(key, courses[key].metadata.teacherId, )} />)} </Grid>
      : <p> no course</p>

    return (

        // <Grid stackable doubling columns={4} style={{marginTop: '0em'}}>
        <Container>
            {courseList}
        </Container>
        // </Grid>

    );
  }
}

export default withRouter(CourseCards)
