import React from 'react'
import { Segment,Container, Button, Grid, Input, Form, Responsive } from 'semantic-ui-react'
const newQButton = {paddingLeft: '0.5rem'}

const QSearch = (props) =>
<div>
    <Responsive {...Responsive.onlyComputer}>
      <Container text>
        <Form>
          <Form.Group>
            <Form.Input  type="text" icon="search" placeholder='Search' width={12} onChange={props.change} />
            <Form.Button fluid width={4} onClick={props.click} color='red'> New question </Form.Button>
          </Form.Group>
        </Form>
      </Container>
    </Responsive>

    <Responsive minWidth={320} maxWidth={991}>
      <Form>
          <Form.Input  type="text" icon="search" placeholder='Search' onChange={props.change} />
          <Form.Button fluid onClick={props.click} color='red'> New question </Form.Button>
      </Form>
    </Responsive>
 </div>
export default QSearch
