import React, {Component} from 'react';
import { Segment, Container, Grid, Header } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route, withRouter } from 'react-router-dom'

class CourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {id: '1', title: '토익 700 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '123', teacher: 'kim sam', rating: 5,  date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '2', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '456', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '3', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '456', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '4', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '456', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '5', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '456', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '6', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacherId: '456', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
      ]
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
    const {courses} = this.state
    return (

        <Grid stackable columns={4} style={{marginTop: '0em'}}>
            {courses.map(c => <CourseCard key={c.id} course={c} click={() => this.handleClick(c.id, c.teacherId, c.title,)} />)}
        </Grid>

      // </Segment>
    );
  }
}

export default withRouter(CourseCards)
