import React, {Component} from 'react'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Select, Checkbox, Label, Responsive } from 'semantic-ui-react'

import QuestionTable from '../questions/QuestionTable'


class QPanel extends Component {

  handleQuestionClick = (qid) => {
    this.props.queClick(qid)
  }

  render() {
    const {options, questions, didChooseCourse, selectedCourse} = this.props
    console.log('selectedCourse', 'questions', selectedCourse, questions);

    let qList = questions ? <QuestionTable options={options} questions={questions} click={this.handleQuestionClick} />
      : <p>No question yet</p>

    return (
    <div>

      <Responsive {...Responsive.onlyComputer}>
        <Grid stackable>
          <Grid.Row centered>

            <Grid.Column width={4}>
              <Select placeholder='Select a course' name="cid" fluid search selection options={options} onChange={didChooseCourse}/>
              <Divider />
              <Menu vertical text fluid>
                <Menu.Item><Checkbox label='Unread' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='Not top answer' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='No response' /> <Label content='10'/></Menu.Item>
              </Menu>
              <Divider />
            </Grid.Column>

            <Grid.Column width={12}>
              <Header as='h1' content='Course title' dividing/>
              {qList}
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Responsive>

      <Responsive {...Responsive.onlyMobile}>
        <Grid stackable>
          <Grid.Row centered>

            <Grid.Column>
              <Select placeholder='Select a course' name="cid" fluid search selection options={options} onChange={didChooseCourse}/>
              <Divider />
              <Menu vertical text fluid>
                <Menu.Item><Checkbox label='Unread' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='Not top answer' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='No response' /> <Label content='10'/></Menu.Item>
              </Menu>
              <Divider />
            </Grid.Column>

            <Grid.Column>
              <Header as='h1' content='Course title' dividing/>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut nostrum tempore sint, dolores, hic recusandae? Libero corrupti asperiores architecto iste animi quasi, ipsa totam, voluptate quaerat reiciendis perferendis eligendi, explicabo!
              {qList}
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Responsive>
    </div>
    );
  }

}

export default QPanel
//
// import { Select } from 'semantic-ui-react'
//
// import { countryOptions } from '../common'
// // [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]
//
// const SelectExample = () => (
//   <Select placeholder='Select your country' options={countryOptions} />
// )
