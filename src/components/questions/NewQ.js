import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Label, Rating, TextArea, Input, Breadcrumb } from 'semantic-ui-react'
// import ImageUpload from './ImageUpload'

class NewQ extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Segment basic>
        <Container text>
          <Breadcrumb>
            <Breadcrumb.Section>Teacher name</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section>Course name</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
          </Breadcrumb>
            <br/><br/>
          <Form>
            <Form.Field>
              <input placeholder='Enter title' />
            </Form.Field>
            <Form.Field>
              {/* <ImageUpload /> */}
            </Form.Field>
            <Form.Field>
              <TextArea placeholder='Tell us more' />
            </Form.Field>
            <Button>Cancel</Button>
            <Button type='submit'>Submit</Button>
            </Form>

        </Container>
      </Segment>
    );
  }
}

NewQ.propTypes = {
  mobile: PropTypes.bool,
}

export default NewQ
