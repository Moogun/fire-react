import React, {Component} from 'react'
import {Link, Route, withRouter} from 'react-router-dom'

import CourseCards from '../courses/CourseCards'
import CourseList from './CourseList'
import QPanel from './QPanel'

import { Grid, Header, Menu, Visibility, Responsive } from 'semantic-ui-react'

class Dashboard extends Component {
  state = {
    activeItem: ''
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {

    const {activeItem} = this.state
    // const {courseKey} = this.props
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

export default withRouter(Dashboard)
