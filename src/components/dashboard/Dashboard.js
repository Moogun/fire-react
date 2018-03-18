import React, {Component} from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';

import CourseCards from '../courses/CourseCards'
import CourseList from './CourseList'
import QPanel from './QPanel'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive } from 'semantic-ui-react'

class Dashboard extends Component {
  state = {
    activeItem: '',
    auth: null,
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  componentDidMount() {
     console.log('1 did mount ', this.context.authUser);
      let teacherID = 'MxbMJw31WCUsU0v5GOWMTqwcApR2';

      db.onceGetUser(teacherID)
       .then(snapshot => this.setState( () => ({user: snapshot.val()} ) ))
       .catch(error => {
         this.setState({[error]: error});
       });

     // { this.context.authUser &&
     //   firebase.db.onceGetUser(this.context.authUser.uid)
     //     .then(snapshot => { console.log(snapshot.val())})
     //     .error(error => {this.setState({error: error})})

  }

  render() {

    const {activeItem, error, user} = this.state
    console.log('1 error', error);
    console.log('2 render user', user);
    console.log('3 render auth user', this.context.authUser);
    const {authUser} = this.context

    // console.log('state auth User', {authUser&& });
    let courseKey = '123'
      return (
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
                                // as={Link} to={`${match.url}/course`} />
                                // as={Link} to='/course/' + courseKey + '/edit', />
                                as={Link} to='/teaching/' />
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

                        <CourseList />
                        <Route path='/teaching/questions' component = {QPanel} />

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
