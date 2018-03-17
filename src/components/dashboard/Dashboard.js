import React, {Component} from 'react'

import CourseCards from '../courses/CourseCards'
import QPanel from './QPanel'

import { Grid, Header, Menu, Visibility, Responsive } from 'semantic-ui-react'

class Dashboard extends Component {
  state = {
    activeItem: ''
  }

  render() {
    const {activeItem} = this.state
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
                              <Menu.Item name='home'
                                active={activeItem === 'home'} onClick={this.handleItemClick}/>
                              <Menu.Item name='questions' active={activeItem === 'questions'} onClick={this.handleItemClick} />
                              <Menu.Item name='announcement' active={activeItem === 'announcement'} onClick={this.handleItemClick} />
                            </Menu>
                        <CourseCards />
                        <QPanel />
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

export default Dashboard
