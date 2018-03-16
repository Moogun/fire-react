import React from 'react'
import { Segment, Table, Grid, Image, Button, Header, Container } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

const CourseMeta = ({mobile}) => {

  return (
    <Grid.Row style={{margin: '3em 0em'}}>
      <Container>
        <Grid.Column >

          <Segment basic >
            <Header as="h1" dividing>기본정보</Header>
            <Table definition attached>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>reset rating</Table.Cell>
                  <Table.Cell>None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>set rating</Table.Cell>
                  <Table.Cell>Sets the current star rating to specified value</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>set rating</Table.Cell>
                  <Table.Cell>Sets the current star rating to specified value</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>set rating</Table.Cell>
                  <Table.Cell>Sets the current star rating to specified value</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>set rating</Table.Cell>
                  <Table.Cell>Sets the current star rating to specified value</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            </Segment>

        </Grid.Column>
      </Container>
    </Grid.Row>
  )
}
export default CourseMeta;
