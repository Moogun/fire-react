import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive,  } from 'semantic-ui-react'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseTeaching: null,
    };
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  handleCourseClick = (courseKey) => {
    const {history} = this.props;
    history.push({
      pathname: '/course_manage/' + courseKey + '/edit',
      // search: '?query=' + title + name,
      state : {
        courseKey: courseKey,
        title: 'title',
      }
    })
  }

  componentDidMount() {

    console.log('4 did mount context authUser ', this.context.authUser);

     //fetch teaching course with user id,
     //if no id was provided redirect to signin

     if (this.context.authUser ) {
       console.log('authUser');
       db.onceGetUser(this.context.authUser.uid)
        .then(snapshot => this.setState( () => ({courseTeaching: snapshot.val().courseTeaching} ) ))
        .catch(error => {
          this.setState({[error]: error});
        });
     }
  }

  render() {
    const {authUser, match} = this.props
    const {activeItem, error, user, courseTeaching} = this.state

    console.log('1 render props authUser', authUser);
    console.log('2 render state user', user);
    console.log('2 render state courseTeaching', courseTeaching);
    console.log('3 render context auth user', this.context.authUser);

    let courses = courseTeaching ?
    <Grid container>
      <Grid.Row>
        <Grid.Column>

          {/* <Responsive minWidth={320}>
            <Visibility onUpdate={this.handleUpdate}> */}
              <Grid style={{margin: '3em'}} color='teal'>
                <Grid.Row>
                  <Grid.Column>

                      <Header as='h1'>Dashboard</Header>

                      <Menu size='small' secondary>
                          <Menu.Item name='courses'
                            active={activeItem === 'courses'}
                            onClick={this.handleItemClick}
                            as={Link} to='/teaching/courses'
                          />
                          <Menu.Item
                            name='questions'
                            active={activeItem === 'questions'}
                            onClick={this.handleItemClick}
                            as={Link} to='/teaching/questions'
                          />
                          <Menu.Item
                            name='announcement'
                            active={activeItem === 'announcement'}
                            onClick={this.handleItemClick} />
                        </Menu>


                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <Switch>
                      <Redirect exact from={match.url} to={`${match.url}/courses`} />
                      <Route path='/teaching/courses' render = {(props) => <CourseTeaching {...props} courses={courseTeaching} click={this.handleCourseClick}/> } />
                      <Route path='/teaching/questions' component = {QPanel} />
                    </Switch>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            {/* </Visibility>
          </Responsive> */}

        </Grid.Column>
      </Grid.Row>
    </Grid>
    : <p>No course teaching yet</p>

    let courseKey = '123'
      return (
        <div>
        {courses}
        </div>
      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(Dashboard)
