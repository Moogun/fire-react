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

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      teacherId: 1,
      tName: '',
      courseTeaching: [1,2,3],
      questionsAsked: [],
      answersGiving: [],
    };
  }
  handleCourseClick = (id, tName, cTitle) => {
    console.log('teacher', id, tName, cTitle);
    let title = cTitle.replace(/\s+/g, '-');
    this.props.history.push('/' + tName + '/' + title)
  }

  handleQueClick = (qid) => {
    console.log('teacher q click', qid);
    this.props.history.push(`${this.props.match.url}/question/qid`)
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNewQ = () => {
    this.props.history.push(`${this.props.match.url}/new-question`)
  }

  componentWillUnmount(){
    console.log(0);
  }

  componentDidMount(){
    const {tName} = this.props.match.params
    db.onceGetUserWithName(tName)
      .then(tSnap => {
        let t = tSnap.val()

        let key = Object.keys(tSnap.val())
        let courseTeaching = t[key].courseTeaching

        this.setState ({ coursesTeaching: courseTeaching})
      }
    )
  }

  componentWillUnmount(){
    console.log('will un mount 0 ', )
  }

  render() {
    const {} = this.state
    const {match} = this.props
    const {tName} = this.props.match.params
    const { activeItem, teacherId, coursesTeaching } = this.state
    console.log('teacher render 1 ', coursesTeaching )

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
                              coursesTeaching={coursesTeaching}
                              click={this.handleCourseClick}
                            />} />
                          <Route path={`${match.url}/questions`} render={ (props) =>
                                <Questions
                                  click={this.handleNewQ} {...props}
                                  queClick={this.handleQueClick}
                                />} />
                         <Route path={`${match.url}/new-question`} render={() => <NewQ />} />
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



export default withRouter(Teacher)
