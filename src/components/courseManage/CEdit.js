import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {Link, Route, withRouter} from 'react-router-dom'
import { Segment,Container, Table, Header, Grid, Image, Menu, Item, Button, Form, Icon, Input } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import CEditMeta from './CEditMeta'
import CEditCurri from './CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import withAuthorization from '../../HOC/withAuthorization'
import withTeacherAuthorization from '../../HOC/withTeacherAuthorization'
withTeacherAuthorization
// class CourseEdit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeItem: 'info',
//     };
//   }
//   handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }
//
//   render() {
//     const {activeItem} = this.state
//     const {match} = this.props
//     console.log('c edit match', match);
//
//     return (
//       <Segment>
//         <Container>
//
//           <Item.Group>
//             <Item>
//               <Item.Image size='tiny' src={profile} />
//
//               <Item.Content>
//                 <Item.Header as='a'>Header</Item.Header>
//                 <Item.Meta> 1) title, 2) teacher name, loading 3) redirec to info </Item.Meta>
//                 <Item.Extra>Draft</Item.Extra>
//               </Item.Content>
//             </Item>
//           </Item.Group>
//
//           <Grid >
//             <Grid.Row>
//
//               <Grid.Column width={4}>
//                 <Menu vertical fluid>
//                    <Menu.Item name='info'
//                       active={activeItem === 'info'}
//                       onClick={this.handleItemClick}
//                       as={Link} to={`${match.url}/info`}
//                       >
//                       Info <Icon name='list' />
//                    </Menu.Item>
//                    <Menu.Item name='curri'
//                       active={activeItem === 'curri'}
//                       onClick={this.handleItemClick}
//                       as={Link} to={`${match.url}/curriculum`}
//                       >
//                       Curriculum  <Icon name='book' />
//                    </Menu.Item>
//                    <Menu.Item name='settings'
//                       active={activeItem === 'settings'}
//                       onClick={this.handleItemClick}
//                       as={Link} to={`${match.url}/settings`}
//                       >
//                       <Icon name='setting' />Settings
//                    </Menu.Item>
//
//                    <Menu.Item name='assignment'
//                      disabled
//                       active={activeItem === 'assignment'}
//                       onClick={this.handleItemClick}
//                       as={Link} to={`${match.url}/assignment`}
//                       >
//                       Assignment (Coming soon)
//                    </Menu.Item>
//                    <Menu.Item>
//                       <Button primary fluid>Publish</Button>
//                     </Menu.Item>
//                  </Menu>
//
//               </Grid.Column>
//
//               <Grid.Column width={8}>
//                 <Route path={`${match.url}/info`} component={CEditMeta} />
//                 <Route path={`${match.url}/curriculum`} component={CEditCurri} />
//                 <Route path={`${match.url}/settings`} component={CEditSettings} />
//                 <Route path={`${match.url}/assignment`} component={CEditSettings} />
//                 {/* <Route path='/teacher/questions' component={(props) => <Questions click={this.handleNewQ}/>} /> */}
//               </Grid.Column>
//
//               <Grid.Column width={4}>
//
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//
//         </Container>
//       </Segment>
//     );
//   }
// }
//
// export default withRouter(CourseEdit)

const CourseEdit = (props, {authUser}) => {
  console.log('c edit', props);
  return (
    <div>
      <h1>CourseEdit </h1>
      {/* <p>{authUser.email}</p> */}
      <ul>
        <li>oAuth displayname ...</li>
      </ul>
    </div>
  )
}

CourseEdit.contextTypes ={
  authUser: PropTypes.object,
}

export default CourseEdit
// const authCondition = (authUser) => !!authUser;

// secure course key 1) from create page, 2) from the url match, 3)
// 1. fetch course meta info
// 2. check teacher id
// compare ids
// const teacherId = () => db.onceGetCourse(courseKey);
//
// const authCondition = (authUser) => !!authUser
//
// export default withTeacherAuthorization(authCondition)(CourseEdit);
