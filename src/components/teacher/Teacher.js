import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Header, Icon, Menu, Image,} from 'semantic-ui-react'
import {Link, Route, withRouter} from 'react-router-dom'
import Courses from './Courses'
import Questions from './Questions'
import NewQ from '../questions/NewQ'

class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const {coursesTeaching} = this.state
    const {match} = this.props
    // console.log('tea props',this.props);
    const { activeItem } = this.state

    return (
      <div>
        <Segment basic inverted color='blue'>
          <Container>
            <Header
              as='h1'
              content='Teacher Name'
              // inverted
              style={{
                // fontSize: mobile ? '2em' : '3em',
                fontWeight: 'normal',
                color: 'white',
                // marginBottom: mobile ? '1.5em' : '1.5em',
                // marginTop: mobile ? '1.5em' : '1em',
                marginTop: '2em',
              }}
              // color='yellow'
            />
            <Menu pointing secondary size='large' inverted text
            >
              <Container>
                <Menu.Item
                  name='courses'
                  active={activeItem === 'courses'}
                  onClick={this.handleItemClick}
                  as={Link} to={`${match.url}/courses`}>Courses</Menu.Item>
                <Menu.Item
                  name='questions'
                  active={activeItem === 'questions'}
                  onClick={this.handleItemClick}
                  as={Link} to={`${match.url}/questions`}>Questions</Menu.Item>
                <Menu.Item
                  name='story'
                  active={activeItem === 'story'}
                  onClick={this.handleItemClick}
                  as={Link} to={`${match.url}/story`}>Story</Menu.Item>
              </Container>
            </Menu>

          </Container>

      </Segment>
      <Segment basic>
        <Container>
          <Route path='/teacher/courses' component={Courses} />
          <Route path='/teacher/questions' component={(props) => <Questions click={this.handleNewQ} {...props}/>} />
          <Route path='/teacher/newq' component={NewQ} />
        </Container>
      </Segment>
    </div>
    );
  }
}

export default withRouter(Teacher)
