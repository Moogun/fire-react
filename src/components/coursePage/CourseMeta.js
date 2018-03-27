import React from 'react'
import { Segment, Table, Grid, Image, Button, Header, Container } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const CourseMeta = ({meta}) => {
  console.log('course meta ', meta);
  let date = meta ? meta.date : ''
  let time = meta ? meta.time : ''
  let textbook = meta ? meta.textbook : ''
  let location = meta ? meta.location : ''
  return (
    <Grid.Row style={{margin: '3em 0em'}}>
        <Grid.Column >

          <Segment basic >
            <Header as="h1" dividing>기본정보</Header>
            <Table definition attached>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Date</Table.Cell>
                  <Table.Cell>{date}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Time</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Textbook</Table.Cell>
                  <Table.Cell>{textbook}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Location</Table.Cell>
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
