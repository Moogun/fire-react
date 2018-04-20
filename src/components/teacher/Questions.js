import React, {Component} from 'react'
import QSearch from '../questions/QSearch'
import QuestionTable from '../questions/QuestionTable'
import profile from '../../assets/profile-lg.png'
import { Segment} from 'semantic-ui-react'
import * as style from '../../style/inline';

class Questions extends Component {

  handleNewQ = () => {
    this.props.click()
  }

  handleQuestionClick = (qid) => {
    this.props.queClick(qid)
  }

  handleSearchQueryChange = (e) => {
    // console.log(e.target.value);
    this.props.searchQueryChange(e.target.value)
    e.preventDefault()
  }

  render() {
    const {tid, questions, searchClick, isLoading, loadMore, lastPage} = this.props
    console.log('Questions render 1 ', questions, isLoading, lastPage)

    let qTable = questions ? <QuestionTable
      tid={tid}
      questions={questions}
      click={this.handleQuestionClick}
      loadMore={loadMore}
      isLoading={isLoading}
      lastPage={lastPage}/>
     : <Segment basic textAlign='center'>
         No question yet. Ask any question!
      </Segment>
    return (
        <Segment basic style={style.SEGMENT_LOADER}>
          <QSearch
            tid={tid}
            click={() => this.props.click()} change={this.handleSearchQueryChange}
            searchClick={this.handleSearchClick}
            isLoading={isLoading}/>

            {qTable}
        </Segment>
    );
  }
}

export default Questions;
