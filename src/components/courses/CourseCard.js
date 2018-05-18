import React from 'react';
import { Icon, Card, Image, Grid, Rating, Button, Item, Label } from 'semantic-ui-react'
import helen from '../../assets/helen.png'
import {Link, Route} from 'react-router-dom'
import Teacher from '../teacher/Teacher'
import profile from '../../assets/profile-lg.png'

const CourseCard = ({course, click}) => {

    let profileImg;
    if (course.metadata.tProfileImg) {
      profileImg = course.metadata.tProfileImg
    } else {
      profileImg = profile
    }
    return (
      <Card fluid onClick={click} style={{fontSize: '0.8rem', border: '0', margin: '1.5rem'}}
        image={<Image fluid src={profileImg} />}
        header={course.metadata.title}
        description='출제자가 노리는 함정을 정확히 짚어주는 강의'
        meta={<div>{course.metadata.tName}</div>}
        extra={<div style={{textAlign:'center'}} >
        <Icon name='users' />{course.metadata.attendeeCount}
        <Icon name='comment' style={{marginLeft:'2rem'}}/>{course.metadata.questionCount}
        <Icon name='star' style={{marginLeft:'2rem'}}/>4.8
      </div>} />
    );
  }

export default CourseCard
