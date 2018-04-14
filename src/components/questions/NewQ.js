import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Label, Rating, TextArea, Input, Breadcrumb, Select } from 'semantic-ui-react'

class NewQ extends Component {
  constructor(props) {
    super(props);
    state: {}
  }

  render() {
    const { selectOption, submit, cancel, change, chooseCourse, qTitle, qText} = this.props
    let options = selectOption ? selectOption : [{}]

    const isInvalid =
          qTitle === '' ||
          qText === ''

    return (
      <Segment basic>
        <Container text>

          //my course page Breadcrumb is useless
          {/* <Breadcrumb>
            <Breadcrumb.Section>Teacher name</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
            <Breadcrumb.Section>Course name</Breadcrumb.Section>
            <Breadcrumb.Divider icon='right angle' />
          </Breadcrumb>
            <br/><br/> */}
          <Form onSubmit={submit}>
            //my course page select option is useless
            {/* <Form.Field>
              <Select placeholder='Select a course' name="cid" search selection options={options} onChange={chooseCourse} />
            </Form.Field> */}
            <Form.Field>
              <Input placeholder='Enter title' name="qTitle" onChange={change} value={qTitle}/>
            </Form.Field>
            <Form.Field>
              <TextArea placeholder='Tell us more' name="qText" onChange={change} value={qText}/>
            </Form.Field>
            <Button onClick={this.handleCancel} disabled={isInvalid}>Cancel</Button>
            <Button type='submit' disabled={isInvalid}>Submit</Button>
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
