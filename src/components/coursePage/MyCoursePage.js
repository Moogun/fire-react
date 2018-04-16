import React, {Component} from 'react'
import PropTypes from 'prop-types';

import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseGallery from './CourseGallery'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'

import Questions from '../teacher/Questions'

import Question from '../questionPage/QuestionPage';

import NewQ from '../questions/NewQ' 

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
      questions: '',
      isLoading: false,
      lastPage: false,
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
            qTitle: '',
            qText: '',
          })
          const {tid, cid} = this.state
          // console.log('tid, cid', tid, cid);
          let curri = course.curri
          // console.log('curri', curri);
          this.onChange(createEditorState(JSON.parse(curri)))

          let qList =[]
          let questions = db.doFetchRecentQuestions(tid, cid, 5)
          questions.on('child_added', (data) => {
            // console.log('child added data', data.key, data.val(), data.val()["qid"]= data.key);
            let q = data.val()
            q['qid'] = data.key
            // // console.log('q', q);
            qList.unshift(q)
            this.setState ({ questions: qList, isLoading: false })
            console.log('isloading 2 dmt ', this.state.isLoading);
          })

        } else {
          console.log('find a way to display course titles that have dash in it');
        }

        const {authUser} = this.context
        if (authUser) {
          console.log('My course page authUser', authUser);
          db.onceGetUser(authUser.uid)
            .then(res => {
              // console.log('my course user', res.val())
              this.setState ({ user: res.val(), uid: authUser.uid })
            })
            .catch(error => {
              this.setState({[error]: error});
            });
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

  handleMore = (e) => {
    console.log('load more clicked');
    e.preventDefault()
    this.setState ({isLoading: true })
    console.log('isloading 1 handle more ', this.state.isLoading);
    const {tid, cid, questions } = this.state

    let leng = questions.length
    let lastElmQid = questions[leng -1].qid
    let fetchedItem = 1
    // console.log('leng', leng, 'lastElmQid', lastElmQid);
    let paginated = db.doFetchNextQuestions(tid, cid, lastElmQid, 5)
    paginated.on('child_added', (data) => {
      let q = data.val()
        fetchedItem += 1
        console.log('fetchedItem', fetchedItem);
        if(lastElmQid === data.key) {
          return
        }
        console.log();

        q['qid'] = data.key
        console.log('p', data.val());

        questions.splice(leng, 0, q)
        this.setState ({ questions: questions, isLoading: false })
        console.log('isloading 2 handle more ', this.state.isLoading);
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

    const {tid, cid, qTitle, qText, uid, user,} = this.state;
    console.log('handleQuestionSubmit', tid, cid, qTitle, qText, user);

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

    event.preventDefault();
  }

  handleNewQCancel = (e) => {
    e.preventDefault()
    console.log('handle cancel confirm');
  }

  handleCourseSelect = (e, {value}) => {
    this.setState({cid: value})
    e.preventDefault()
  }

  handleSearchQueryChange =(value) => {

    this.setState({ isLoading: true, value })
    setTimeout( () => {
      const {tid} = this.state
      db.doSearchForQuestions(tid, value)
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

    // console.log('render');
    const {tName, cTitle,} = this.props.match.params

    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacherName = tName ? tName : 'Teacher'

    const { course, cid, tid, subTitle, openCourse, coursePass, attendee, modalOpen, tProfileImg, editorState, features, images, activeItem, questions, qTitle, qText, isLoading } = this.state
    console.log('rdr questions', questions, isLoading);
    let teacherProfile = tProfileImg ? tProfileImg : profile
    // let questionsReversed = questions.reverse()
    const renderedHtml = mediumDraftExporter(editorState.getCurrentContent())

    let meta = course ? course.metadata : null
    const {match} = this.props

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
                          tid={tid}
                          click={this.handleNewQ} {...props}
                          queClick={this.handleQuestionClick}
                          searchQueryChange={this.handleSearchQueryChange}
                          isLoading={isLoading}
                          loadMore={this.handleMore}
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
                      <Route path={`${match.url}/new-question`} render={() =>
                        <NewQ
                          // tid={tid}
                          // cTeaching={cTeaching}
                          // selectOption={selectOption}
                          qTitle={qTitle}
                          qText={qText}
                          submit={this.handleQuestionSubmit}
                          cancel={this.handleNewQCancel}
                          change={this.handleQuestionChange}
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
                        loadMore={this.handleMore}
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
                    <Route path={`${match.url}/new-question`} render={() =>
                      <NewQ
                        // tid={tid}
                        // cTeaching={cTeaching}
                        // selectOption={selectOption}
                        qTitle={qTitle}
                        qText={qText}
                        submit={this.handleQuestionSubmit}
                        cancel={this.handleNewQCancel}
                        change={this.handleQuestionChange}
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

export default withRouter(MyCoursePage);
