import React, {Component} from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route } from 'react-router-dom'


class CourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {id: '1', title: '토익 700 1달 완성', subTitle: 'There is a no way to turn back', teacher: 'kim sam', rating: 5,  date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
        {id: '2', title: '토익 800 1달 완성', subTitle: 'There is a no way to turn back', teacher: 'kim sam', date: '18년 3월 1일 ~ 18년  3월 29일', time: 'AM 09~ 11', textbook: '해커스 노랭이', location: '해커스 빌딩 2, 504호', },
      ]
    };
  }

  handleClick = (id) => {
    console.log(id);
  }

  render() {
    const {courses} = this.state
    return (
      <Segment basic>
        <Container>
            <Grid stackable columns={4}>
                {courses.map(c => <CourseCard key={c.id} course={c} click={() => this.handleClick(c.id)} />)}
            </Grid>

        </Container>
      </Segment>
    );
  }
}

export default CourseCards
