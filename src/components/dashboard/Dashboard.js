import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';
import withAuthorization from '../../HOC/withAuthorization';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import Announcement from './Announcement'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive, Segment } from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

let QUESTIONS =  {
      "-L8aaR70p5Bgq7VQMNrM" : {
        "answers" : {
          "-L8dxagSnECUBEd4JzIW" : {
            "answerText" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8dxeqnRdVvwiIJ0Os1" : {
            "answerText" : "speicfy your question",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8dxxUKHMcG6VLy45eo" : {
            "answerText" : "how much more I can do with it",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8dyBKSAgIqjvvWPVeG" : {
            "answerText" : "ooo",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8dyDwcnVR-ddNn6RZl" : {
            "answerText" : "answerText",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8dyR3OYLQqyq4WJciG" : {
            "answerText" : "answerText",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8eAMhtWD0ca-LHNRLo" : {
            "answerText" : "answerText",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8eAPHmdX3wszsxSjen" : {
            "answerText" : "answerText",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8eAir61Y-B9Apa6hBo" : {
            "answerText" : "come on 10 18",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          },
          "-L8eAsahRjGbGoxCnLFf" : {
            "answerText" : "you know ",
            "answeredBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
            "createdAt" : "2days ago",
            "img" : "img"
          }
        },
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "5 days ago",
        "text" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "마케팅 "
      },
      "-L8aaa9vhLSxJujhaSks" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "빨리 빨리 ",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "궁금궁금"
      },
      "-L8aacXheofG12rstxOK" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "속도 속도",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "왜이래"
      },
      "-L8aahDyHCDPUI8laJ3A" : {
        "answers" : {
          "-L8q3mBSDn--XTHmDvf7" : {
            "answeredBy" : "dgNwJUgPP7OjuMglkK7Uqcm1ha92",
            "createdAt" : "2days ago",
            "img" : "img",
            "text" : "글쎄 확실합니까?"
          }
        },
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "오타 맞죠?",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "책 47page  오타"
      },
      "-L8aajPpJnUyENhpsgG3" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "오타 맞죠?",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "책 47page  오타"
      },
      "-L8acbX0f2tZvP2HHdGJ" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hJU4ocZI02GZ6nAm8",
        "createdAt" : "createdAt",
        "text" : "어려워\n",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "그로스 해킹이 뭥미? "
      },
      "-L8acg-TkYSkmv1X3P0H" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hJU4ocZI02GZ6nAm8",
        "createdAt" : "createdAt",
        "text" : "어려워요",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "애널리틱스는 전문가만 하는거 아닌가요?"
      },
      "-L8ack1h1UUFWOjxeB8u" : {
        "askedBy" : "MxbMJw31WCUsU0v5GOWMTqwcApR2",
        "cid" : "-L7hJU4ocZI02GZ6nAm8",
        "createdAt" : "createdAt",
        "text" : "1박2일인가요?",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "캠프면 1박 2일 인가요"
      },
      "-L8plEUaWSPqNa4ue-je" : {
        "askedBy" : "dgNwJUgPP7OjuMglkK7Uqcm1ha92",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "마케팅이란 무엇인가?  알려주세요",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "마케팅이란 무엇인가? "
      },
      "-L8plMOn65W45JUY-6Yh" : {
        "askedBy" : "dgNwJUgPP7OjuMglkK7Uqcm1ha92",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "무엇을 했는지 알려주세요 ",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "어제 오늘ㅁ"
      },
      "-L8plQ3v9s2LgfCpfptw" : {
        "askedBy" : "dgNwJUgPP7OjuMglkK7Uqcm1ha92",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "1박2일 캠프인가?",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "캠프면"
      },
      "-L8plT6DxWbany2sEM3E" : {
        "askedBy" : "dgNwJUgPP7OjuMglkK7Uqcm1ha92",
        "cid" : "-L7hItXjIZxClZtpg9dQ",
        "createdAt" : "createdAt",
        "text" : "못참아요",
        "tid" : "RQg9vzBgQ0bej5MhICRNqSSrRdz1",
        "title" : "궁금한 것은 못참아"
      }
    }


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      courseTeaching: null,
      'selectOption': [],
      questions: QUESTIONS,
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
    // console.log('value', value);
    const { courseTeaching } = this.state
    let selectedCourseTitle = courseTeaching[value].metadata.title
    this.setState({cid: value, selectedCourseTitle: selectedCourseTitle})
    // console.log('selected course', selectedCourse);
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
     // fetch teaching course with user id,
     // if no id was provided redirect to <signin></signin>

     const {authUser} = this.context
     const {isLoading} = this.state
     // console.log('dmt isLoading 0', isLoading, !isLoading);

     // this.setState({isLoading: !isLoading})
      // console.log('dmt isLoading 1', isLoading);

     if (authUser) {
        // console.log('dmt isLoading 2', isLoading);

       db.doFetchTeaching(authUser.uid)
        .then(snap => {

          // console.log('dmt isLoading 3, undefined', isLoading);
          let teaching = snap.val()
          let selectOption=[{key: 'default', text: 'All', value: 'default'}]
          let item;
            // console.log('dashboard dmt', 3 );
            Object.keys(teaching).map(key => {
              item={key: key, text: teaching[key].metadata.title, value: key}
              selectOption.push(item)
            })
          // const {isLoading } = this.state
          // console.log('dmt isLoading 4 false', isLoading);

          this.setState( () => ({
            courseTeaching: teaching,
            'selectOption': selectOption,
            // isLoading: !isLoading
          }))
          // console.log('dashboard dmt 4', this.state.isLoading );
        })
        .catch(error => {
          this.setState({[error]: error});
        });
        console.log('dashboard dmt', 5 );
     }
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {match} = this.props
    const {activeItem, error, user, courseTeaching, selectOption, questions, cid, isLoading, selectedCourseTitle} = this.state

    console.log('rdr dashboard props', this.props);
    console.log('rdr dashboard courseTeaching', courseTeaching);
    const { } = this.props
      return (

        <Grid >
            <Grid.Column>

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
                          as={Link} to={`${match.url}/questions`}
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
                            as={Link} to={`${match.url}/questions`}
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

export default withAuthorization(authCondition)(Dashboard);
