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
            course: course
          })
        } else {
          console.log('find a way to display course titles that have dash in it');
        }
      })

  }

  handleRoute = () => {
      const {tName,} = this.props.match.params
      this.props.history.push('/teacher' + '/' + tName)
  }

  handleEnroll = () => {
    console.log();
  }

  handleClick = () => {
    const {tName, cTitle,} = this.props.match.params
    this.props.history.push({pathname: '/' + 'teacher' + '/' + tName})
  }

  render() {
    // const {menuFixed} = this.state
    const {tName, cTitle,} = this.props.match.params
    let title = cTitle ? cTitle.replace(/-/g, ' ') : 'Title'
    let teacher = tName ? tName : 'Teacher'

    const { course } = this.state
    let meta = course ? course.metadata : null
    // let features = course ? course.features : null
    // let curri = course ? course.curri : null
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
                   <Breadcrumb.Section link onClick={this.handleRoute} >
                     {tName}
                   </Breadcrumb.Section>
                   <Breadcrumb.Divider icon='right angle' />
                   <Breadcrumb.Section>
                     {cTitle}
                   </Breadcrumb.Section>
                 </Breadcrumb>

                <Grid style={{margin: '3em'}} stackable>
                  <Grid.Row>
                    <Grid.Column width={12}>

                      <Segment basic style={{margin: '3em' }} >
                        <Header as='h1'
                          // style={{color: '#fff'}}
                          content={title}
                          subheader='We will Create a Parrot Bot Together! This course is a Step by Step Guide in Building a Chat Bot for Facebook Messenger' />
                      </Segment>
                      <Button onClick={this.handleEnroll}>Register</Button>
                    </Grid.Column>

                    <Grid.Column width={3} textAlign='center'>
                      <Image src={profile} circular centered />
                      <Header as="h3" content={tName} subheader='profile' />
                      <Rating icon='star' defaultRating={5} maxRating={4} />
                      <p onClick={this.handleClick}> '000 reviews' </p>
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>
                  </Grid.Row>

                  <CourseMeta meta={meta}/>
                  <CourseFeatures
                    // features={features}
                  />
                  <CourseCurri course={course}/>

                </Grid>

              </Container>

            </Grid.Column>
        </Grid.Row>

      </Grid>

    )
  }
}
export default withRouter(CoursePage);
