import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import { Segment,Container, Table, Header, Grid, Image, Menu, Item, Button, Form, Icon, Input, Divider } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import CEditMeta from './CEditMeta'
import CEditCurri from './CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import withAuthorization from '../../HOC/withAuthorization'

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      activeItem: 'info',
    };
  }

  componentDidMount() {

    const {isLoading } = this.state
    // console.log('before 1',isLoading);
    this.setState({isLoading: !isLoading})
    // console.log('after 1',isLoading);
    const {match} = this.props

    let courseId = match.params.id
    db.onceGetCourse(match.params.id)
      .then(snapshot => {
        // console.log('sna', snapshot.val());

        db.onceGetUser(snapshot.val().teacherId)
          .then(user => {
            //console.log('user', user.val());

            let meta = user.val().courseTeaching[courseId].metadata

            this.setState ({
              courseId: courseId,
              title: snapshot.val().title,

              teacherId: snapshot.val().teacherId,
              teacherName: user.val().username,

              textbook: meta.textbook,
              date: meta.date,
              time: meta.time,
              location: meta.location,
              openCourse: meta.openCourse,
              password: meta.password,
              })

            const {isLoading } = this.state
            // console.log('before 1',isLoading);
            this.setState({isLoading: !isLoading})
            // console.log('after 1',isLoading);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }
  handlePublish = () => {
    const {courseId, teacherId} = this.state
    const {isPublished} = this.props
    db.doPublishCourse(courseId, teacherId, isPublished)
  }
  render() {

    const {activeItem, courseId, title, teacherName, teacherId, isLoading,
      textbook,
      date,
      time,
      location,
      openCourse,
      password } = this.state
    const {match} = this.props
    // console.log('isLoading in render', isLoading, 'props', this.props);

    return (
      <Segment basic loading={isLoading} >
        <Container>

          <Item.Group>
            <Item>
              <Item.Image size='tiny' src={profile} />

              <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Meta> {teacherName} 3) redirec to info </Item.Meta>
                <Item.Extra>Draft</Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>

          <Grid >
            <Grid.Row>

              <Grid.Column width={3}>
                <Menu vertical fluid>
                   <Menu.Item name='info'
                      active={activeItem === 'info'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/info`}
                      >
                      Info <Icon name='list' />
                   </Menu.Item>
                   <Menu.Item name='curri'
                      active={activeItem === 'curri'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/curriculum`}
                      >
                      Curriculum  <Icon name='book' />
                   </Menu.Item>
                   <Menu.Item name='settings'
                      active={activeItem === 'settings'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/settings`}
                      >
                      <Icon name='setting' />Settings
                   </Menu.Item>

                   <Menu.Item name='assignment'
                     disabled
                      active={activeItem === 'assignment'}
                      onClick={this.handleItemClick}
                      as={Link} to={`${match.url}/assignment`}
                      >
                      Assignment (Coming soon)
                   </Menu.Item>
                   <Menu.Item>
                      <Button primary fluid onClick={this.handlePublish}>Publish</Button>
                    </Menu.Item>
                 </Menu>

              </Grid.Column>

              <Grid.Column width={10}>

                <Route path={`${match.url}/info`} render={(props) => <CEditMeta
                  {...props}
                  courseId={courseId}
                  teacherId={teacherId}
                  textbook={textbook}
                  date={date}
                  time={time}
                  location={location}
                /> }/>
                <Route path={`${match.url}/curriculum`} render={(props) =><CEditCurri
                  {...props}
                  courseId={courseId}
                  teacherId={teacherId}
                />} />
                <Route path={`${match.url}/settings`} render={() => <CEditSettings
                  courseId={courseId}
                  teacherId={teacherId}
                  openCourse={openCourse}
                  currentPassword={password}
                />} />
                <Route path={`${match.url}/assignment`} render={() => <CEditSettings />} />
              </Grid.Column>

              <Grid.Column width={3}>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Container>

        <Container>

      <Container>
        <Item.Group>
        <Item>
          <Item.Image size='tiny' src={profile} />
          <Item.Content>
            <Item.Header as='a'>title</Item.Header>
            <Item.Meta> teacherName 3) redirec to info </Item.Meta>
            <Item.Extra>Draft</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
      </Container>

      <Container>
        <Grid celled>
          <Grid.Column width={3}>
            <Menu vertical fluid  secondary>
             <Menu.Item active> <Header>abc</Header> </Menu.Item>
             <Menu.Item> <Header>abc</Header> </Menu.Item>
             <Menu.Item> <Header>abc</Header> </Menu.Item>
             <Menu.Item> <Button color='red' fluid>Save</Button> </Menu.Item>
             </Menu>

          </Grid.Column>
          <Grid.Column width={10}>

            <Grid padded>
                <Grid.Column>
                  <Header >Menu 1st</Header>
                  <Divider />
                <Form>
                  <Form.Field required>
                     <label>First Name</label>
                     <input placeholder='First Name' />
                   </Form.Field>
                   <Form.Field>
                     <label>Last Name</label>
                     <Input placeholder='Last Name' />
                   </Form.Field>
                   <Form.Field>
                      <label>First Name</label>
                      <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <Input placeholder='Last Name' />
                    </Form.Field>
                  <Button>Save</Button>
                  </Form>
                </Grid.Column>
            </Grid>
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid>
      </Container>
</Container>
      </Segment>
    );
  }
}

export default withRouter(CourseEdit)


// secure course key 1) from create page, 2) from the url match, 3)
// 1. fetch course meta info
// 2. check teacher id
// compare ids
// const teacherId = () => db.onceGetCourse(courseKey);
//
// const authCondition = (authUser) => !!authUser
//
// export default withTeacherAuthorization(authCondition)(CourseEdit);
