import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseGallery from './CourseGallery'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'

import Questions from '../teacher/Questions'

import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button, Item, Modal, Form, Input, Icon, Responsive } from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'

import SectionContainer_M from '../navbar/SectionContainer_M'

import QuestionTable from '../questions/QuestionTable'

import profile from '../../assets/profile-lg.png'

import * as style from '../../style/inline';
import * as routes from '../../constants/routes';

import {Link, withRouter, Switch, Redirect, Route} from 'react-router-dom';
import {db} from '../../firebase';

import { createEditorState, Editor,} from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 1px rgba(0,0,0, 0.2)',
}

const textColor = {color: '#fff'}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

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

const COURSE_PAGE_HEADER = { backgroundColor: '#34495e', marginTop: '0rem'}

class MyCoursePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem: 'questions',
      subTitle: '',
      menuFixed: false,
      openCourse: false,
      modalOpen: false,
      registered: false,
      editorState: createEditorState(),
      questions: QUESTIONS,
    }
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  componentDidMount() {
    console.log('course page did mount', this.props.match.params);
    let cTitle = this.props.match.params.cTitle
    let title = cTitle.replace(/-/g, ' ');

    db.onceGetCourseWithTitle(title)
      .then(cSnap => {
        let c = cSnap.val()

        if (c) {
          let key = Object.keys(c)
          let course = c[key]
          console.log('course', course);

          this.setState ({
            tid: course.metadata.tid,
            subTitle: course.metadata.subTitle,
            tName: course.metadata.tName,
            tEmail: course.metadata.tEmail,
            tProfileImg: course.metadata.tProfileImg,
            cid: key[0],
            course: course,
            openCourse: course.metadata.openCourse,
            coursePass: course.metadata.password,
            attendee: course.attendee,
            features: course.features,
            images: course.images,
          })
          const {tid, cid} = this.state
          console.log('tid, cid', tid, cid);
          let curri = course.curri
          console.log('curri', curri);
          this.onChange(createEditorState(JSON.parse(curri)))
        } else {
          console.log('find a way to display course titles that have dash in it');
        }
      })

  }

  handleNavToTeacher = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  //navigation  courses, questions, new question

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    console.log('teacher q click', qid);
    console.log('teacher q click',questions[qid]);
    this.props.history.push({
      pathname: `${this.props.match.url}/question/${qid}`,
      state:
        {
          q: questions[qid],
          qid: qid
        }
    })
  }

  handleNewQ = () => {
    this.props.history.push(`${this.props.match.url}/new-question`)
  }

  // new question methods

  handleQuestionChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  handleQuestionSubmit = (event) => {

    const {teacherId, title, text, cid} = this.state;
    const {authUser} = this.context

    console.log(teacherId, 'on submit title, text', title, text, cid);

    db.doSaveNewQ(teacherId, cid, authUser.uid, title, text, "createdAt", 'img')
      .then(res => console.log('res', res))
      .catch(error => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault();
  }

  handleCourseSelect = (e, {value}) => {
    this.setState({cid: value})
    e.preventDefault()
  }

  handleSearchQueryChange =(value) => {

    this.setState({ isLoading: true, value })
    setTimeout( () => {
      const {teacherId} = this.state
      db.doSearchForQuestions(teacherId, value)
        .then(res => {
          let searchResult = res.val()
          if (searchResult){
            console.log('search result', 1);
            this.saveFechedQuestionsToState(searchResult)
          } else {
            console.log('search result', 2);
            this.setState({questions: null})
          }
          this.setState({ isLoading: false,  })
          // console.log('search', res.val())
        })
    }, 1000)
  }

  handleFetchQuestions = () => {
    const {teacherId} = this.state
    db.doFetchRecentQuestions(teacherId)
      .then(snap => {
        // this.setState({questions: res.val() })}
        let qList = snap.val()
        this.saveFechedQuestionsToState(qList)
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
  }

  saveFechedQuestionsToState = (qList) => {
    console.log('save fetched q to state qlist', qList);
    Object.keys(qList).map(key => {
      let askedBy = qList[key].askedBy
      db.onceGetUser(askedBy)
        .then(userSnap => {
          let username = userSnap.val().username
          qList[key].username = username
          // console.log('handle fetch questions, ', qList);
          this.setState({questions: qList})
        })

      if (qList[key].answers){
        // console.log('qList[key].answers', qList[key].answers);
        Object.keys(qList[key].answers).map(aid => {
          let answeredBy = qList[key].answers[aid].answeredBy
          // console.log('answeredBy', answeredBy);
          db.onceGetUser(answeredBy)
            .then(userSnap => {
              let username = userSnap.val().username
              qList[key].answers[aid].username = username
              this.setState({questions: qList })
            })
        })
      }
    })
  }


  render() {

    console.log('render');
    const {tName, cTitle,} = this.props.match.params
    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacherName = tName ? tName : 'Teacher'

    const { course, cid, subTitle, openCourse, coursePass, attendee, modalOpen, tProfileImg, editorState, features, images, activeItem, questions } = this.state

    let teacherProfile = tProfileImg ? tProfileImg : profile

    const renderedHtml = mediumDraftExporter(editorState.getCurrentContent())

    let meta = course ? course.metadata : null
    const {match} = this.props
    console.log('my course page');



    return (
      <Grid >
          <Grid.Column>
              <SectionContainer>

                <Header as='h1' inverted>
                   <Image circular src={profile}/>
                   <Header.Content>
                     {cTitle}
                     <Header.Subheader>
                       course sub title
                     </Header.Subheader>
                     <Header.Subheader onClick={this.handleNavToTeacher}>
                       {teacherName} <Rating icon='star' defaultRating={5} maxRating={5} disabled/>
                     </Header.Subheader>

                   </Header.Content>
                </Header>

                <Menu size='small' secondary pointing inverted
                  style={style.DASHBOARD_MENU_M}
                   >
                     <Menu.Item
                       name='questions'
                       active={activeItem === 'questions'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/questions`}
                       style={style.DASHBOARD_MENU_ITEM}
                     />
                     <Menu.Item
                       name='curriculum'
                       active={activeItem === 'curriculum'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/curri`}
                       style={style.DASHBOARD_MENU_ITEM}
                     />
                     <Menu.Item
                       name='announcement'
                       active={activeItem === 'announcement'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/announcement`}
                       style={style.DASHBOARD_MENU_ITEM}
                     />
                     <Menu.Item
                       name='info'
                       active={activeItem === 'info'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/info`}
                       style={style.DASHBOARD_MENU_ITEM}
                     />
                  </Menu>
              </SectionContainer>
              <SectionContainer_M>
                <Header as='h3'
                  style={style.DASHBOARD_HEADER_M}
                  >{cTitle} </Header>

                <Menu size='small' secondary pointing inverted
                  style={style.DASHBOARD_MENU_M}
                   >
                    <Menu.Item
                      name='questions'
                      active={activeItem === 'questions'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/questions`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='curriculum'
                      active={activeItem === 'curriculum'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/curri`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='announcement'
                      active={activeItem === 'announcement'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/announcement`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='info'
                      active={activeItem === 'info'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/info`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                  </Menu>
              </SectionContainer_M>

              <Grid style={style.DASHBOARD_BODY}>
                  <Grid.Column>

                  <Responsive {...Responsive.onlyComputer}>
                     <Container text>

                      <Switch>

                      <Redirect exact from={match.url} to={`${match.url}/questions`} />
                      <Route path={`${match.url}/questions`} render = {(props) =>
                        <Questions {...props}
                          questions={questions}
                          click={this.handleQuestionClick}
                          // tid={teacherId}
                          tid='111'
                          questions={questions}
                          click={this.handleNewQ} {...props}
                          queClick={this.handleQuestionClick}
                          searchQueryChange={this.handleSearchQueryChange}
                          isLoading={false}
                        />}

                         />} />
                      <Route path={`${match.url}/curri`} render = {() =>
                        <CourseCurri
                          curri={renderedHtml}
                         />} />
                       <Route path={`${match.url}/info`} render = {() =>
                         <CourseMeta
                           meta={meta}
                          />} />
                    </Switch>

                  </Container>
                </Responsive>

                <Responsive minWidth={320} maxWidth={991}>
                   <Container>

                    <Switch>

                    <Redirect exact from={match.url} to={`${match.url}/questions`} />
                    <Route path={`${match.url}/questions`} render = {(props) =>
                      <Questions {...props}
                        questions={questions}
                        click={this.handleQuestionClick}
                        // tid={teacherId}
                        tid='111'
                        questions={questions}
                        click={this.handleNewQ} {...props}
                        queClick={this.handleQuestionClick}
                        searchQueryChange={this.handleSearchQueryChange}
                        isLoading={false}
                      />}

                       />} />
                    <Route path={`${match.url}/curri`} render = {() =>
                      <CourseCurri
                        curri={renderedHtml}
                       />} />
                     <Route path={`${match.url}/info`} render = {() =>
                       <CourseMeta
                         meta={meta}
                        />} />
                  </Switch>

                </Container>
              </Responsive>


                  </Grid.Column>
              </Grid>

          </Grid.Column>
      </Grid>

    )
  }
}

MyCoursePage.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(MyCoursePage);
