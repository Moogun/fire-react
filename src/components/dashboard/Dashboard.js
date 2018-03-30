import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive, Segment  } from 'semantic-ui-react'

const dashboardHeader = {marginTop: '0rem', paddingTop: '2rem', backgroundColor: '#2980b9'}
const dashboardHeaderColor = {color: '#fff'}
const dashboardHeaderMenuBorderColor = {borderColor: '#2980b9'}
const dashboardBody = {marginTop: '0rem', backgroundColor: '#ecf0f1'}

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseTeaching: null,
      isLoading: false,
    };
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})
  handleCourseClick = (courseKey) => {
    const {history} = this.props;
    history.push({
      pathname: '/course_manage/' + courseKey + '/edit',
    })
  }

  componentDidMount() {

    console.log('4 did mount context authUser ', this.context.authUser);

     //fetch teaching course with user id,
     //if no id was provided redirect to signin
     const {isLoading } = this.state
     this.setState({isLoading: !isLoading})
     if (this.context.authUser ) {
       // console.log('authUser');
       db.onceGetUser(this.context.authUser.uid)
        .then(snapshot => {
          const {isLoading } = this.state
          // console.log('inside', isLoading);
          this.setState( () => ({courseTeaching: snapshot.val().courseTeaching, isLoading: !isLoading} ) )
        }


        )
        .catch(error => {
          this.setState({[error]: error});
        });
     }
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {authUser, match} = this.props
    const {activeItem, error, user, courseTeaching} = this.state

    // console.log('1 render props authUser', authUser);
    // console.log('2 render state user', user);
    // console.log('2 render state courseTeaching', courseTeaching);
    // console.log('3 render context auth user', this.context.authUser);

      return (

        <Grid >
          <Grid.Row>
            <Grid.Column>

              {/* <Responsive minWidth={320}>
                <Visibility onUpdate={this.handleUpdate}> */}
                  <Grid style={dashboardHeader} centered>
                      <Grid.Row>
                        <Grid.Column width={12}>

                            <Header as='h1' style={dashboardHeaderColor}>Dashboard</Header>

                            <Menu size='small' secondary pointing inverted
                              style={dashboardHeaderMenuBorderColor} >
                                <Menu.Item name='courses'
                                  active={activeItem === 'courses'}
                                  onClick={this.handleItemClick}
                                  // as={Link} to='/teaching/courses'
                                  as={Link} to={`${match.url}/courses`}
                                />
                                <Menu.Item
                                  name='questions'
                                  active={activeItem === 'questions'}
                                  onClick={this.handleItemClick}
                                  // as={Link} to='/teaching/questions'
                                  as={Link} to={`${match.url}/questions`}
                                />
                                <Menu.Item
                                  name='announcement'
                                  active={activeItem === 'announcement'}
                                  onClick={this.handleItemClick} />
                              </Menu>

                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Grid style={dashboardBody} centered>
                      <Grid.Row>
                        <Grid.Column width={12}>

                          <Switch>
                            <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                            <Route path={routes.DASHBOARD_COURSES} render = {(props) => <CourseTeaching {...props} courses={courseTeaching} click={this.handleCourseClick}/> } />
                            <Route path={routes.DASHBOARD_Q_PANEL} component = {QPanel} />
                          </Switch>

                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                {/* </Visibility>
              </Responsive> */}

            </Grid.Column>
          </Grid.Row>
        </Grid>

      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(Dashboard)
