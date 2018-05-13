import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {Link, withRouter, Switch, Redirect, Route} from 'react-router-dom';
import {db} from '../../firebase';
import {fb} from '../../firebase/firebase';
import withAuthorizationMyCoursePage from '../../HOC/withAuthorizationMyCoursePage';
// import withAuthorization from '../../HOC/withAuthorization';

import InfoBundle from './InfoBundle'
import CourseCurri from '../coursePage/CourseCurri'
import CourseAboutTeacher from '../coursePage/CourseAboutTeacher'

//BORROWED from TEACHER
import TeacherQuestions from '../teacher/Questions'

//BORROWED from QUE
import QuestionPage from '../questionPage/QuestionPage';
import QuestionTable from '../questions/QuestionTable'
import NewQ from '../questions/NewQ' 

import { Grid, Segment, Header, Menu, Container, Visibility, Image, Rating, Button, Item, Icon, Responsive, Modal, Form } from 'semantic-ui-react'

import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

import profile from '../../assets/profile-lg.png'

import * as style from '../../constants/styles';
import * as routes from '../../constants/routes';

import {QuestionType} from '../quiz/QuizEditTop'

class MyCoursePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeItem: 'questions',
      subTitle: '',
      menuFixed: false,
      openCourse: false,
      // modalOpen: false,
      registered: false,

      qTitle: '',
      qText: '',
      questions: [],
      isLoading: false,
      lastPage: false,
      attending: true,

      QuizStatus: 'quizNotTakenBeforeQuestion',

      quizModalOpen: false,
      userEntryExist: false,
      startTest: true,
      quizEntryResult: false,

// modalStatus 1. readyToQuiz, 2.readyToSubmit, readyToReview, readyToclose
    }
  }

  componentDidMount() {

    const { cid, course, uid, user } = this.props
    let tid = course[cid].metadata.tid
    // console.log('tid,', tid, 'cid', cid[0]);
    // let qList = []
    if (tid && cid ) {
      fb.database().ref('questions').child(tid).child(cid[0]).on('child_added', this.handleQuestionDataSave)
    }
  }

  handleQuestionDataSave = (data) => {
    const {questions} = this.state
    let q = {}
    q = data.val()
    // console.log('q 10000', q);
    q['qid'] = data.key
    questions.splice(0,0,q)
    this.setState ({ questions})
  }

  handleDeleteQuestion = (question) => {

    const {questions} = this.state

    let tid = question['tid']
    let cid = question['cid']
    let qid = question['qid']

    const { match } = this.props
    console.log('delete tid, cid',  qid);
    db.doDeleteQuestion(tid, cid, qid)
    .then(res => {
      let index = questions.map(q => q['qid'] == qid).indexOf(true)
      questions.splice(index, 1)
      this.setState ({questions})
      this.props.history.replace(`${match.url}`)
    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  handleFollowQuestion = (qid) => {
    // let question = this.props.location.state.q
    // let tid = question[0]['tid']
    // let cid = question[0]['cid']
    // let qid = question[0]['qid']
    console.log('follow tid, cid',  qid);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNavToTeacher = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName })
  }

  handleQuestionClick = (qid) => {
    const {user, uid} = this.props
    const { questions } = this.state

    let selected = questions.filter(q => q.qid == qid)
    // console.log('selected', selected, qid);
    this.props.history.push({
      pathname: `${this.props.match.url}/question/${qid}`,
      state:
        {
          q: selected,
          qid: qid,
          username: user.username,
          photoUrl: user.photoUrl,
          uid: uid,
        }
    })
  }


  handleNewQ = () => {
    this.props.history.push(`${this.props.match.url}/new-question`)
  }

  // new question methods
  handleQuestionInputChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  onQuestionSubmit = (event) => {
    event.preventDefault();
    const { qTitle, qText} = this.state;
    const { cid, course, uid, user } = this.props
    let tid = course[cid].metadata.tid
    let courseTitle = course[cid].metadata.title
    let date = new Date();
    let createdAt = Number(date)
    console.log('tid', tid, cid[0]);

    db.doSaveNewQ(tid, cid[0], courseTitle, uid, user.username, user.photoUrl, qTitle, qText, createdAt, 'img')
      .then(res => {
        this.setState ({ qTitle: '', qText: ''})
        this.props.history.replace(`${this.props.match.url}/questions`)
        })
      .catch(error => {
        this.setState({[error]: error});
      });

  }

  handleNewQCancel = (e) => {
    e.preventDefault()
    console.log('handle cancel confirm');
    this.props.history.goBack()
  }

  handleCourseSelect = (e, {value}) => {
    this.setState({cid: value})
    e.preventDefault()
  }

  // April 25, b
  // 1. at questions, fetch from first to last -- good
  // 2. search for a specific subject then load more --
  //   need to distingushi normal load more and search load more
  //
  // 3. ask a new question and combback to questions -- don't know the last item, set loadmore to true
  //
  // 1. add a question count
  // 2. to increase, fetch the last question with child added
  //
  // 3. add initial question that has a count


  handleSearchQueryChange =(value) => {

    this.setState({ isLoading: true, value })
    setTimeout( () => {
      const {tid, cid} = this.state
      db.doSearchForQuestions(tid, cid, value)
        .then(res => {
          let searchResult = res.val()
          if (searchResult){
            // console.log('search result', 1);
            this.saveFechedQuestionsToState(searchResult)
          } else {
            // console.log('search result', 2);
            this.setState({questions: null})
          }
          this.setState({ isLoading: false,  })
          // console.log('search', res.val())
        })
    }, 1000)
  }

  saveFechedQuestionsToState = (qList) => {
    // console.log('save fetched q to state qlist', qList);
    let questions = []
    Object.keys(qList).map(key => {
      let askedBy = qList[key].askedById
      db.onceGetUser(askedBy)
        .then(userSnap => {
          let username = userSnap.val().username
          qList[key].username = username
          qList[key]['qid'] = key
          console.log('handle searched questions, ', qList);
          //18, April 16, this returns {qid: {title: '', text: ''} but this is difficult to sort questions
          let qConverted = Object.assign(qList[key])
          console.log('handle searched questions converted, ', qConverted);
          questions.push(qConverted)
          this.setState({questions: questions})
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

  handleFetchQuestionsMore = (e) => {
    e.preventDefault()
    this.setState ({isLoading: true })
    // console.log('isloading 1 handle more ', this.state.isLoading);
    const {tid, cid, questions } = this.state

    let leng = questions.length
    let lastElmQid = questions[leng -1].qid // 1. check the last q id of previous set
    let fetchedItem = 1
    console.log('load more lastElmQid', lastElmQid);
    // 2. fetch another 5 <includi></includi>ng the last qid
    let paginated = db.doFetchNextQuestions(tid, cid, lastElmQid, 5)
    paginated.on('child_added', (data) => {
      let q = data.val()
        fetchedItem += 1 // 3. increase this num to see if 5 items get fetched or fetched
        console.log('load more fetchedItem', fetchedItem);

        if (fetchedItem >= 6 ) {
          this.setState ({ questions: questions, isLoading: false, lastPage: false })
        } else {
          this.setState ({ questions: questions, isLoading: false, lastPage: true })
        }

        // if(lastElmQid === data.key) {
        //   //4. if last item was the last of the questions list, then returns
        //   return
        // }

        db.onceGetUser(q.askedById)
        .then(res => {
          // console.log('res', res)
          let user = res.val()

          q['photoUrl'] = user.photoUrl
          q['qid'] = data.key
          // qList.unshift(q)
          // questions.splice(leng, 0, q) // insert the question at the end of the previous data set
          questions.push(q)

        })
        .catch(error => {
          this.setState({[error]: error});
        });

        // q['qid'] = data.key
        // console.log('p', data.val());

        // questions.splice(leng, 0, q) // insert the question at the end of the previous data set

    })
  }

  handleSecToggle = (e, secIndex) => {
    const {cid, course} = this.props
    let curri = course[cid].curri
    console.log('sections' ,curri, 'secIndex', curri);
    curri[secIndex].expanded = !curri[secIndex].expanded
    this.setState ({curri})
  }

  handleTakeQuiz = (e, section, secIndex, lecture, lecIndex) => {
    e.preventDefault()
    const { history, match, course } = this.props
    console.log('history', history, section, lecture);
    // curri[secIndex]
    // let title = lecture.quiz.metadata.title.replace(/\s+/g, '-').toLowerCase()
    // history.push({
    //   pathname: `${match.url}/curri/${lecture.quiz.metadata.title}`,
    //   state:
    //     {
    //       qid: lecture['qid'],
    //     }
    // })

    // let uid = 'user1'
    const {uid } = this.props

    let userEntry = !!Object.keys(lecture.quiz.questions[0].entry).filter(id => id === uid)[0] ? true : false

   console.log('[take quiz entry check]', !!Object.keys(lecture.quiz.questions[0].entry).filter(id => id === uid)[0] )

   if (userEntry) {
      console.log('userEntry', 1);
      this.setState ({
        quizModalOpen: true,
        quizSelectedQid: lecture.qid, quizSelected: lecture.quiz,
        userEntryExist: userEntry,
        QuizStatus: 'quizTakenBeforeResult',
        quizSelectedIndex: [secIndex, lecIndex],
      })

    } else {
      console.log('userEntry', 2);
      this.setState ({ quizModalOpen: true,
        quizSelectedQid: lecture.qid,
        quizSelected: lecture.quiz,
        userEntryExist: false,
        QuizStatus: 'quizNotTakenBeforeQuestion',
        quizSelectedIndex: [secIndex, lecIndex],
      })
    }

  }

  handleQuizModalClose = () => {
    console.log('close');
    this.setState ({quizModalOpen: false, startTest: false , QuizStatus: 'quizNotTakenBeforeQuestion'})
  }
  handleStartTest = () => {
    console.log('med test')
    this.setState ({ QuizStatus: 'quizNotTakenQuestion', startTest: true})
  }

  handleChange=(e, index, q )=>{

    console.log('[q input]', index, e.target.value, q['id'])
    // let uid = 'user2'
    // console.log('[state]', this.state);
    const {uid } = this.props

    const { quizSelected } = this.state
    quizSelected.questions[index]['entry'][uid] = e.target.value
    this.setState ({ quizSelected: quizSelected})
    // console.log(this.state.quizSelected);
  }

  handleRadioChange = () => {
    console.log(222);
  }

  handleQuizSubmit = () => {
    // 1. courses/cid/curri/id or index / content / id or index / quiz / questions / id or index / {uid: answer}
    //$cid, curri, item , section , lecture, quiz, questions / entry
    // 2. add cid, curri id,
    const {cid } = this.props
    const { quizSelectedQid, quizSelected, quizSelectedIndex } = this.state
    console.log('[quizSubmit]', quizSelectedQid, quizSelected, quizSelectedIndex);
    db.doSaveQuizEntry(cid, quizSelectedIndex[0], quizSelectedIndex[1], quizSelected)
    .then(res => this.setState ({ QuizStatus: 'quizTakenResult', startTest: true, quizEntryResult: true, }) )
    .catch(error => {
      this.setState({[error]: error});
    });

  }

  handleQuizReview = () => {
    this.setState ({QuizStatus: 'quizTakenResult', startTest: true, quizEntryResult: true })
  }

  handleQuizReTry = () => {
      this.setState ({ QuizStatus: 'quizNotTakenQuestion', startTest: true, quizEntryResult: false })
  }

  render() {

    // const {tName, cTitle,} = this.props.match.params
    // let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'

    const {
      // course,
      // cid, tid, tName, title, subTitle, openCourse, coursePass, tProfileImg,
      activeItem,
      // features, images, curri, attendee,
      questions,
      qTitle, qText,
      isLoading,
      lastPage,
      // user
      QuizStatus,

      quizModalOpen,
      userEntryExist,
      startTest,

      quizSelectedQid,
      quizSelected,
      quizEntryResult,

    } = this.state

    // let teacherName = tName ? tName : 'Teacher'
    // let teacherProfile = tProfileImg ? tProfileImg : profile
    // let meta = course ? course.metadata : null
    console.log('quiz selected', quizSelected);
    const {match, cid, course, attending, uid} = this.props

    let meta = course[cid].metadata
    let teacherName = meta.tName
    let teacherProfile = meta.tProfileImg
    let title = meta.title
    let subTitle = meta.subTitle
    let tid = meta.tid

    let qList = questions

    let curri = course[cid].curri
    let features = course[cid].features
    let images = course[cid].images


    return (
      <Grid >
          <Grid.Column>
              <SectionContainer>

                <Header as='h1' inverted>
                   <Image circular src={profile}/>
                   <Header.Content>
                     {title}
                     <Header.Subheader>
                       {subTitle !== undefined || subTitle !== '' ? subTitle : '' }
                     </Header.Subheader>
                     <Header.Subheader onClick={this.handleNavToTeacher}>
                       {teacherName}
                       {/* <Rating icon='star' defaultRating={5} maxRating={5} disabled/> */}
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
                     {/* <Menu.Item
                       name='announcement'
                       active={activeItem === 'announcement'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/announcement`}
                       style={style.DASHBOARD_MENU_ITEM}
                     /> */}
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
                  >{title} </Header>

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
                    {/* <Menu.Item
                      name='announcement'
                      active={activeItem === 'announcement'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/announcement`}
                      style={style.DASHBOARD_MENU_ITEM}
                    /> */}
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
                        <TeacherQuestions {...props}
                          questions={qList}
                          click={this.handleQuestionClick}
                          tid={tid}
                          click={this.handleNewQ} {...props}
                          queClick={this.handleQuestionClick}
                          searchQueryChange={this.handleSearchQueryChange}
                          isLoading={isLoading}
                          loadMore={this.handleFetchQuestionsMore}
                          lastPage={lastPage}
                        />}

                         />} />
                      <Route path={`${match.url}/curri`} render = {() =>
                        <CourseCurri
                          sections={curri}
                          handleSecToggle={this.handleSecToggle}
                          takeQuiz={this.handleTakeQuiz}
                         />} />
                       <Route path={`${match.url}/info`} render = {() =>
                         <InfoBundle
                           meta={meta}
                           features={features}
                           images={images}
                          />} />
                      <Route path={`${match.url}/new-question`} render={() =>
                        <NewQ
                          // tid={tid}
                          // cTeaching={cTeaching}
                          // selectOption={selectOption}
                          qTitle={qTitle}
                          qText={qText}
                          submit={this.onQuestionSubmit}
                          cancel={this.handleNewQCancel}
                          change={this.handleQuestionInputChange}
                          // chooseCourse={this.handleCourseSelect}
                        />} />
                      />

                      <Route
                        // path='/teacher/:teacherId/question/:questionId'
                        path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
                        render={() => <QuestionPage
                          handleDeleteQuestion={this.handleDeleteQuestion}
                          handleFollowQuestion={this.handleFollowQuestion}
                        />}
                      />

                    </Switch>

                  </Container>
                </Responsive>

                <Responsive minWidth={320} maxWidth={991}>
                   <Container>

                    <Switch>

                    <Redirect exact from={match.url} to={`${match.url}/questions`} />
                    <Route path={`${match.url}/questions`} render = {(props) =>
                      <TeacherQuestions {...props}
                        questions={qList}
                        click={this.handleQuestionClick}
                        tid={tid}
                        click={this.handleNewQ} {...props}
                        queClick={this.handleQuestionClick}
                        searchQueryChange={this.handleSearchQueryChange}
                        isLoading={isLoading}
                        loadMore={this.handleFetchQuestionsMore}
                        lastPage={lastPage}
                      />}

                       />} />
                    <Route path={`${match.url}/curri`} render = {() =>
                      <CourseCurri
                        sections={curri}
                        handleSecToggle={this.handleSecToggle}
                        takeQuiz={this.handleTakeQuiz}
                       />} />
                     <Route path={`${match.url}/info`} render = {() =>
                       // <CourseMeta
                       //   meta={meta}
                       //  />} />
                       <InfoBundle
                         meta={meta}
                         features={features}
                         images={images}
                        />} />
                    <Route path={`${match.url}/new-question`} render={() =>
                      <NewQ
                        // tid={tid}
                        // cTeaching={cTeaching}
                        // selectOption={selectOption}
                        qTitle={qTitle}
                        qText={qText}
                        submit={this.onQuestionSubmit}
                        cancel={this.handleNewQCancel}
                        change={this.handleQuestionInputChange}
                        // chooseCourse={this.handleCourseSelect}
                      />} />

                    <Route
                      // path='/teacher/:teacherId/question/:questionId'
                      path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
                      render={() => <QuestionPage
                        handleDeleteQuestion={this.handleDeleteQuestion}
                        handleFollowQuestion={this.handleFollowQuestion}
                      />}
                    />

                  </Switch>

                </Container>
              </Responsive>


                  </Grid.Column>
              </Grid>

              {quizModalOpen
                ? <Modal size='small' open={quizModalOpen} >
                  <Modal.Header>
                      {quizSelected ? quizSelected.metadata.title : null}
                  </Modal.Header>
                  {QuizModalType(quizModalOpen, this.handleQuizModalClose, userEntryExist, startTest, this.handleStartTest, quizSelected, this.handleChange, this.handleRadioChange, this.handleQuizSubmit, this.handleQuizReview, this.handleQuizReTry, quizEntryResult, uid)[QuizStatus]}
                </Modal>
              : null}

          </Grid.Column>
      </Grid>

    )
  }
}

MyCoursePage.contextTypes ={
  authUser: PropTypes.object,
}
//
const verifyStudent = (uid, attendee) => {
  console.log('verify', uid, attendee);
  let attending = !!attendee && Object.keys(attendee).filter(a => a == uid)
  if (!!attending[0]) {
    console.log('attendee', !!attending[0]);
    return true
  } else {
    console.log('attendee', !!attending[0]);
    return false
  }
}


const authCondition = (authUser) => !!authUser

// export default withRouter(MyCoursePage);
// export default withAuthorization(MyCoursePage);
export default withAuthorizationMyCoursePage(authCondition, verifyStudent)(MyCoursePage);

// QuestionType(index, q, handleChange, handleRadioChange)[q.type]

const QuizModalType = (quizModalOpen, handleQuizModalClose, userEntryExist, startTest, handleStartTest, quizSelected, handleChange, handleRadioChange, handleQuizSubmit, handleQuizReview, handleQuizReTry, quizEntryResult, uid) => ({
  quizNotTakenBeforeQuestion: (
    <React.Fragment>

      <Modal.Content>
        <Segment basic>
          {quizSelected ? quizSelected.metadata.instruction : null}
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleQuizModalClose}>
          Cancel
        </Button>
          <Button primary icon='checkmark' labelPosition='right' content='Start' onClick={handleStartTest}/>
      </Modal.Actions>
    </React.Fragment>
  ),
  quizNotTakenQuestion: (
  <React.Fragment>
      <Modal.Content>
        {/* need to check // QUESTION:  */}
        {quizSelected && startTest === true
          ? quizSelected.questions.map((q, index) => QuestionType(index, q, handleChange, handleRadioChange, quizEntryResult)[q.type])
          : null
        }
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleQuizModalClose}>
          Cancel
        </Button>
        {startTest
          ? <Button positive icon='checkmark' labelPosition='right'
            content='Submit' onClick={handleQuizSubmit}/>
          : null }
      </Modal.Actions>
    </React.Fragment>
  ),
  quizTakenBeforeResult: (
    <Modal size='small' open={quizModalOpen} >
      <Modal.Header>
          {quizSelected ? quizSelected.metadata.title : null}
      </Modal.Header>
      <Modal.Content>
        <p>You have taken this quiz already </p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={handleQuizModalClose}>
          Go back
        </Button>
        <Button positive onClick={handleQuizReview}>
          Result
        </Button>
        <Button primary onClick={handleQuizReTry}>
          Re-try
        </Button>
      </Modal.Actions>
    </Modal>
  ),
  quizTakenResult: (
    <Modal size='small' open={quizModalOpen} >
      <Modal.Header>
          {quizSelected ? quizSelected.metadata.title : null}
      </Modal.Header>
      <Modal.Content>
        {quizSelected && startTest === true
          ? quizSelected.questions.map((q, index) => QuestionType(index, q, handleChange, handleRadioChange, quizEntryResult, uid)[q.type])
          : null
        }
      </Modal.Content>
      <Modal.Actions>
        <Button positive onClick={handleQuizModalClose}>
          Close
        </Button>
        <Button primary onClick={handleQuizReTry}>
          Re-try ?
        </Button>
      </Modal.Actions>
    </Modal>
  ),
})
