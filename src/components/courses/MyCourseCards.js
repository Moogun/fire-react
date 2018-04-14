import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Responsive } from 'semantic-ui-react'
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
    const { courses, loading} = this.props

    let courseList = courses ?
        <div>
          <Responsive {...Responsive.onlyComputer}>
            <Grid centered>
              <Grid.Column width={12}>
                  <Grid stackable doubling columns={3} style={{marginTop: '0em'}}>
                    {Object.keys(courses).map(key =>
                      <Grid.Column key={key}>
                        <CourseCard
                          key={key}
                          course={courses[key]} click={() => this.handleClick( key,
                          courses[key].metadata.tid,
                          courses[key].metadata.title,
                          courses[key].metadata.tName)} />
                          </Grid.Column>
                        )}
                  </Grid>
              </Grid.Column>
            </Grid>
          </Responsive>
          <Responsive minWidth={320} maxWidth={992}>
            <Grid>
              <Grid.Column
                style={{marginLeft: '1rem', marginRight: '1rem', marginBottom: '1rem',}}
                // The column position is not the same with that of above, but I leave it there as it shows proper margin outside the card
                >
                  {Object.keys(courses).map(key =>
                    <CourseCard
                      key={key}
                      course={courses[key]} click={() => this.handleClick( key,
                      courses[key].metadata.tid,
                      courses[key].metadata.title,
                      courses[key].metadata.tName)} />)}
                </Grid.Column>
            </Grid>
          </Responsive>
        </div>
      : <Grid centered>
          <Grid.Column width={12}>
            <p> No course taking yet</p>
          </Grid.Column>
        </Grid>

    return (
      <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
        {courseList}
      </Segment>

    );
  }
}

export default withRouter(MyCourseCards)
