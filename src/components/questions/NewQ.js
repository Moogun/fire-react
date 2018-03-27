import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Label, Rating, TextArea, Input, Breadcrumb, Select } from 'semantic-ui-react'

// const INITIAL_STATE = {
//   text: '',
//   title:'',
//   cid: '',
//   error: null,
// }
//
// const byPropKey = (propertyName, value) => () => ({
//   [propertyName]: value
// })

class NewQ extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   INITIAL_STATE,
    // };
  }

  // onSubmit = (event) => {
  //   const { title, text, cid} = this.state;
  //   const { tid } = this.props
  //   console.log('on submit title, text', title, text, cid);
  //   event.preventDefault();
  // }
  //
  // handleChange = (e, { value }) => {
  //   this.setState({[e.target.name]: e.target.value})
  //   e.preventDefault()
  // }
  //
  // handleQidSelection = (e, {value}) => {
  //   this.setState({cid: value})
  //   e.preventDefault()
  // }

  render() {
    const { selectOption, submit, change, changeQid} = this.props
    let options = selectOption ? selectOption : [{}]

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
          <Form onSubmit={submit}>
            <Form.Field>
              <Select placeholder='Select a course' name="cid" search selection options={options} onChange={changeQid} />
            </Form.Field>
            <Form.Field>
              <Input placeholder='Enter title' name="title" onChange={change}/>
            </Form.Field>
            <Form.Field>
              <TextArea placeholder='Tell us more' name="text" onChange={change}/>
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
