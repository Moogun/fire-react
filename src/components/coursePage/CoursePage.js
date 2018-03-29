import React, {Component} from 'react'
import CourseMeta from './CourseMeta'
import CourseFeatures from './CourseFeatures'
import CourseCurri from './CourseCurri'
import CourseTeacherSection from './CourseTeacherSection'
import CourseOpenQ from './CourseOpenQ'
import { Breadcrumb, Grid, Segment, Rail, Header, Sticky, Menu, Container, Visibility, Image, Table, Rating, Button, Item } from 'semantic-ui-react'

import {Link, withRouter} from 'react-router-dom';
import {db} from '../../firebase';
import './CoursePage.css';

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

                <Grid style={{ backgroundColor: '#34495e', marginTop: '0rem'}} stackable centered>

                  {/* <Grid container>
                    <Breadcrumb style={{marginTop: '2rem' }}>
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
                  </Grid> */}

                      <Grid.Row
                        style={{ marginTop: '2rem', marginBottom: '2rem'}}
                        >
                        <Grid.Column width={12} >

                          <Segment basic style={{margin: '0rem'}} color='teal'>
                            <Header as='h1'
                              style={{color: '#fff'}}
                              content={title}
                             />
                             <Header as='h4' style={{marginTop: '0', color: '#fff'}}>  그로스해킹과 구글 애널리틱스 실전</Header>
                             <Button onClick={this.handleEnroll}>Register</Button>
                          </Segment>

                        </Grid.Column>


                      </Grid.Row>
                  </Grid>

                {/* </Grid> */}

                  <Grid style={{ backgroundColor: '#ecf0f1', marginTop: '0rem'}} stackable centered>
                      <Grid.Column width={10} >
                          <CourseMeta meta={meta}/>
                          <CourseFeatures
                            // features={features}
                          />
                          <CourseCurri course={course}/>
                          {/* <CourseTeacherSection
                          />
                          <CourseOpenQ
                          /> */}
                      </Grid.Column>
                  </Grid>

            </Grid.Column>
        </Grid.Row>
      </Grid>

    )
  }
}
export default withRouter(CoursePage);
