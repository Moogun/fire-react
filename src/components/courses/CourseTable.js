import React, {Component} from 'react'
import CourseTableRow from './CourseTableRow'
import {withRouter} from 'react-router-dom'
import {Table, Header} from 'semantic-ui-react'

class CourseTable extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (id) {
    console.log('table',id);
    this.props.click(id)
  }
  render() {
    return (
      <div>
        {/* <Header as='h3'>Upcoming</Header> */}
          <Table basic='very' selectable>
            <Table.Body>
              {this.props.courses.map(c => <CourseTableRow key={c.id} course={c} click={() => this.handleClick(c.id, c.teacherId, c.teacherName)}/>)}
            </Table.Body>
          </Table>
      </div>
    );
  }
}
// const CourseTable = ({match, courses, click }) => {
//   console.log('c table match',match);
//   return (
//         <div>
//           <Header as='h3'>Upcoming</Header>
//             <Table basic='very' selectable>
//               <Table.Body>
//                 {/* <Link to="/"> */}
//                 {courses.map(c => <CourseTableRow key={c.id} course={c} onClick={() => click(c.id)}/>)}
//                 {/* </Link> */}
//               </Table.Body>
//             </Table>
//
//             <Header as='h3'>Current</Header>
//             <Header as='h3'>Past</Header>
//         </div>
//   )
// }
export default withRouter(CourseTable);
