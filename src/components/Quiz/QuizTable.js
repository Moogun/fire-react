import React, {Component} from 'react'
import QuizTableRow from './QuizTableRow'
import {Table, Header} from 'semantic-ui-react'

class QuizTable extends Component {

  // handleClick = (id, tName, cTitle, ) => {
  //   // console.log('table id',id, tName)
  //   this.props.click(id, tName, cTitle)
  // }
  state = {
    quiz: {
      1:{'title': 'abc', },
      2:{'title': 'bbc', },
      3:{'title': 'cbc', },
    }
  }
  render() {

    // const {cTeaching, tName, click,} = this.props
    // console.log('course table render 1 ', cTeaching)
    const { quiz } = this.state
    return (
      <div>
        {/* <Header as='h3'>Upcoming</Header> */}
          <Table basic='very' selectable attached celled textAlign='center'>
            <Table.Body>
              {Object.keys(quiz).map(id =>
                <QuizTableRow key={id} quiz={quiz[id]}
                  // cTitle={cTeaching[id].metadata.title}
                  // click={() => this.handleClick(id, tName, cTeaching[id].metadata.title)}
                />
              )}
            </Table.Body>
          </Table>
      </div>
    );
  }
}

export default QuizTable;
