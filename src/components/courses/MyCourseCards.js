import React, {Component} from 'react';
import { Segment, Container, Grid, Header, Responsive, Loader, Item, Label, Card, } from 'semantic-ui-react'
import CourseCard from './CourseCard'
import Teacher from '../teacher/Teacher'
import {Route, withRouter } from 'react-router-dom'
import * as style from '../../style/inline';
import profile from '../../assets/profile-lg.png'

class MyCourseCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null,
    };
  }

  handleClick = (courseId, teacherId, title, tName) => {
    console.log('my course cards handle click');
    const { history, } = this.props;
    var titleDashed = title.replace(/\s+/g, '-')
    history.push({
      pathname: '/my' + '/' + tName + '/' + titleDashed
    })
    //event.preventDefault();
  }

  render() {
    // const {courses} = this.state
    const { courses, loading, mobile} = this.props

    let courseList = courses ?
        <div style={{ margin: !mobile ? '2rem' : '1rem'}}>
          {mobile
            ? (<Item.Group divided unstackable> { Object.keys(courses).map(key =>
                  <Item as='a' key={key} style={{fontSize: '0.8rem'}} onClick={() => this.handleClick(key,
                  courses[key].metadata.tid,
                  courses[key].metadata.title,
                  courses[key].metadata.tName)}>
                    <Item.Image size='tiny' src={courses[key].metadata.tProfileImg ? courses[key].metadata.tProfileImg : profile} />
                    <Item.Content>
                      <Item.Header>{courses[key].metadata.title}</Item.Header>
                      <Item.Meta>{courses[key].metadata.subTitle}</Item.Meta>
                      <Item.Description>{courses[key].metadata.tName}</Item.Description>
                      <Item.Extra>
                        <Label.Group >
                          <Label basic icon='users' content={courses[key].metadata.attendeeCount} />
                          <Label basic icon='comment' content={courses[key].metadata.questionCount} />
                          <Label basic icon='star' content={courses[key].metadata.questionCount} />
                        </Label.Group>
                      </Item.Extra>
                    </Item.Content>
                  </Item> )}
                  </Item.Group>
                )
            : (
              <Grid container textAlign='left' stackable doubling >
                <Grid.Row>
                  <Grid.Column>
                  <Card.Group itemsPerRow={4} doubling>
                  {Object.keys(courses).map(key =>
                    // <Grid.Column key={key} mobile={16} tablet={8} computer={4}>
                      <CourseCard
                        key={key}
                        course={courses[key]}
                        click={() => this.handleClick( key,
                        courses[key].metadata.tid,
                        courses[key].metadata.title,
                        courses[key].metadata.tName)}
                       />
                        // </Grid.Column>
                      )}
                    </Card.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>)
            }
        </div>
      : <Loader active inline='centered' />

    return (
      <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
        {courseList}
      </Segment>

    );
  }
}

export default withRouter(MyCourseCards)
