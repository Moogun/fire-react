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
    const {questions, selectedQuestion, user, uid, loading, match, answerChange, answerText, onAnswerSubmit, handleDeleteQuestion, handleDeleteAnswer} = this.props

    let qList = <React.Fragment>
        <Responsive minWidth={768}>
          <Grid stackable celled>
            <Grid.Row centered>

              <Grid.Column mobile={16} tablet={8} computer={6}>
                <Container>
                  <Input
                    type='text'
                    icon='search'
                    // icon={<Icon name='search' circular link />}
                    placeholder='not searchble yet...'
                    fluid
                  />
                {/* <Segment style={{maxHeight: '600px', overflowY: 'scroll'}}>
                <List animated divided relaxed verticalAlign='middle'>
                  {questions
                  ? questions.map(q => <List.Item as='a' key={q.qid} onClick={() => this.handleQuestionClick(q.qid)}>
                       <Image avatar src={q.askedByUserPhoto} />
                       <List.Content>
                          <List.Header>{q.askedByUsername}
                         <Moment fromNow unix>{q.timeStamp / 1000}</Moment>
                        </List.Header>
                         {q.title}
                       </List.Content>
                     </List.Item>)
                   : <p>No Question Yet</p>}
                 </List> */}
                {questions
                  ? questions.map(q => <Segment vertical key={q.qid} onClick={() => this.handleQuestionClick(q.qid)}
                    style={{paddingLeft: '0.5rem', paddingRight: '0.5rem', }} >
                    <Header as='h5'>
                      <Image avatar src={profile }/>
                      {/* //q.askedByUserPhoto */}
                      <Header.Content>
                        <Header.Subheader>
                          {q.askedByUsername} <Moment fromNow unix>{q.timeStamp / 1000}</Moment>
                        </Header.Subheader>
                           {q.title}
                      </Header.Content>
                    </Header>
                  </Segment>)
                  : <Segment vertical> 질문이 아직 없습니다. </Segment>
                }

                 <Segment vertical style={{paddingLeft: '0.5rem', paddingRight: '0.5rem', }}>
                   <Header as='h5'>
                     <Image avatar src={profile}/>
                     <Header.Content>
                       Account Settings
                       <Header.Subheader>
                         Manage your preferences
                       </Header.Subheader>
                     </Header.Content>
                   </Header>
                 </Segment>


                 {/* </Segment> */}
                 </Container>
              </Grid.Column>

              <Grid.Column mobile={0} tablet={8} computer={10}>
                <QuestionManage
                  selectedQuestion={selectedQuestion}
                  user={user} uid={uid}
                  onAnswerSubmit={onAnswerSubmit}
                  answerChange={answerChange}
                  answerText={answerText}
                  handleDeleteQuestion={handleDeleteQuestion}
                  handleDeleteAnswer={handleDeleteAnswer}
                />
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </Responsive>

        <Responsive minWidth={320} maxWidth={767}>
              <Header as='h1' content='Recent questions' dividing/>
              <Input
                type='text'
                icon='search'
                // icon={<Icon name='search' circular link />}
                placeholder='not searchble yet...'
                fluid
              />
              <Segment>
                <List animated divided relaxed verticalAlign='middle'>
                  {questions
                  ? questions.map(q =>
                    <React.Fragment key={q.qid}>
                      <List.Item as='a' onClick={() => this.handleQuestionClick(q.qid)}>
                         <Image avatar src={q.askedByUserPhoto} />
                         <List.Content>
                            <List.Header>{q.askedByUsername}
                           <Moment fromNow unix>{q.timeStamp / 1000}</Moment>
                          </List.Header>
                           {q.title}
                         </List.Content>
                       </List.Item>
                       {q.isExpanded ?
                         <QuestionManage
                           selectedQuestion={selectedQuestion}
                           user={user} uid={uid}
                           onAnswerSubmit={onAnswerSubmit}
                           answerChange={answerChange}
                           answerText={answerText}
                           handleDeleteQuestion={handleDeleteQuestion}
                           handleDeleteAnswer={handleDeleteAnswer}
                         /> : null}
                     </React.Fragment>)
                  : <p>No Question Yet</p>
                }

                </List>
              </Segment>
        </Responsive>
    </React.Fragment>

    return (
      <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
        {qList}
      </Segment>
    );
  }

}

export default withRouter(QPanel)
