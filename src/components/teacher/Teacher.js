import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Header, Icon, Menu, Image, Grid, Breadcrumb, Rating} from 'semantic-ui-react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import Courses from './Courses'
import Questions from './Questions'
import NewQ from '../questions/NewQ'
import CoursePage from '../coursePage/CoursePage'
import profile from '../../assets/profile-lg.png'
import {db} from '../../firebase';

const NEW_Q = {
  text: '',
  title:'',
  cid: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
})

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      teacherId: '',
      tName: '',
      cTeaching: '',
      questions: null,
      answersGiving: [],
      NEW_Q: NEW_Q,
      error: null,
    };
  }

  //menu selection
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  //navigation  courses, questions, new question
  handleCourseClick = (id, tName, cTitle) => {
    console.log('teacher', id, tName, cTitle);
    let title = cTitle.replace(/\s+/g, '-');
    this.props.history.push('/' + tName + '/' + title)
  }

  handleQueClick = (qid) => {
    console.log('teacher q click', qid);
    this.props.history.push(`${this.props.match.url}/question/qid`)
  }

  handleNewQ = () => {
    this.props.history.push(`${this.props.match.url}/new-question`)
  }

  // new question methods
  onSubmit = (event) => {

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

  handleChange = (e, { value }) => {
    this.setState({[e.target.name]: e.target.value})
    e.preventDefault()
  }

  handleQidSelection = (e, {value}) => {
    this.setState({cid: value})
    e.preventDefault()
  }

  //life cycle methods
  componentWillUnmount(){
    console.log(0);
  }

  componentDidMount(){
    const {tName} = this.props.match.params
    let teacherId
    db.onceGetUserWithName(tName)
      .then(tSnap => {
        let t = tSnap.val()
        // console.log('t did mount',t );
        teacherId = Object.keys(tSnap.val())
        console.log('t did mount key', teacherId);
        let cTeaching = t[teacherId].courseTeaching

        let selectOption=[]
        let item;

        Object.keys(cTeaching).map(key => {
          item={key: key, text: cTeaching[key].metadata.title, value: key}
          selectOption.push(item)
        })

        this.setState ({ cTeaching: cTeaching, teacherId: teacherId[0],
          'selectOption': selectOption
        })
        this.handleFetchQuestions()
      }).catch(error => {
        this.setState(byPropKey('error', error))
      })
  }

  handleFetchQuestions = () => {
    const {teacherId} = this.state
    db.doFetchRecentQuestions(teacherId)
      .then(res => this.setState({questions: res.val() }) )
      .catch(error => {
        this.setState(byPropKey('error', error))
      })
  }

  componentWillUnmount(){
    console.log('will un mount 0 ', )
  }

  render() {
    const {} = this.state
    const {match} = this.props
    const {tName} = this.props.match.params
    const { activeItem, teacherId, cTeaching, selectOption, questions } = this.state
    // console.log('teacher render 1 c teaching', cTeaching )
    // console.log('teacher render 1 selectOption', selectOption )

    return (
      <Grid>
        <Grid.Row>
            <Grid.Column>

              <Container>

               <Breadcrumb style={{marginTop: '2em' }}>
               <Breadcrumb.Section link as={Link} to='/'> Home </Breadcrumb.Section>
               <Breadcrumb.Divider icon='right angle' />
               <Breadcrumb.Section>Teacher name</Breadcrumb.Section>
               </Breadcrumb>

               <Grid style={{margin: '3em'}} stackable>
                   <Grid.Row>
                     <Grid.Column width={12}>

                       <Segment basic style={{margin: '3em' }} >
                         <Header as='h1'
                           // style={{color: '#fff'}}
                           content={tName}
                           subheader='Profile' />
                           <Rating icon='star' defaultRating={5} maxRating={4} />
                           <p> '000 reviews' </p>
                       </Segment>
                     </Grid.Column>

                     <Grid.Column width={3} textAlign='center'>
                       <Image src={profile} circular centered/>
                     </Grid.Column>
                     <Grid.Column width={1}>
                     </Grid.Column>
                   </Grid.Row>

                   <Grid.Row>
                    <Grid.Column>
                      <Segment basic>
                        <Menu size='large'>
                          <Container>
                            <Menu.Item
                              name='course'
                              active={activeItem === 'courses'}
                              onClick={this.handleItemClick}
                              as={Link} to={`${match.url}/courses`}>Courses</Menu.Item>
                            <Menu.Item
                              name='question'
                              active={activeItem === 'questions'}
                              onClick={this.handleItemClick}
                              as={Link} to={`${match.url}/questions`}>Questions</Menu.Item>
                            <Menu.Item
                              name='story'
                              active={activeItem === 'story'}
                              onClick={this.handleItemClick}
                              as={Link} to={`${match.url}/story`}>Story</Menu.Item>
                            <Menu.Item
                              name='review'
                              active={activeItem === 'review'}
                              onClick={this.handleItemClick}
                              as={Link} to={`${match.url}/story`}>Review</Menu.Item>
                            </Container>
                          </Menu>
                         </Segment>
                      </Grid.Column>
                 </Grid.Row>
                 <Grid.Row>
                      <Grid.Column>

                        <Switch>
                          <Redirect exact from={match.url} to={`${match.url}/courses`} />
                          <Route path={`${match.url}/courses`} render={() =>
                            <Courses
                              tName={tName}
                              cTeaching={cTeaching}
                              click={this.handleCourseClick}
                            />} />
                          <Route path={`${match.url}/questions`} render={ (props) =>
                                <Questions
                                  tid={teacherId}
                                  questions={questions}
                                  click={this.handleNewQ} {...props}
                                  queClick={this.handleQueClick}
                                />} />
                         <Route path={`${match.url}/new-question`} render={() =>
                           <NewQ
                             tid={teacherId}
                             cTeaching={cTeaching}
                             selectOption={selectOption}
                             submit={this.onSubmit}
                             change={this.handleChange}
                             changeQid={this.handleQidSelection}
                           />} />
                       </Switch>

                     </Grid.Column>
                   </Grid.Row>

                 </Grid>
              </Container>

            </Grid.Column>
        </Grid.Row>
      </Grid>

    //         <Header
    //           as='h1'
    //           content='Teacher Name'
    //           // inverted
    //           style={{
    //             // fontSize: mobile ? '2em' : '3em',
    //             fontWeight: 'normal',
    //             // color: 'white',
    //             // marginBottom: mobile ? '1.5em' : '1.5em',
    //             // marginTop: mobile ? '1.5em' : '1em',
    //             marginTop: '2em',
    //           }}
    //           // color='yellow'
    //         />
    );
  }
}

Teacher.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(Teacher)
