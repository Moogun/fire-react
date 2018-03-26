import React, {Component} from 'react'
import { Segment,Container, Table, Header, Rating} from 'semantic-ui-react'
import CourseTable from '../courses/CourseTable'

class Courses extends Component {
  constructor(props) {
    super(props);
  }

  handleCourseClick = (id, tName, cTitle) => {
    // console.log('courses', id, tName);
    this.props.click(id, tName, cTitle)
  }

  render() {
    const {coursesTeaching, tName, } = this.props
    console.log('courses render 1 ', coursesTeaching)
    let courses = coursesTeaching
    ? <CourseTable coursesTeaching={coursesTeaching} tName={tName}
      click={this.handleCourseClick}
    />
    : <p>No courses yet</p>

    return (
        <Segment basic>
          {courses}
        </Segment>
    );
  }
}



export default Courses;
