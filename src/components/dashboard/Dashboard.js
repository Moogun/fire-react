import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';
// import withAuthorization from '../../HOC/withAuthorization';
import withAuthorizationDashboard from '../../HOC/withAuthorizationDashboard';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import QuizPanel from './QuizPanel'
import Announcement from './Announcement'
import {db} from '../../firebase';
import {fb} from '../../firebase/firebase';
import { Grid, Header, Menu, Visibility, Responsive, Segment, Modal, Form, Input, Button, Icon} from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      courseTeaching: null,
      selectedQuestion: null,
      questions: [],
      answerText: '',
      isLoading: false,
      quizzes: null,
      createQuizModalOpen: false,
    };
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleCourseClick = (courseKey) => {
    const {history} = this.props;
    history.push({
      pathname: '/course_manage/' + courseKey + '/edit',
    })
  }


  //QUIZ

  handleCreateQuizModalOpen = () => {
    const { createQuizModalOpen} = this.state
    this.setState ({ createQuizModalOpen: !createQuizModalOpen})
  }

  handleQuizClick = (e, quizKey) => {
    console.log('quiz click', quizKey);
    e.preventDefault()
    const {history} = this.props;
    history.push({
      pathname: '/quiz_manage/' + quizKey + '/edit',
    })
  }

  handleQuizTitleChange = (e) => {
    e.preventDefault()
    this.setState ({ quizTitle: e.target.value})
    // console.log('handleCreateQuiz', e.target.value);
  }

  onNewQuizSubmit = () => {
    const {user, uid} = this.props
    const {quizTitle} = this.state
    console.log('handleCreateQuiz', quizTitle);
    const { match, history } = this.props
    console.log('match', match, history);

    let qid = db.newKey()

    db.doCreateQuiz(uid, qid, quizTitle, )
    .then(res => {
      // console.log('res', res.val())
      this.setState(() => ({ quizTitle: '', createQuizModalOpen: false, }));

      // let quizKey = res.path.pieces_[1]
      history.push({
        pathname: '/quiz_manage/' + qid + '/edit',
        state : {
          qid: qid,
          title: quizTitle,
        }
      })

    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  componentDidMount() {
    const {questions, isLoading} = this.state
    const {authUser} = this.context

    if (authUser) {
      fb.database().ref('questionsForT').child(authUser.uid).on('child_added', this.handleQuestionDataSave)

      db.doFetchAllQuizzes(authUser.uid)
      .then(res => {
        console.log('res', res.val());
        this.setState ({ quizzes: res.val() })
      })
      .catch(error => {
        this.setState({[error]: error});
      });
    }
  }

  //QUESTION
  handleQuestionClick = (qid) => {
    const { questions, selectedQuestion } = this.state
    const { user, uid} = this.props
    console.log('teacher q click', selectedQuestion, questions);
    //change selected's isExpanded
    // merge it to the questions
    // save it
    if (selectedQuestion) {
      selectedQuestion[0]['isExpanded'] = !selectedQuestion[0]['isExpanded']
      let index = questions.map(q => q['qid'] == selectedQuestion[0]['qid']).indexOf(true)
      console.log('index', index);
      //below cause an error thoat shows list 'invalid date'
      // questions.splice(index, 1, selectedQuestion)
    }

    let selected = questions.filter(q => q.qid == qid)
    let isExpanded = selected[0]['isExpanded']
    console.log('isExpanded', selected, isExpanded);
    selected[0]['isExpanded'] = !isExpanded
    this.setState ({ questions: questions, selectedQuestion: selected, user: user, uid: uid, answerText: '' })
  }

  handleQuestionDataSave = (data) => {
    const {questions} = this.state
    let q = {}
    q = data.val()
    q['qid'] = data.key
    q['isExpanded'] = false
    questions.splice(0,0,q)
    this.setState ({ questions})
  }

  // handleQuestionDataRemoved = (data) => {
  //   console.log('[nDataRemoved]', data);
    // const {questions} = this.state
    // let q = {}
    // q = data.val()
    // q['qid'] = data.key
    // questions.splice(0,0,q)
    // this.setState ({ questions})
  // }

  handleAnswerChange = (e, { value }) => {
    console.log('[answerChange]', value);
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  onAnswerSubmit = (e) => {
    const {selectedQuestion, answerText, user, uid} = this.state;
    let aid = db.newKey()

    console.log('[q page] why', selectedQuestion, answerText, aid, user, uid);
    let tid = selectedQuestion[0].tid
    let cid = selectedQuestion[0].cid
    let qid = selectedQuestion[0].qid
    let answeredById = uid
    let answeredByUsername = user.username
    let answeredByUserPhoto = user.photoUrl
    let text = answerText
    let timeStamp = fb.database.ServerValue.TIMESTAMP

    let img = 'img'
    db.doSaveAnswer(tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, timeStamp, img, aid)
      .then(res => {
        //CALL FUNC IN DASHBOARD AND ADD NEW ANSWER TO THE CURRENT QUESTION - ANSWERS NODE
        // console.log('[q page] here?');
        var d = new Date();
        var n = d.getTime();

        let answer = {tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, timeStamp: n, img}
        console.log('[q page], added answer', answer);
        this.handleAnswerAdded(qid, aid, answer)
        this.setState({answerText: '', error: null,})
      })
      .catch(error => {
        this.setState({['error']: error})
      })
    e.preventDefault()
  }

  handleAnswerAdded = (qid, aid, answer) => {
    console.log('[answer added]', answer);
    const { questions } = this.state
    let index = questions.map(q => q['qid'] == qid).indexOf(true)
    questions[index].answers[aid] = answer
    this.setState ({ questions })
  }

  handleDeleteAnswer = (e, aid, answer) => {
    console.log('d answer', answer, aid);
    const { questions } = this.state

    let tid = answer['tid']
    let qid = answer['qid']
    db.doDeleteAnswer(tid, qid, aid)
    .then(res => {
        let qIndex = questions.map(q => q['qid'] == qid).indexOf(true)
        console.log('qIndex', qIndex);
        let answerKeys = Object.keys(questions[qIndex].answers)
        let deletedKey = answerKeys.filter(a => a == aid)
        delete questions[qIndex].answers[deletedKey[0]]
        this.setState ({ questions })
    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  handleDeleteQuestion = (e, question) => {
    // is this needed ? may be not
    console.log('[d question]', question);
    const { questions } = this.state
    let index = questions.map(q => q['qid'] == question['qid']).indexOf(true)
    console.log('index', index);
    questions.splice(index, 1)
    this.setState ({ questions })
  }

  render() {
    const {courseTeaching, user, uid, match} = this.props
    const { activeItem, error, isLoading, questions, selectedQuestion, answerText,
      quizzes, createQuizModalOpen, title} = this.state
    console.log('[render] dashboard props', quizzes, isLoading);

      return (
        <React.Fragment>

                <SectionContainer>
                    <Header as='h1' style={style.DASHBOARD_HEADER}>Dashboard</Header>

                    <Menu size='small' secondary pointing inverted
                      style={style.DASHBOARD_MENU} >
                        <Menu.Item name='courses'
                          active={activeItem === 'courses'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/courses`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                        <Menu.Item
                          name='questions'
                          active={activeItem === 'questions'}
                          onClick={this.handleItemClick}
                          as={Link} to= {{
                            pathname: `${match.url}/questions`,
                            state: { q: 'null', uid: uid, }
                          }}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                        <Menu.Item
                          name='quiz'
                          active={activeItem === 'quiz'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/quiz`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                        <Menu.Item
                          name='announcement'
                          active={activeItem === 'announcement'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/announcement`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                      </Menu>
                  </SectionContainer>

                  <SectionContainer_M>
                      <Header as='h3'
                        style={style.DASHBOARD_HEADER_M}
                        >Dashboard</Header>

                      <Menu size='small' secondary pointing inverted
                        style={style.DASHBOARD_MENU_M}
                         >
                          <Menu.Item name='courses'
                            active={activeItem === 'courses'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/courses`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                          <Menu.Item
                            name='questions'
                            active={activeItem === 'questions'}
                            onClick={this.handleItemClick}
                            as={Link} to= {{
                              pathname: `${match.url}/questions`,
                              state: { q: 'null', uid: uid, }
                            }}

                            style={style.DASHBOARD_MENU_ITEM}
                          />
                          <Menu.Item
                            name='quiz'
                            active={activeItem === 'quiz'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/quiz`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                          <Menu.Item
                            name='announcement'
                            active={activeItem === 'announcement'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/announcement`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                        </Menu>
                    </SectionContainer_M>



                            <Switch>
                              <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                              <Route path={routes.DASHBOARD_COURSES} render = {(props) =>
                                <CourseTeaching {...props}
                                  courses={courseTeaching}
                                  click={this.handleCourseClick}
                                  loading={isLoading}
                                />
                                } />
                              <Route path={routes.DASHBOARD_Q_PANEL} render = {() => <QPanel
                                questions={questions}
                                selectedQuestion={selectedQuestion}
                                user={user}
                                uid={uid}
                                queClick={this.handleQuestionClick}
                                answerChange={this.handleAnswerChange}
                                onAnswerSubmit={this.onAnswerSubmit}
                                answerText={answerText}
                                onAnswerRemoved={this.handleAnswerRemoved}
                                loading={isLoading}
                                handleDeleteAnswer={this.handleDeleteAnswer}
                                handleDeleteQuestion={this.handleDeleteQuestion}
                               />} />
                               <Route path={routes.DASHBOARD_QUIZ_PANEL} render = {(props) =>
                                 <QuizPanel
                                   {...props}
                                   quizzes={quizzes}
                                   quizClick={this.handleQuizClick}
                                   loading={isLoading}
                                   quizTitleChange={this.handleQuizTitleChange}
                                   onNewQuizSubmit={this.onNewQuizSubmit}
                                   createQuizModalOpen={this.handleCreateQuizModalOpen}
                                 />
                                 } />
                               <Route path={routes.DASHBOARD_AN} render = {() => <Announcement
                                />} />
                            </Switch>
                  

                    {/* <Modal size='tiny' open={createQuizModalOpen}>
                        <Modal.Header>Quiz</Modal.Header>
                        <Modal.Content >

                          <Modal.Description>
                            <Header>Create Quiz</Header>
                            <Form onSubmit={this.onNewQuizSubmit}>
                              <Form.Field>
                                <Input
                                  icon='pencil'
                                  iconPosition='left'
                                  name='quizTitle'
                                  value={title}
                                  onChange={e => this.setState({[e.target.name]: e.target.value})}
                                  type="text"
                                  placeholder="Title"
                                />
                                </Form.Field>
                                <Button color='blue' fluid>
                                  <Icon name='checkmark' /> Save and Go
                                </Button>
                            </Form>

                          </Modal.Description>
                        </Modal.Content>
                      </Modal> */}

      </React.Fragment>
      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorizationDashboard(authCondition)(Dashboard);
