import React from 'react';
import { Icon, Card, Image, Grid, Rating } from 'semantic-ui-react'
import helen from '../../assets/helen.png'
import {Link, Route} from 'react-router-dom'
import Teacher from '../teacher/Teacher'
import profile from '../../assets/profile-lg.png'

const CourseCard = ({course, click}) => {
    return (
      <Grid.Column>
        <Card onClick={click}>
          <Card.Content>
            <Image floated='right' size='mini' src={profile} />
            <Card.Header>
              모바일 앱 GUI 포트폴리오 디자인 LAB 5기
            </Card.Header>

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
        // <Grid.Column>
        //   <Card onClick={click}>
        //     <Card.Content>
        //       <Image floated='left' size='mini' src={helen} />
        //
        //         <Card.Header>
        //             {course.title}
        //         </Card.Header>
        //
        //         <Card.Meta>
        //           {course.teacher}
        //           <Rating icon='star' defaultRating={5} maxRating={3} />
        //         </Card.Meta>
        //
        //         <Card.Description>
        //           {course.subTitle}
        //         </Card.Description>
        //     </Card.Content>
        //
        //     <Card.Content extra>
        //       {/* <a> */}
        //         <Icon name='calendar' />
        //        {/* 18.03.01 ~ 18.03.30 */}
        //        {course.date}
        //       {/* </a> */}
        //     </Card.Content>
        //     <Card.Content extra>
        //       {/* <a> */}
        //         <Icon name='clock' />
        //        {/* 0900~1030 */}
        //        {course.time}
        //       {/* </a> */}
        //     </Card.Content>
        //
        //     <Card.Content extra>
        //       {/* <a> */}
        //         <Icon name='book' />
        //         {/* 해커스 노랭이 */}
        //         {course.textbook}
        //       {/* </a> */}
        //     </Card.Content>
        //     <Card.Content extra>
        //       {/* <a> */}
        //         <Icon name='building outline' />
        //         {/* 해커스 빌딩 2, 403호 */}
        //         {course.location}
        //       {/* </a> */}
        //     </Card.Content>
        //   </Card>
        //   <Route path="/teacher" render={Teacher} />
        // </Grid.Column>
    );
  }

export default CourseCard
