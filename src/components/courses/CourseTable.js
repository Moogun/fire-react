import React, {Component} from 'react'
import CourseTableRow from './CourseTableRow'
import {Table, Header} from 'semantic-ui-react'

class CourseTable extends Component {

  handleClick = (id, tName, cTitle, ) => {
    // console.log('table id',id, tName)
    this.props.click(id, tName, cTitle)
  }

  render() {

    const {coursesTeaching, tName, click,} = this.props
    console.log('course table render 1 ', coursesTeaching)

    return (
      <div>
        {/* <Header as='h3'>Upcoming</Header> */}
          <Table basic='very' selectable>
            <Table.Body>
              {Object.keys(coursesTeaching).map(id =>
                <CourseTableRow key={id} course={coursesTeaching[id]}
                  // cTitle={coursesTeaching[id].metadata.title}
                  click={() => this.handleClick(id, tName, coursesTeaching[id].metadata.title)}
                />
              )}
            </Table.Body>
          </Table>
      </div>
    );
  }
}

export default CourseTable;
