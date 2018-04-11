  import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {db} from '../../firebase';
import CourseCards from '../courses/CourseCards'
import { Grid, Header, Menu, Visibility, Responsive, Card, Button } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

import * as style from '../../style/inline';

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

    const {calculations, activeItem, attendingCourses} = this.state
    console.log('width', calculations.width, 'attendingCourses', attendingCourses);

    let margin;
    if (calculations.width > 1127 ) {
      margin = '3em'
    } else if (calculations.width > 933) {
      margin = '0em'
    }

      return (
        <Grid>
          <Grid.Row>
            <Grid.Column>

              <Responsive {...Responsive.onlyComputer}>
                  <Grid
                    style={style.DASHBOARD_HEAD}
                    centered>
                    <Grid.Row>
                      <Grid.Column width={12}>

                        <Header as='h1'
                          style={style.DASHBOARD_HEADER}>My Courses</Header>
                          
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  <Grid style={style.DASHBOARD_BODY} centered>
                    <Grid.Row>
                      <Grid.Column width={12}>
                        <CourseCards courses={attendingCourses}/>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Responsive>

                <Responsive minWidth={320} maxWidth={992}>
                  <Grid style={style.DASHBOARD_HEAD_M} >
                    <Grid.Row>
                      <Grid container>
                          <Grid.Column >
                            <Header as='h1'
                              style={style.DASHBOARD_HEADER_M}>My Courses</Header>
                                <CourseCards courses={attendingCourses}/>
                          </Grid.Column>
                      </Grid>
                    </Grid.Row>
                  </Grid>

                </Responsive>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
}

MyCourses.contextTypes ={
  authUser: PropTypes.object,
}

export default withRouter(MyCourses)
