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
import { Grid, Header, Menu, Visibility, Responsive, Segment,} from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      courseTeaching: null,
      'selectOption': [],
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

  handleDidChooseCourse = (e, {value}) => {
    const { courseTeaching } = this.props
    let selectedCourseTitle = courseTeaching[value].metadata.title
    this.setState({cid: value, selectedCourseTitle: selectedCourseTitle})
    e.preventDefault()
  }

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    console.log('teacher q click', qid);
    let selected = questions.filter(q => q.qid == qid)
    this.props.history.push({
      pathname: `${this.props.match.url}/questions`,
      state:
        {
          q: selected,
          qid: qid
        }
    })
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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  componentDidMount() {
    const {user, uid} = this.props
    console.log('uid', uid);
    const {questions} = this.state

    db.doFetchQuestionsForT('MxbMJw31WCUsU0v5GOWMTqwcApR2')
      .then(res => {
          // this.setState ({questions: res.val() })
          let qList = res.val()
          Object.keys(qList).map(qid => {
            console.log('qid', qid);
            let q = {}
            q = qList[qid]
            q['qid'] = qid
            questions.push(q)
            console.log('questions in dmt', questions);
          })
        })
      .catch(error => {
        this.setState({[error]: error});
      });

  }

  // handleQuestionDataSave = (data) => {
  //   const {questions} = this.state
  //   let q = {}
  //   q = data.val()
  //   console.log('q 10000', q);
  //   q['qid'] = data.key
  //   questions.splice(0,0,q)
  //   this.setState ({ questions})
  // }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {match} = this.props
    const {activeItem, error,
      // user, courseTeaching, selectOption,
      questions, cid, isLoading, selectedCourseTitle, quizzes} = this.state
    const {courseTeaching, selectOption, user, uid} = this.props
    // console.log('rdr dashboard props', user, uid, questions);
    console.log('rdr dashboard props',  questions);
    console.log('rdr dashboard props location',  this.props);
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
                            state: { q: 'null' }
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
                              state: { q: 'null' }
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
                                options={selectOption}
                                questions={questions}
                                didChooseCourse={this.handleDidChooseCourse}
                                selectedCourse={cid}
                                selectedCourseTitle={selectedCourseTitle}
                                queClick={this.handleQuestionClick}
                                loading={isLoading}
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
