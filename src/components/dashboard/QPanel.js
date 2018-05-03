import React, {Component} from 'react'
import {Link, Route, withRouter,} from 'react-router-dom'
import { Segment, Container,  Header, Image, Grid, Responsive, List, Input} from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'

import * as style from '../../style/inline';
import QuestionManage from '../dashboardQuestionManage/QuestionManage'
import Moment from 'react-moment';
// 1. teacher/questions/qid1, qid2, qid3, qid4, qid5
// 2. fetch no need to real time - fetch 20 or thirty at a time with query
// 3. question has a (read ?) property and alter it upon reading by teacher


class QPanel extends Component {

  handleQuestionClick = (qid) => {
    this.props.queClick(qid)
  }

  render() {
    const {questions, selectedQuestion, user, uid, loading, match, answerAdded} = this.props

    let qList = questions
    ? questions.map(q => <List.Item as='a' key={q.qid} onClick={() => this.handleQuestionClick(q.qid)}>
        <Image avatar src={q.askedByUserPhoto} />
        <List.Content>
           <List.Header>{q.askedByUsername}
          <Moment fromNow unix>{q.timeStamp / 1000}</Moment>
           </List.Header>
          {q.title}
        </List.Content>
      </List.Item>)
    : <p>No Question Yet</p>

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
                <QuestionManage
                  selectedQuestion={selectedQuestion}
                  user={user} uid={uid}
                  answerAdded={answerAdded} 
                />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Responsive>

        <Responsive minWidth={320} maxWidth={991}>
            <Container>
              <Header as='h1' content='Recent questions' dividing/>
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
        </Responsive>
      </Segment>
    );
  }

}

export default withRouter(QPanel)
