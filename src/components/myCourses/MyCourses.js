import React, {Component} from 'react'

import CourseCards from '../courses/CourseCards'

import { Grid, Header, Menu, Visibility, Responsive } from 'semantic-ui-react'

class MyCourses extends Component {

    state = {
      activeItem : '',
      calculations: {
        width: 0,
        topPassed: false,
        bottomPassed: false,
        pixelsPassed: 0,
        percentagePassed: 0,
        topVisible: false,
        bottomVisible: false,
        fits: false,
        passing: false,
        onScreen: false,
        offScreen: false,
      },
  }

  handleUpdate = (e, { calculations }) => this.setState({ calculations })

  render() {
    // const { calculations, contextRef } = this.state
    const {calculations, activeItem} = this.state
    console.log('width', calculations.width);
    let margin;
    if (calculations.width > 1127 ) {
      margin = '3em'
    } else if (calculations.width > 933) {
      margin = '0em'
    }
      return (
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              //setting high min width removes the error 'getBoundingClientRect'
              <Responsive minWidth={320}>
                <Visibility onUpdate={this.handleUpdate}>
                  <Grid style={{margin: '3em'}} color='teal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Header as='h1'>My Courses</Header>
                          <Menu size='small' secondary>
                              <Menu.Item name='home'
                                active={activeItem === 'home'} onClick={this.handleItemClick}/>
                              <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                              <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                            </Menu>

                        <CourseCards />

                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Visibility>
              </Responsive>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
}

export default MyCourses
