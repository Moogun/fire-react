import React, { Component } from 'react';
import { Segment,Container, Table, Card, Header, Rating, Grid, Image, Menu, Item, Button, Comment, Form, Icon, Label } from 'semantic-ui-react'
import profile from './assets/profile-lg.png'

class Structure extends Component {
  state ={
    activeItem: 'home'
  }
  render() {
    const { activeItem } = this.state
    return (
        <Grid columns={3} style={{marginTop: '5rem'}}>
          <Grid.Column>
            <Segment>
            TEACHER_PAGE + image + name
              <Segment>
                <Header as='h1'>
                  <Image circular src={profile} />
                  <Header.Content>
                    T name
                    <Header.Subheader>
                      brand
                    </Header.Subheader>
              	<Header.Subheader>
                      stars
                    </Header.Subheader>
                  </Header.Content>
                </Header>

              </Segment>
              <Segment>
                <Menu pointing secondary inverted color='grey'>
                  <Menu.Item name='courses' active={activeItem === 'courses'}
                     // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='questions' active={activeItem === 'questions'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='profile' active={activeItem === 'profile'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='review' active={activeItem === 'review'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Menu position='right'>
                    <Menu.Item name='none' active={activeItem === 'none'}
                      // onClick={this.handleItemClick}
                    />
                  </Menu.Menu>
                </Menu>
              </Segment>
              <Segment>
                body
                <ul>
                  <li>course list / table or card </li>
                  <li>question list</li>
                  <li>Review list</li>
                </ul>
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
            Dashboard
              <Segment>
                <Header as='h1'>
                  <Header.Content>
                    Dashboard
                  </Header.Content>
                </Header>
              </Segment>
              <Segment>
                <Menu pointing secondary  inverted color='blue'>
                  <Menu.Item name='courses' active={activeItem === 'courses'}
                     // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='questions' active={activeItem === 'questions'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='announcement' active={activeItem === 'profile'}
                    // onClick={this.handleItemClick}
                  />

                </Menu>
              </Segment>
              <Segment>
                body
                <ul>
                  <li>course list / table or card w/ internal data</li>
                  <li>question list for each course</li>
                  <li>announcement for each course</li>
                </ul>

              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
            My Course Page title + image , name small
              <Segment>

                <Header as='h1'>
                  <Image circular src={profile} />
                  <Header.Content>
                    course title
                    <Header.Subheader>
                      course sub
                    </Header.Subheader>
                  	<Header.Subheader>
                      name stars to review
                    </Header.Subheader>
                  </Header.Content>
                </Header>


              </Segment>
              <Segment>
                <Menu pointing secondary  inverted color='grey'>
                  <Menu.Item name='questions' active={activeItem === 'questions'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='curri' active={activeItem === 'profile'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='announcement' active={activeItem === 'announcement'}
                    // onClick={this.handleItemClick}
                  />
                  <Menu.Item name='info' active={activeItem === 'info'}
                    // onClick={this.handleItemClick}
                  />
                </Menu>
              </Segment>
              <Segment>
                body

                <ul>
                  <li>question list
                    <ul>
                      <li> (teacher : stateful) - questions  - q table - q row - question page - q + answer list </li>
                    </ul>
                  </li>
                  <li>curri</li>
                  <li>info</li>
                </ul>
              </Segment>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
               Course Page title + image , name
              <Segment>
                <Header as='h1'>
                  <Image circular src={profile} />
                  <Header.Content>
                    course title
                    <Header.Subheader>
                      course sub
                    </Header.Subheader>
                  	<Header.Subheader>
                      name stars
                    </Header.Subheader>
                  </Header.Content>
                </Header>

              </Segment>
              <Segment>
                body
                <ul>
                  <li>info </li>
                  <li>curri</li>
                  <li>features </li>
                  <li>gallery </li>
                </ul>

              </Segment>
            </Segment>
          </Grid.Column>


        <Grid.Column>
          <Segment>
             My course title
            <Segment>
              <Header as='h1'>
                <Header.Content>
                  My course /
                </Header.Content>
              </Header>
              <Menu pointing secondary  inverted color='blue'>
                <Menu.Item name='courses' active={activeItem === 'courses'}
                   // onClick={this.handleItemClick}
                />
                <Menu.Item name='wishlist' active={activeItem === 'wishlist'}
                  // onClick={this.handleItemClick}
                />

              </Menu>
            </Segment>
            <Segment>
              body
            </Segment>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
             Question page component for teacher page, Dashboard, 'my'course page,
            <Segment>
              body
              <ul>
                <li>child added</li>
                <li>child sort</li>
                <li>data conversion</li>
                <li>pagination</li>
                <li>loading view</li>

              </ul>
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Structure
