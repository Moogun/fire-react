import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import PropTypes from 'prop-types';
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';
import withAuthorization from '../../HOC/withAuthorization';

import CourseCards from '../courses/CourseCards'
import CourseTeaching from './CourseTeaching'
import QPanel from './QPanel'
import Announcement from './Announcement'
import {db} from '../../firebase';
import { Grid, Header, Menu, Visibility, Responsive, Segment,} from 'semantic-ui-react'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'courses',
      courseTeaching: null,
      'selectOption': [],
      questions: '',
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

  handleDidChooseCourse = (e, {value}) => {
    // console.log('value', value);
    const { courseTeaching } = this.state
    let selectedCourseTitle = courseTeaching[value].metadata.title
    this.setState({cid: value, selectedCourseTitle: selectedCourseTitle})
    // console.log('selected course', selectedCourse);
    e.preventDefault()
  }

  handleQuestionClick = (qid) => {
    const { questions } = this.state
    console.log('teacher q click', qid);
    console.log('teacher q click',questions[qid]);
  //   this.props.history.push({
  //     pathname: `${this.props.match.url}/question/${qid}`,
  //     state:
  //       {
  //         q: questions[qid],
  //         qid: qid
  //       }
  //   })
  }

  componentDidMount() {

     const {authUser} = this.context
     const {isLoading} = this.state

     if (authUser) {
        console.log('dmt isLoading 2', isLoading);

       db.doFetchTeaching(authUser.uid)
        .then(snap => {

          console.log('dmt isLoading 3', isLoading);
          let teaching = snap.val()
          console.log('dashboard teaching', teaching);
          let selectOption=[{key: 'default', text: 'All', value: 'default'}]
          let item;
            // console.log('dashboard dmt', 3 );
            Object.keys(teaching).map(key => {
              item={key: key, text: teaching[key].metadata.title, value: key}
              selectOption.push(item)
            })
          // const {isLoading } = this.state
          console.log('dmt isLoading 4', isLoading);

          this.setState( () => ({
            courseTeaching: teaching,
            'selectOption': selectOption,
            // isLoading: !isLoading
          }))
          console.log('dashboard dmt 4', this.state.isLoading );
        })
        .catch(error => {
          this.setState({[error]: error});
        });
        console.log('dashboard dmt', 5 );
     }
  }

  componentWillUnmount(){
    console.log('dashboard will un mount 1 ', )
  }

  render() {
    const {match} = this.props
    const {activeItem, error, user, courseTeaching, selectOption, questions, cid, isLoading, selectedCourseTitle} = this.state

    // console.log('rdr dashboard props', this.props);
    // console.log('rdr dashboard courseTeaching', courseTeaching);
    const { } = this.props
      return (

        <Grid>
            <Grid.Column
              // style={{minHeight: '87vh'}}
              >

                <SectionContainer>
                    <Header as='h1' style={style.DASHBOARD_HEADER}>Dashboard</Header>

                    <Menu size='small' secondary pointing inverted
                      style={style.DASHBOARD_MENU} >
                        <Menu.Item name='courses'
                          active={activeItem === 'courses'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/courses`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                        <Menu.Item
                          name='questions'
                          active={activeItem === 'questions'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/questions`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                        <Menu.Item
                          name='announcement'
                          active={activeItem === 'announcement'}
                          onClick={this.handleItemClick}
                          as={Link} to={`${match.url}/announcement`}
                          style={style.DASHBOARD_MENU_ITEM}
                        />
                      </Menu>
                  </SectionContainer>

                  <SectionContainer_M>
                      <Header as='h3'
                        style={style.DASHBOARD_HEADER_M}
                        >Dashboard</Header>

                      <Menu size='small' secondary pointing inverted
                        style={style.DASHBOARD_MENU_M}
                         >
                          <Menu.Item name='courses'
                            active={activeItem === 'courses'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/courses`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                          <Menu.Item
                            name='questions'
                            active={activeItem === 'questions'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/questions`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                          <Menu.Item
                            name='announcement'
                            active={activeItem === 'announcement'}
                            onClick={this.handleItemClick}
                            as={Link} to={`${match.url}/announcement`}
                            style={style.DASHBOARD_MENU_ITEM}
                          />
                        </Menu>
                    </SectionContainer_M>


                    <Grid style={style.DASHBOARD_BODY}>
                        <Grid.Column>
                            <Switch>
                              <Redirect exact from={match.url} to={routes.DASHBOARD_COURSES} />
                              <Route path={routes.DASHBOARD_COURSES} render = {(props) =>
                                <CourseTeaching {...props}
                                  courses={courseTeaching}
                                  click={this.handleCourseClick}
                                  loading={isLoading}
                                />
                                } />
                              <Route path={routes.DASHBOARD_Q_PANEL} render = {() => <QPanel
                                options={selectOption}
                                questions={questions}
                                didChooseCourse={this.handleDidChooseCourse}
                                selectedCourse={cid}
                                selectedCourseTitle={selectedCourseTitle}
                                queClick={this.handleQuestionClick}
                                loading={isLoading}
                               />} />
                               <Route path={routes.DASHBOARD_AN} render = {() => <Announcement
                                />} />
                            </Switch>
                            {/* <Dimmer active={isLoading} >
                              <Loader size='massive' >Loading</Loader>
                            </Dimmer> */}
                        </Grid.Column>
                    </Grid>

            </Grid.Column>
        </Grid>

      );
    }
}

Dashboard.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Dashboard);
