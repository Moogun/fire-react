import React, {Component} from 'react'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Select, Checkbox, Label, Responsive } from 'semantic-ui-react'

import QuestionTable from '../questions/QuestionTable'
import * as style from '../../style/inline';

class QPanel extends Component {

  handleQuestionClick = (qid) => {
    this.props.queClick(qid)
  }

  render() {
    const {options, questions, didChooseCourse, selectedCourse, loading, selectedCourseTitle} = this.props
    console.log('selectedCourse', 'questions', selectedCourse, questions);

    let qList = questions ? <QuestionTable options={options} questions={questions} click={this.handleQuestionClick} />
      : <p>No question yet</p>

    let courseSelected = selectedCourseTitle ? selectedCourseTitle : "Select course"

    return (
    <Segment basic loading={loading} style={style.SEGMENT_LOADER}>

      <Responsive {...Responsive.onlyComputer}>
        <Grid stackable>
          <Grid.Row centered>

            <Grid.Column width={3}>
              <Select placeholder='Select a course' name="cid" fluid search selection options={options} onChange={didChooseCourse}/>
              <Divider />
              <Menu vertical text fluid>
                <Menu.Item><Checkbox label='Unread' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='Not top answer' /> <Label content='10'/></Menu.Item>
                <Menu.Item><Checkbox label='No response' /> <Label content='10'/></Menu.Item>
              </Menu>
              <Divider />
            </Grid.Column>

            <Grid.Column width={9}>
              <Header as='h1' content={courseSelected} dividing/>
              {qList}
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Responsive>

      <Responsive minWidth={320} maxWidth={991}>
          <Container>
            <Header as='h1' content='Recent questions' dividing/>
            {qList}
          </Container>
      </Responsive>
    </Segment>
    );
  }

}

export default QPanel
