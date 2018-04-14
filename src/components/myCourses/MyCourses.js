  import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import * as routes from '../../constants/routes';
import * as style from '../../style/inline';
import withAuthorization from '../../HOC/withAuthorization';

import MyCourseCards from '../courses/MyCourseCards'
import { Grid, Header, Menu, Visibility, Responsive, Card, Button } from 'semantic-ui-react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import SectionContainer from '../navbar/SectionContainer'
import SectionContainer_M from '../navbar/SectionContainer_M'


class MyCourses extends Component {

    state = {
      activeItem : 'courses',
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
      isLoading: false,
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  handleUpdate = (e, { calculations }) => this.setState({ calculations })

  componentDidMount(){
    console.log('my courses did mount 1 ', )
    const {authUser} = this.context
    console.log('authUser', authUser);
    if (authUser) {

      let myCourses = []
      db.onceGetMyCourses(authUser.uid)
        .then(snap => {
          // console.log('db getting my courses snap', snap.val());
          let courseObj = {}

          if (snap.val()) {
            let aList = Object.keys(snap.val())
            aList.forEach(cid => {
              // console.log('db getting my courses cid', cid);
              db.onceGetCourse(cid)
                .then(res => {
                  courseObj[cid] = res.val()
                  this.setState ({ attendingCourses: courseObj})
                })
                .catch(error => {
                  this.setState({[error]: error});
                });
            })
          }
        })
        .catch(error => {
          this.setState({[error]: error});
        });
    }
  }

  handleQuestion = () => {
    const { history } = this.props
    console.log('my courses match', this.props);
    history.push({pathname: 'teacher/moo6/questions'})
  }

  render() {
    const {match} = this.props
    const {calculations, activeItem, user, attendingCourses, isLoading} = this.state
    console.log('width', calculations.width, 'attendingCourses', attendingCourses);

    return (
      <Grid>
          <Grid.Column>

            <SectionContainer>
                <Header as='h1' style={style.DASHBOARD_HEADER}>My Courses</Header>
                <Menu size='small' secondary pointing inverted
                  style={style.DASHBOARD_MENU} >
                    <Menu.Item name='courses'
                      active={activeItem === 'courses'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/courses`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                    <Menu.Item
                      name='wishlist'
                      active={activeItem === 'wishlist'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/wishlist`}
                      style={style.DASHBOARD_MENU_ITEM}
                    />
                  </Menu>
            </SectionContainer>

            <SectionContainer_M>
              <Header as='h3' style={style.DASHBOARD_HEADER_M}>My Courses</Header>
              <Menu size='small' secondary pointing inverted
                style={style.DASHBOARD_MENU} >
                  <Menu.Item name='courses'
                    active={activeItem === 'courses'}
                    onClick={this.handleItemClick}
                    as={Link} to={`${match.url}/courses`}
                    style={style.DASHBOARD_MENU_ITEM}
                  />
                  <Menu.Item
                    name='wishlist'
                    active={activeItem === 'wishlist'}
                    onClick={this.handleItemClick}
                    as={Link} to={`${match.url}/wishlist`}
                    style={style.DASHBOARD_MENU_ITEM}
                  />
                </Menu>
            </SectionContainer_M>

            <Grid style={style.DASHBOARD_BODY}>
                <Grid.Column>
                  <MyCourseCards courses={attendingCourses} loading={isLoading}/>
                  {/* <Switch> */}
                    {/* <Redirect exact from={match.url} to={routes.LEARNING_MY_COURSES} />
                    <Route path={routes.LEARNING_MY_COURSES} render = {(props) =>
                      // <MyCourseCards {...props}
                        courses={attendingCourses}
                      />
                      } /> */}

                  {/* </Switch> */}

                </Grid.Column>
            </Grid>

          </Grid.Column>
      </Grid>
    );
  }
}

MyCourses.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(MyCourses);
