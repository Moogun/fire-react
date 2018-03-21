import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Header, Icon, Menu, Image, Grid, Breadcrumb, Rating} from 'semantic-ui-react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import Courses from './Courses'
import Questions from './Questions'
import NewQ from '../questions/NewQ'
import profile from '../../assets/profile-lg.png'

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      teacherId: 1,
      courseTeaching: [1,2,3],
      questionsAsked: [],
      answersGiving: [],
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleNewQ = () => {
    this.props.history.push(`${this.props.match.url}/newq`)
  }

  componentDidMount() {
    // console.log(this.props.location.state.teacherId);

  }

  render() {
    const {coursesTeaching} = this.state
    const {match} = this.props
    // console.log('tea props',this.props);
    const { activeItem, teacherId } = this.state

    return (
      <Grid>
        <Grid.Row>
            <Grid.Column>

              <Container>

                <Breadcrumb style={{marginTop: '2em' }}>
                   <Breadcrumb.Section link> <Link to='/'>Home </Link></Breadcrumb.Section>
                   <Breadcrumb.Divider icon='right angle' />
                   <Breadcrumb.Section><Link to='/teacher/456'>Teacher name</Link></Breadcrumb.Section>
                 </Breadcrumb>

                <Grid style={{margin: '3em'}} stackable>
                  <Grid.Row>
                    <Grid.Column width={12}>

                      <Segment basic style={{margin: '3em' }} >
                        <Header as='h1'
                          // style={{color: '#fff'}}
                          content='Teacher name'
                          subheader='Profile' />
                          <Rating icon='star' defaultRating={5} maxRating={4} />
                          <p> '000 reviews' </p>
                      </Segment>
                    </Grid.Column>

                    <Grid.Column width={3} textAlign='center'>
                      <Image src={profile} circular centered/>
                    </Grid.Column>
                    <Grid.Column width={1}>
                    </Grid.Column>

                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>
                      <Segment basic>
                        <Menu size='large'>
                          <Container>
                            <Menu.Item
                               name='course'
                               active={activeItem === 'course'}
                               onClick={this.handleItemClick}
                               as={Link} to={`${match.url}/course`}>Courses</Menu.Item>
                             <Menu.Item
                               name='question'
                               active={activeItem === 'question'}
                               onClick={this.handleItemClick}
                               as={Link} to={`${match.url}/question`}>Questions</Menu.Item>
                             <Menu.Item
                               name='story'
                               active={activeItem === 'story'}
                               onClick={this.handleItemClick}
                               as={Link} to={`${match.url}/story`}>Story</Menu.Item>
                             <Menu.Item
                               name='review'
                               active={activeItem === 'review'}
                               onClick={this.handleItemClick}
                               as={Link} to={`${match.url}/story`}>Review</Menu.Item>
                             </Container>
                           </Menu>
                          </Segment>
                       </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column>

                      <Switch>
                        <Redirect exact from={match.url} to={`${match.url}/course`} />
                        <Route path={`${match.url}`} component={Teacher} />
                        <Route path={`${match.url}/course`} component={Courses} />
                        <Route path={`${match.url}/question`}
                            render={ (props) =>  <Questions click={this.handleNewQ} {...props}/>} />
                        <Route path='/teacher/newq' component={NewQ} />
                      </Switch>

                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>

            </Grid.Column>
        </Grid.Row>
      </Grid>
    //         <Header
    //           as='h1'
    //           content='Teacher Name'
    //           // inverted
    //           style={{
    //             // fontSize: mobile ? '2em' : '3em',
    //             fontWeight: 'normal',
    //             // color: 'white',
    //             // marginBottom: mobile ? '1.5em' : '1.5em',
    //             // marginTop: mobile ? '1.5em' : '1em',
    //             marginTop: '2em',
    //           }}
    //           // color='yellow'
    //         />

    );
  }
}

export default withRouter(Teacher)
