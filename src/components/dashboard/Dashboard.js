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
import { Grid, Header, Menu, Visibility, Responsive, Segment,} from 'semantic-ui-react'
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
      isLoading: false,
      quizzes: {
        1:{'title': 'abc', },
        2:{'title': 'bbc', },
        3:{'title': 'cbc', },
      }
    };
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleCourseClick = (courseKey) => {
    const {history} = this.props;
    history.push({
      pathname: '/course_manage/' + courseKey + '/edit',
    })
  }

  // handleDidChooseCourse = (e, {value}) => {
  //   const { courseTeaching } = this.props
  //   let selectedCourseTitle = courseTeaching[value].metadata.title
  //   this.setState({cid: value, selectedCourseTitle: selectedCourseTitle})
  //   e.preventDefault()
  // }

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    const { user, uid} = this.props
    console.log('teacher q click', qid, user, uid);

    let selected = questions.filter(q => q.qid == qid)
    this.setState ({ selectedQuestion: selected, user: user, uid: uid})
  }

  handleQuizClick = (quizKey) => {
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
    db.doCreateQuiz(quizTitle, uid)
    .then(res => console.log('res', res.val()))
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('nextProps', nextProps);
  // }
  //
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate: ", nextProps, nextState);
  //   return true;
  // }

  componentDidMount() {
    const {questions} = this.state
    const { authUser} = this.context

    if (authUser) {
      fb.database().ref('questionsForT').child(authUser.uid).on('child_added', this.handleQuestionDataSave)
    }
  }

  handleQuestionDataSave = (data) => {
    // console.log('hell ??');
    const {questions} = this.state
    let q = {}
    q = data.val()
    q['qid'] = data.key
    questions.splice(0,0,q)
    this.setState ({ questions})
  }

  answerAdded = (qid, aid, answer) => {
    // CAUTION
    // QUESTIon data retrieving methods of dashboard and my course page is totally different
    // my course page receives location state with question and other info then fetch answers in question page. The answers added from here will be retremoved  by child added method automatically, The answers deleted will be taken care of by local method // can i add child deleted method ? into this?
    // dashboard fetches question and answer data from questionForT node and then passes it to q panel, panel in turn passes it to question page, 

    const { questions } = this.state
    let index = questions.map(q => q['qid'] == qid).indexOf(true)
    questions[index].answers[aid] = answer
    this.setState ({ questions })
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {match} = this.props
    const { activeItem, error, isLoading,
      questions, selectedQuestion,
      quizzes} = this.state
    const {courseTeaching, user, uid} = this.props
    console.log('[render] dashboard props', user, uid, questions);


      return (

        <Grid>
            <Grid.Column
              // style={{minHeight: '87vh'}}
              >

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


                    <Grid style={style.DASHBOARD_BODY}>
                        <Grid.Column>
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
                                // didChooseCourse={this.handleDidChooseCourse}
                                queClick={this.handleQuestionClick}
                                loading={isLoading}
                                answerAdded = {this.answerAdded}
                               />} />
                               <Route path={routes.DASHBOARD_QUIZ_PANEL} render = {(props) =>
                                 <QuizPanel
                                   {...props}
                                   quizzes={quizzes}
                                   click={this.handleQuizClick}
                                   loading={isLoading}
                                   quizTitleChange={this.handleQuizTitleChange}
                                   onNewQuizSubmit={this.onNewQuizSubmit}
                                 />
                                 } />
                               <Route path={routes.DASHBOARD_AN} render = {() => <Announcement
                                />} />
                            </Switch>
                        </Grid.Column>
                    </Grid>

            </Grid.Column>
        </Grid>

      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorizationDashboard(authCondition)(Dashboard);
