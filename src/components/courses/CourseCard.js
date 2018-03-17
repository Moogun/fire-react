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
              모바일 앱 GUI 포트폴리오 디자인 LAB 5기
            </Card.Header>
             <Card.Meta>Get your shits done</Card.Meta>
            <Card.Description>
              18년 3월1일 ~ 4월 1일
            </Card.Description>
            <Card.Description>
              끝내줄거야
            </Card.Description>
          </Card.Content>
           <Card.Content extra>
          김봉두
          <Rating icon='star' defaultRating={5} maxRating={5} size='mini'/>
             (230)
          </Card.Content>
        </Card>

        <Route path="/teacher" render={Teacher} />
      </Grid.Column>
    );
  }

export default CourseCard
