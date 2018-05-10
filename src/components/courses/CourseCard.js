import React from 'react';
import { Icon, Card, Image, Grid, Rating, Button } from 'semantic-ui-react'
import helen from '../../assets/helen.png'
import {Link, Route} from 'react-router-dom'
import Teacher from '../teacher/Teacher'
import profile from '../../assets/profile-lg.png'

const CourseCard = ({course, click}) => {

    let profileImg;
    if (course.tProfileImg) {
      profileImg = course.tProfileImg
    } else {
      profileImg = profile
    }
    return (
      <Card fluid onClick={click} style={{fontSize: '0.8rem'}}
        image={<Image src={profileImg} />}
        header={course.metadata.title}
        meta={<div>{course.metadata.tName}</div>}
        description='출제자가 노리는 함정을 정확히 짚어주는 강의'
        extra={<div style={{textAlign:'center'}} >
        <Icon name='user' />16
        <Icon name='comment' style={{marginLeft:'2rem'}}/>45
        <Icon name='star' style={{marginLeft:'2rem'}}/>4.8
      </div>} />
    );
  }

export default CourseCard
