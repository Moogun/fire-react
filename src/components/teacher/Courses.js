import React, {Component} from 'react'
import { Segment,Container, Table, Header, Rating} from 'semantic-ui-react'
import CourseTable from '../courses/CourseTable'
import {withRouter, } from 'react-router-dom'
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursesTeaching: [
        {id: '1', title: '토익 700 1달 완성 아무도 넘보지마 토익 700 1달 완성 아무도 넘보지마', subTitle: 'There is a no way to turn back', teacher: 'kim sam', teacherId: 1234, rating: 5,  date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '2', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacher: 'kim sam', date: '18년 1월 1일 ~ 18년  1월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '3', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacher: 'kim sam', teacherId: 1234, date: '17년 11월 1일 ~ 17년  12월 1일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
      ]
    };
  }
  handleClick = (id, tid) => {
    console.log(id);
    // this.props.history.push("/teacher/:teacherId/course/:courseId'")
    this.props.history.push({
      pathname: '/teacher/:' + tid + '/course/:' + id,
      search: '?query=title',
      state: {
        teacherId: tid,
      }
    })
  }

  render() {
    const {coursesTeaching} = this.state
    console.log('teacher courses props', this.props.match);
    return (
        <Segment basic>
          <CourseTable courses={coursesTeaching} click={this.handleClick}/>
        </Segment>
    );
  }
}



export default withRouter(Courses);
