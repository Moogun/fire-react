import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Label, Rating, TextArea, Input, Breadcrumb } from 'semantic-ui-react'

const INITIAL_STATE = {
  text: '',
  title:'',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class NewQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      INITIAL_STATE,
    };
  }

  onSubmit = (event) => {
    const { title,text,} = this.state;
    console.log('on submit title, text', title, text);
    event.preventDefault();
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  render() {
    const {title, text} = this.state
    console.log('title', this.state.title);
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
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <Input placeholder='Enter title' name="title" onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <TextArea placeholder='Tell us more' name="text" onChange={this.handleChange}/>
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
