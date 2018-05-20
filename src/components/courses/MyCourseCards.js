import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Responsive, Loader } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route, withRouter } from 'react-router-dom'
import * as style from '../../style/inline';

class MyCourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
    };
  }

  handleClick = (courseId, teacherId, title, tName) => {
    console.log('my course cards handle click');
    const { history, } = this.props;
    var titleDashed = title.replace(/\s+/g, '-')
    history.push({
      pathname: '/my' + '/' + tName + '/' + titleDashed
    })
    //event.preventDefault();
  }

  render() {
    // const {courses} = this.state
    const { courses, loading, mobile} = this.props

    let courseList = courses ?
    <div>
        <Grid container columns={4} textAlign='left' stackable doubling>
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
      : <Loader active inline='centered' />

    return (
      <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
        {courseList}
      </Segment>

    );
  }
}

export default withRouter(MyCourseCards)
