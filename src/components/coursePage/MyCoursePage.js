import React, {Component} from 'react'
import PropTypes from 'prop-types';

import {Link, withRouter, Switch, Redirect, Route} from 'react-router-dom';
import {db} from '../../firebase';
import withAuthorization from '../../HOC/withAuthorization';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseGallery from './CourseGallery'
import CourseCurri from './CourseCurri'
import CourseAboutTeacher from './CourseAboutTeacher'

//BORROWED from TEACHER
import Questions from '../teacher/Questions'

//BORROWED from QUE
import Question from '../questionPage/QuestionPage';
import QuestionTable from '../questions/QuestionTable'
import NewQ from '../questions/NewQ' 

import { Grid, Segment, Header, Menu, Container, Visibility, Image, Rating, Button, Item, Icon, Responsive } from 'semantic-ui-react'

import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

import profile from '../../assets/profile-lg.png'

import * as style from '../../style/inline';
import * as routes from '../../constants/routes';



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

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

const COURSE_PAGE_HEADER = { backgroundColor: '#34495e', marginTop: '0rem'}

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

      questions: '',
      isLoading: false,
      lastPage: false,
    }
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  componentDidMount() {
    this.handleGetCourseWithTitle()

    // const {authUser} = this.context
    // const { user, uid } = this.props
    // if (user) {
    //   this.setState ({ user: user, uid: uid})
      // console.log('My course page authUser', authUser);
      // db.onceGetUser(uid)
      //   .then(res => {
      //     this.setState ({ user: res.val(), uid: authUser.uid })
      //   })
      //   .catch(error => {
      //     this.setState({[error]: error});
      //   });
    // }
  }

  handleGetCourseWithTitle() {
    console.log('course page did mount', this.props.match.params);
    let cTitle = this.props.match.params.cTitle
    let title = cTitle.replace(/-/g, ' ');

    db.onceGetCourseWithTitle(title)
      .then(cSnap => {
        this.setState ({isLoading: true})
        console.log('isloading 1 dmt ', this.state.isLoading);
        let c = cSnap.val()

        if (c) {
          let key = Object.keys(c)
          let course = c[key]
          // console.log('course', course);

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
            sections: course.curri,
            qTitle: '',
            qText: '',

          })

        } else {
          console.log('find a way to display course titles that have dash in it');
        }

      }).then(res => {
        const {tid, cid} = this.state
        console.log('tid, cid', tid, cid);

        let qList =[]
        let fetchedItem = 1
        let questions = db.doFetchRecentQuestions(tid, cid, 5)
        questions.on('child_added', (data) => {
          // console.log('child added data', data.key, data.val(), data.val()["qid"]= data.key);
          let q = data.val()
          fetchedItem += 1
          q['qid'] = data.key
          console.log('fetchedItem', fetchedItem);
          qList.unshift(q)

          if (fetchedItem >= 5) {
            this.setState ({ questions: qList, isLoading: false, lastPage: false })
          } else {
            this.setState ({ questions: qList, isLoading: false, lastPage: true })
          }

        })
      })
      .catch(error => {
        this.setState({[error]: error});
      });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNavToTeacher = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName })
  }

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    console.log('teacher q click', qid);
    // console.log('teacher q click',questions['qid']);
    let selected = questions.filter(q => q.qid == qid)
    console.log('selected', selected);
    this.props.history.push({
      pathname: `${this.props.match.url}/question/${qid}`,
      state:
        {
          q: selected,
          qid: qid
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

  handleQuestionSubmit = (event) => {
    event.preventDefault();
    const {tid, cid, qTitle, qText} = this.state;
    const { uid, user } = this.props
    console.log('handleQuestionSubmit', tid, cid, qTitle, qText);
    console.log('this.props.user', this.props.user)
    let date = new Date();
    let createdAt = Number(date)

    db.doSaveNewQ(tid, cid, uid, user.username, qTitle, qText, createdAt, 'img')
      .then(res => {
        console.log('res', res)
        this.setState ({ qTitle: '', qText: ''})
        this.props.history.replace(`${this.props.match.url}/questions`)
        })
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
  }

  handleNewQCancel = (e) => {
    e.preventDefault()
    console.log('handle cancel confirm');
    this.props.history.goBack()
  }

  // handleCourseSelect = (e, {value}) => {
  //   this.setState({cid: value})
  //   e.preventDefault()
  // }

  handleSearchQueryChange =(value) => {

    this.setState({ isLoading: true, value })
    setTimeout( () => {
      const {tid, cid} = this.state
      db.doSearchForQuestions(tid, cid, value)
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

  saveFechedQuestionsToState = (qList) => {
    console.log('save fetched q to state qlist', qList);
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

    // 2. fetch another 5 including the last qid
    let paginated = db.doFetchNextQuestions(tid, cid, lastElmQid, 5)
    paginated.on('child_added', (data) => {
      let q = data.val()
        fetchedItem += 1 // 3. increase this num to see if 5 items get fetched or fetched fewer than 5
        console.log('data 1', data.val());
        console.log('fetchedItem', fetchedItem);
        if(lastElmQid === data.key) { //4. if last item was the last of the questions list, then returns
          return
        }

        q['qid'] = data.key
        console.log('p', data.val());

        questions.splice(leng, 0, q) // insert the question at the end of the previous data set

        if (fetchedItem >= 5 ) {
          this.setState ({ questions: questions, isLoading: false, lastPage: false })
        } else {
          this.setState ({ questions: questions, isLoading: false, lastPage: true })
        }

        console.log('handle more  isloading 2 ', this.state.isLoading, 'lastpage', this.state.lastPage);
    })
  }

  render() {

    // console.log('render');
    const {tName, cTitle,} = this.props.match.params

    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacherName = tName ? tName : 'Teacher'

    const {
      course, cid, tid, subTitle, openCourse, coursePass, tProfileImg,
      activeItem,
      features, images, sections, attendee,
      questions, qTitle, qText,
      isLoading, lastPage,
      user } = this.state
      console.log('state user', user);
    // console.log('rdr questions', questions, 'isLoading', isLoading, 'lastPage', lastPage);

    let teacherProfile = tProfileImg ? tProfileImg : profile
    let meta = course ? course.metadata : null

    const {match} = this.props
    console.log('my course page ', this.props);
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
                        <Questions {...props}
                          questions={questions}
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
                          sections={sections}
                         />} />
                       <Route path={`${match.url}/info`} render = {() =>
                         <CourseMeta
                           meta={meta}
                          />} />
                      <Route path={`${match.url}/new-question`} render={() =>
                        <NewQ
                          // tid={tid}
                          // cTeaching={cTeaching}
                          // selectOption={selectOption}
                          qTitle={qTitle}
                          qText={qText}
                          submit={this.handleQuestionSubmit}
                          cancel={this.handleNewQCancel}
                          change={this.handleQuestionInputChange}
                          // chooseCourse={this.handleCourseSelect}
                        />} />
                      />

                      <Route
                        // path='/teacher/:teacherId/question/:questionId'
                        path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
                        render={() => <Question />}
                      />

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
                        sections={sections}
                       />} />
                     <Route path={`${match.url}/info`} render = {() =>
                       <CourseMeta
                         meta={meta}
                        />} />
                    <Route path={`${match.url}/new-question`} render={() =>
                      <NewQ
                        // tid={tid}
                        // cTeaching={cTeaching}
                        // selectOption={selectOption}
                        qTitle={qTitle}
                        qText={qText}
                        submit={this.handleQuestionSubmit}
                        cancel={this.handleNewQCancel}
                        change={this.handleQuestionInputChange}
                        // chooseCourse={this.handleCourseSelect}
                      />} />

                    <Route
                      // path='/teacher/:teacherId/question/:questionId'
                      path ={routes.MY_COURSE_PAGE_QUESTION_PAGE}
                      render={() => <Question />}
                    />

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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MyCoursePage);
