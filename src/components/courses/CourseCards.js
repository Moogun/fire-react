import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Responsive } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route, withRouter } from 'react-router-dom'
import * as style from '../../style/inline';

class CourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
    };
  }

  handleClick = (courseId, teacherId, title, tName) => {
    const { history, } = this.props;
    var titleDashed = title.replace(/\s+/g, '-')
    history.push({
      pathname: '/' + tName + '/' + titleDashed
    })
    //event.preventDefault();
  }

  render() {
    // const {courses} = this.state
    const { courses, loading} = this.props

    let courseList = courses ?
        <div>
          <Grid container columns={4} textAlign='left' stackable doubling >
            {Object.keys(courses).map(key =>
              <Grid.Column key={key} mobile={16} tablet={8} computer={4}>
                <CourseCard
                  key={key}
                  course={courses[key]} click={() => this.handleClick( key,
                  courses[key].metadata.tid,
                  courses[key].metadata.title,
                  courses[key].metadata.tName)} />
                  </Grid.Column>
                )}
            </Grid>
        </div>
      : <Grid centered>
          <Grid.Column width={12} textAlign='center'>
            <p> Loading</p>
          </Grid.Column>
        </Grid>

    return (
        <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
            {courseList}
        </Segment>
    );
  }
}

export default withRouter(CourseCards)
