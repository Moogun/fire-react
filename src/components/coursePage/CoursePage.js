import React, {Component} from 'react'
import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseCurri from './CourseCurri'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import {Link, withRouter} from 'react-router-dom';
import {db} from '../../firebase';

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

class CoursePage extends Component {

  state = {
    menuFixed: false,
  }

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  componentDidMount() {
    console.log('course page', this.props.match);
    const {teacherName, courseName} = this.props.match.params
    console.log('t', teacherName, 'c', courseName);

    db.onceGetUserWithName(teacherName)
      .then(res => console.log('res', res.val()))

    var titleUnDashed = courseName.replace(/-/g, ' ')
    console.log('titleUnDashed', titleUnDashed);
    
    db.onceGetCourseWithTitle(titleUnDashed)
      .then(res => console.log('res', res.val()))
  }

  handleEnroll = () => {
    console.log();
  }

  render() {
    const {menuFixed} = this.state
    console.log('course page', this.props);
    const {teacherName, courseName } = this.props.match.params
    console.log('t', teacherName, 'c', courseName);
    return (
      <Grid>
        <Grid.Row>
            <Grid.Column>
              <Container>

                <Breadcrumb style={{marginTop: '2em' }}>
                   <Breadcrumb.Section link as={Link} to='/' >
                     Home
                   </Breadcrumb.Section>
                   <Breadcrumb.Divider icon='right angle' />
                   <Breadcrumb.Section link as={Link} to={`/${teacherName}`} >
                     {teacherName}
                   </Breadcrumb.Section>
                   <Breadcrumb.Divider icon='right angle' />
                   <Breadcrumb.Section link>
                     {courseName}
                   </Breadcrumb.Section>
                 </Breadcrumb>

                <Grid style={{margin: '3em'}} stackable>
                  <Grid.Row>
                    <Grid.Column width={12}>

                      <Segment basic style={{margin: '3em' }} >
                        <Header as='h1'
                          style={{color: '#fff'}}
                          content='ChatBots: How to Make a Facebook Messenger Chat Bot in 1hr'
                          subheader='We will Create a Parrot Bot Together! This course is a Step by Step Guide in Building a Chat Bot for Facebook Messenger' />
                      </Segment>
                      <Button onClick={this.handleEnroll}>Register</Button>
                    </Grid.Column>

                    <Grid.Column width={3} textAlign='center'>
                      <Image src={profile} circular centered />
                      <Header as="h3" content='Name' subheader='profile' />
                      <Rating icon='star' defaultRating={5} maxRating={4} />
                      <p> '000 reviews' </p>
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                  </Grid.Row>

                  <CourseMeta />
                  <CourseFeatures />
                  <CourseCurri />

                </Grid>

              </Container>

            </Grid.Column>
        </Grid.Row>

      </Grid>

    )
  }
}
export default withRouter(CoursePage);
