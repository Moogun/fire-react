import React from 'react'
import { Segment, Table, Grid, Image, Button, Header, Container } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import * as style from '../../style/inline'

const CourseMeta = ({meta}) => {
  console.log('course meta ', meta);
  let date = meta ? meta.date : ''
  let time = meta ? meta.time : ''
  let textbook = meta ? meta.textbook : ''
  let location = meta ? meta.location : ''
  return (

    <Grid.Row style={{margin: '3em 0em'}}>
        <Grid.Column >
          <Segment basic style={style.COURSE_PAGE_BODY_SECTION}>
            <Header as="h1" dividing>기본정보</Header>
            <Table definition attached>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>Date</Table.Cell>
                  <Table.Cell>{date}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Time</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Textbook</Table.Cell>
                  <Table.Cell>{textbook}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Location</Table.Cell>
                  <Table.Cell>{location}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Segment>

         </Grid.Column>
      </Grid.Row>
  )
}
export default CourseMeta;
