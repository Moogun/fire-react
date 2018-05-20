import React from 'react'
import { Segment, Table, Grid, Image, Button, Header, Container } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import * as style from '../../style/inline'

const CourseMeta = ({meta, mobile}) => {
  console.log('course meta ', meta);
  let date = meta ? meta.date : ''
  let time = meta ? meta.time : ''
  let textbook = meta ? meta.textbook : ''
  let location = meta ? meta.location : ''
  return (

    <Grid style={{ paddingTop: '5rem', backgroundColor: '#fafafa'}} stackable centered>
        <Grid.Column >
          <Container text>

          {/* <Segment basic style={style.COURSE_PAGE_BODY_SECTION}> */}
            <Header as="h3" dividing color='teal'>기본정보</Header>
            <Table basic='very'>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>일정</Table.Cell>
                  <Table.Cell>{date}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>시간</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>교재</Table.Cell>
                  <Table.Cell>{textbook}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>장소</Table.Cell>
                  <Table.Cell>{location}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Container>

         </Grid.Column>
      </Grid>
  )
}
export default CourseMeta;
