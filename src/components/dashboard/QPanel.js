import React, {Component} from 'react'

import { Segment, Container, Button, Header, Icon, Menu, Divider, Card, Image, Grid, Form, Item, Select, Checkbox, Label, Responsive, List, Input} from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import QuestionTable from '../questions/QuestionTable'
import * as style from '../../style/inline';
import QuestionPage from '../questionPage/QuestionPage'
// 1. teacher/questions/qid1, qid2, qid3, qid4, qid5
// 2. fetch no need to real time - fetch 20 or thirty at a time with query
// 3. question has a (read ?) property and alter it upon reading by teacher


class QPanel extends Component {
  //
  handleQuestionClick = (qid) => {
    this.props.queClick(qid)
  }

  render() {
    const {options, questions, didChooseCourse, selectedCourse, loading, selectedCourseTitle} = this.props
    console.log('selectedCourse', 'questions', selectedCourse, questions);
    let qList = questions
    ? questions.map(q => <List.Item as='a' key={q.qid} onClick={() => this.handleQuestionClick(q.qid)}>
        <Image avatar src={q.askedByUserPhoto} />
        <List.Content>
           <List.Header>{q.askedByUsername}</List.Header> {q.timeStamp}
          {q.title}
        </List.Content>
      </List.Item>)
    : null
      // let qList = questions ? <QuestionTable options={options} questions={questions} click={this.handleQuestionClick} />
      // : <p>No question yet</p>

    // let courseSelected = selectedCourseTitle ? selectedCourseTitle : "Select course"

    return (
    <Segment basic loading={loading} style={style.SEGMENT_LOADER}>

      <Responsive {...Responsive.onlyComputer}>
        <Grid stackable>
          <Grid.Row centered>

            <Grid.Column width={4}>
              <Container>
                <Input
                  type='text'
                  icon='search'
                  // icon={<Icon name='search' circular link />}
                  placeholder='not searchble yet...'
                  fluid
                />
              <Segment style={{maxHeight: '600px', overflowY: 'scroll'}}>
              <List animated divided relaxed verticalAlign='middle'>
                {qList}
               </List>
               </Segment>
               </Container>
            </Grid.Column>

            <Grid.Column width={8}>
              <QuestionPage />
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Responsive>

      <Responsive minWidth={320} maxWidth={991}>
          <Container>
            <Header as='h1' content='Recent questions' dividing/>
            {/* {qList} */}
          </Container>
      </Responsive>
    </Segment>
    );
  }

}

export default QPanel
