import React from 'react';
import { Icon, Card, Image, Grid, Rating } from 'semantic-ui-react'
import helen from '../../assets/helen.png'
import {Link, Route} from 'react-router-dom'
import Teacher from '../teacher/Teacher'
import profile from '../../assets/profile-lg.png'

const CourseCard = ({course, click}) => {
    return (
      <Grid.Column>

        <Card fluid onClick={click} style={{borderRadius: '0rem'}} >

         <Card.Content>
            <Image floated='left' size='mini' src={profile} style={{marginBottom:'0rem'}}/>
             {course.metadata.teacherName}
                <br/>
            <Rating icon='star' defaultRating={5} maxRating={5} size='mini'/> (230)
         </Card.Content>

          <Card.Content>
            <Card.Header> {course.metadata.title} </Card.Header>
            <Card.Description> - {course.metadata.date} </Card.Description>
            <Card.Description> - {course.metadata.textbook} </Card.Description>
            <Card.Description> - {course.metadata.date} </Card.Description>
          </Card.Content>

        </Card>

        <Route path="/teacher" render={Teacher} />
      </Grid.Column>
    );
  }

export default CourseCard
