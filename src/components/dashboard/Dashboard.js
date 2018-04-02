import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive, Segment  } from 'semantic-ui-react'

const dashboardHeader = {marginTop: '0rem', paddingTop: '2rem', backgroundColor: '#2980b9'}
const dashboardHeaderColor = {color: '#fff'}
const dashboardHeaderMenuBorderColor = {borderColor: '#2980b9'}
const dashboardHeaderMenuItemBorder = {borderWidth: '5px', paddingLeft: '2px', paddingRight: '2px', marginRight: '20px'}
const dashboardBody = {marginTop: '0rem', backgroundColor: '#ecf0f1'}

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseTeaching: null,
      isLoading: false,
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
    console.log('value', value);
    this.setState({cid: value})
    e.preventDefault()
  }

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    console.log('teacher q click', qid);
    console.log('teacher q click',questions[qid]);
  //   this.props.history.push({
  //     pathname: `${this.props.match.url}/question/${qid}`,
  //     state:
  //       {
  //         q: questions[qid],
  //         qid: qid
  //       }
  //   })
  }

  componentDidMount() {
     //fetch teaching course with user id,
     //if no id was provided redirect to <signin></signin>
     const {isLoading } = this.state
     this.setState({isLoading: !isLoading})
     if (this.context.authUser ) {

       db.doFetchTeaching(this.context.authUser.uid)
        .then(snap => {
          let teaching = snap.val()
          let selectOption=[{key: 'default', text: 'All', value: 'default'}]
          let item;
          Object.keys(teaching).map(key => {
            item={key: key, text: teaching[key].metadata.title, value: key}
            selectOption.push(item)
          })
          this.setState( () => ({courseTeaching: teaching, 'selectOption': selectOption, isLoading: !isLoading}) )
        })
        .catch(error => {
          this.setState({[error]: error});
        });
       //
       //  db.doFetchRecentQuestions(this.context.authUser.uid)
       //    .then(qSnap => this.setState ({questions: qSnap.val() }))
       //      // console.log('q snap', qSnap.val()))
     }
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {authUser, match} = this.props
    const {activeItem, error, user, courseTeaching, selectOption, questions, cid} = this.state

    console.log('dashboard props', this.props);

    let qList;
    if (!!cid) {

    } else {
      qList = questions
    }

      return (

        <Grid >
          <Grid.Row>
            <Grid.Column>

              {/* <Responsive minWidth={320}>
                <Visibility onUpdate={this.handleUpdate}> */}
                  <Grid style={dashboardHeader} centered>
                      <Grid.Row>
                        <Grid.Column width={12}>

                            <Header as='h1' style={dashboardHeaderColor}>Dashboard</Header>

                            <Menu size='small' secondary pointing inverted
                              style={dashboardHeaderMenuBorderColor} >
                                <Menu.Item name='courses'
                                  active={activeItem === 'courses'}
                                  onClick={this.handleItemClick}
                                  as={Link} to={`${match.url}/courses`}
                                  style={dashboardHeaderMenuItemBorder}
                                />
                                <Menu.Item
                                  name='questions'
                                  active={activeItem === 'questions'}
                                  onClick={this.handleItemClick}
                                  as={Link} to={`${match.url}/questions`}
                                  style={dashboardHeaderMenuItemBorder}
                                />
                                <Menu.Item
                                  name='announcement'
                                  active={activeItem === 'announcement'}
                                  onClick={this.handleItemClick}
                                  style={dashboardHeaderMenuItemBorder}
                                />
                              </Menu>

                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid style={dashboardBody} centered>
                      <Grid.Row>
                        <Grid.Column width={12}>

                          <Switch>
                            <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                            <Route path={routes.DASHBOARD_COURSES} render = {(props) => <CourseTeaching {...props} courses={courseTeaching} click={this.handleCourseClick}/> } />
                            <Route path={routes.DASHBOARD_Q_PANEL} render = {() => <QPanel
                              options={selectOption}
                              questions={questions}
                              didChooseCourse={this.handleDidChooseCourse}
                              selectedCourse={cid}
                              queClick={this.handleQuestionClick}
                             />} />
                          </Switch>

                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                {/* </Visibility>
              </Responsive> */}

            </Grid.Column>
          </Grid.Row>
        </Grid>

      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(Dashboard)
