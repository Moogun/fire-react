import React, {Component} from 'react'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Select, Checkbox, Label } from 'semantic-ui-react'

import QuestionTable from '../questions/QuestionTable'

class QPanel extends Component {
  state = {
    courses: [
      {key: 'all', title: 'all courses'},
      {key: 'c id', title: 'abc'},
      {key: 'c id 2', title: 'abc'},
      {key: 'c id 3', title: 'abc'},
    ],

    questions: [
        {id:1, title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, mollitia.', text: 'details', image: 'y', userAsking:'uid-1', answerCount:3,},
        {id:2, title:'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', text: 'details', image: 'x', userAsking:'uid-2', answerCount:0,},
      ],
  }

  render() {
    const {courses, questions} = this.state

    return (
      <Grid celled stackable>
        <Grid.Row centered>

          <Grid.Column width={4}>
            <Select placeholder='Select your course' options={courses} fluid />
            <Menu vertical fluid>
              <Menu.Item><Checkbox label='Unread' /> <Label content='10'/></Menu.Item>
              <Menu.Item><Checkbox label='Not top answer' /> <Label content='10'/></Menu.Item>
              <Menu.Item><Checkbox label='No response' /> <Label content='10'/></Menu.Item>
            </Menu>
          </Grid.Column>

          <Grid.Column width={12}>
            <Header as='h1' content='Course title' />
            <Divider />
            <QuestionTable questions={questions}/>

              {/* <Route path='/account/profile' render={(props) => <Profile {...props} authUser={authUser}/>} />
              <Route path='/account/photo' render={() => <Photo />} />
              <Route path='/account/passwordChange' render={ () => <PasswordChangeForm />} />
              <Route path='/account/passwordForget' render={ () => <PasswordForgetForm />} />
              <Route path='/account/danger' render={() => <Danger />} /> */}

          </Grid.Column>

        </Grid.Row>
      </Grid>
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
