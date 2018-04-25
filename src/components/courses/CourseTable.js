import React, {Component} from 'react'
import CourseTableRow from './CourseTableRow'
import {Table, Header} from 'semantic-ui-react'

class CourseTable extends Component {

  handleClick = (id, tName, cTitle, ) => {
    // console.log('table id',id, tName)
    this.props.click(id, tName, cTitle)
  }

  render() {

    const {cTeaching, tName, click,} = this.props
    // console.log('course table render 1 ', cTeaching)

    return (
      <div>
        {/* <Header as='h3'>Upcoming</Header> */}
          <Table basic='very' selectable attached celled textAlign='center'>
            <Table.Body>
              {Object.keys(cTeaching).map(id =>
                <CourseTableRow key={id} course={cTeaching[id]}
                  // cTitle={cTeaching[id].metadata.title}
                  click={() => this.handleClick(id, tName, cTeaching[id].metadata.title)}
                />
              )}
            </Table.Body>
          </Table>
      </div>
    );
  }
}

export default CourseTable;
