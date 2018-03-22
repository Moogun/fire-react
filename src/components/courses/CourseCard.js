import React from 'react';
import { Icon, Card, Image, Grid, Rating } from 'semantic-ui-react'
import helen from '../../assets/helen.png'
import {Link, Route} from 'react-router-dom'
import Teacher from '../teacher/Teacher'
import profile from '../../assets/profile-lg.png'

const CourseCard = ({course, click}) => {
    return (
      <Grid.Column>

        <Card fluid onClick={click} >
          <Card.Content>
            <Image floated='right' size='mini' src={profile} />
            <Card.Header>
              {course.metadata.title}
            </Card.Header>
             <Card.Meta>{course.metadata.title}</Card.Meta>
            <Card.Description>
              {course.metadata.date}
            </Card.Description>
            <Card.Description>
              {course.metadata.textbook}
            </Card.Description>
          </Card.Content>
           <Card.Content extra>
          {course.metadata.teacherName}
          <Rating icon='star' defaultRating={5} maxRating={5} size='mini'/>
             (230)
          </Card.Content>
        </Card>

        <Route path="/teacher" render={Teacher} />
      </Grid.Column>
    );
  }

export default CourseCard
