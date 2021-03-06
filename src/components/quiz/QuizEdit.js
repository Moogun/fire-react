import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, Responsive, Sidebar, Header, Confirm, Visibility } from 'semantic-ui-react'
import {db} from '../../firebase';
import * as routes from '../../constants/routes'
import * as styles from '../../constants/styles'
import QuizEditTop from './QuizEditTop'
import QuizEditMeta from './QuizEditMeta'
import QuizEditQuestions from './QuizEditQuestions'

class QuizEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizId: null,
      title: null,
      instruction: null,

      isLoading: false,

      //QUIZ EDIT QUESTION
      quiz : null,
      questionsForm: '',

      groupInstructionForShort: '',
      titleForShort: '',
      answerForShort: '',
      explanationForShort: '',

      groupQInstructionForMultiple: '',
      titleForMultiple: '',
      answerForMultiple: '',
      explanationForMultiple: '',
      formOptions: ['a','b','c','d'],
      formOptionChecked: '',
      // options: [{a: 'option 1'},{b: 'option 2'},{c: 'option 3'},{d: 'option d'},],
      // optionCount: ['a','b','c','d'],

      groupQInstructionForEssay: '',
      titleForEssay: '',
      answerForEssay: '',
      explanationForEssay: '',

      edit:null,

      // entry will look like this
      // entry: {uid: {'id 1': '1'}, {'id 2': '1'}, {'id 3': 'a'},}
      deleteConfirmOpen: false,

      activeItem: 'title',
      calculations: {
        width: 0,
      },

    };
  }

  handleContextRef = contextRef => this.setState({ contextRef })
  handleUpdate = (e, { calculations }) => this.setState({ calculations })

  //MENU
  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

  //META
  handleTitleInputChange = (e) => {
    console.log('[change]', e.target.name, e.target.value);
    this.setState ({ [e.target.name] : e.target.value})
  }

  handleTitleSubmit = () => {
    const { tid, quizId, title, instruction } = this.state
    console.log('[t submit]', tid, quizId, title, instruction);
    db.doUpdateQuizMeta(tid, quizId, title, instruction)
      .then(res => console.log('res', res))
      .catch(error => {
        this.setState({[error]: error});
      });
  }

  onQuestionSubmit = () => {
    const { tid, quizId, quiz } = this.state
    console.log('[quiz edit] length', quiz.length);
    db.doSaveQuizQuestions(tid, quizId, quiz)
      .then(res => console.log('[save quiz  q res]', res.val()))
      .catch(error => {
        this.setState({[error]: error});
      });
  }


  //EDIT QUESTION

  handleChange = (e, index) => {
    e.preventDefault()
    const { quiz } = this.state
    let name = e.target.name
    let value = e.target.value

    quiz[index][name] = value
    this.setState ({ quiz })
  }

  handleQuestionDelete = (e, index) => {
    e.preventDefault()
    console.log('index', index);
    const { quiz } = this.state
    let removed = quiz.splice(index, 1)
    // console.log('removed', removed, );
    this.setState ({ quiz: quiz })
  }

  // question methods
  handleQuestionToggle = (e, index) => {
    const { quiz } = this.state
    // let question = quiz[index].isExpanded
    console.log('quiz 0 index', index, quiz[index].isExpanded);
    quiz[index].isExpanded = !quiz[index].isExpanded
    // question.isExpanded = !question.isExpanded
    // let quizUpdated =
    console.log('quiz index', index, quiz[index].isExpanded);
    this.setState ({ quiz})
  }

  // btn methods
  handleOpenShortAnswerForm = () => this.setState ({ questionForm: 'shortAnswer', })
  handleOpenMultipleChoiceForm = () => this.setState ({ questionForm: 'multipleChoice'})
  handleOpenEssayForm = () => this.setState ({ questionForm: 'essay'})

  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value })

  handleAddShortAnswer = () => {
    const { quiz,
      groupInstructionForShort, titleForShort, answerForShort, explanationForShort,
     } = this.state

    let newQuestion = {
      id: '',
      type: 'shortAnswer',
      instruction: groupInstructionForShort,
      title: titleForShort,
      options: [],
      answer: [answerForShort],
      explanation: [explanationForShort],
      entry:[],
      isExpanded : true,
      }

    this.setState ({ quiz: [...quiz, newQuestion], groupInstructionForShort: '', titleForShort: '', answerForShort: '', explanationForShort: '', })
    console.log('quiz', this.state.quiz);
  }

  handleAddOption = (e, index) => {
    e.preventDefault()
    const { quiz, titleForMultiple, answerForMultiple, explanationForMultiple, formOptions } = this.state
    formOptions.push('n')
    this.setState ({ formOptions })
  }

  handleAddMultipleChoice = () => {
    const { quiz, titleForMultiple, answerForMultiple, explanationForMultiple, formOptions, formOptionChecked } = this.state

    let newQuestion = {
      id: '',
      type: 'multipleChoice',
      title: titleForMultiple,
      options: formOptions,
      answer: answerForMultiple,
      explanation: [explanationForMultiple],
      entry:[],
      isExpanded : true,
      }
    console.log('quiz', quiz);
    this.setState ({ quiz: [...quiz, newQuestion], titleForMultiple: '', answerForMultiple: '', explanationForMultiple: '', })
  }


  handleAddEssay = () => {
    const { quiz,
      titleForEssay, answerForEssay, explanationForEssay,
     } = this.state

    let newQuestion = {
      id: '',
      type: 'essay',
      title: titleForEssay,
      options: [],
      answer: [],
      explanation: [explanationForEssay],
      entry:[],
      isExpanded : true,
      }

    this.setState ({ quiz: [...quiz, newQuestion], titleForEssay: '', explanationForEssay: '', })
  }

  handleOptionRadioChange = (e, index, opIndex) => {
    console.log('value', e.target.value, e.target.name, index, opIndex);
    const { quiz } = this.state
    let optionValue = quiz[index].options[opIndex]
    console.log('optionValue', optionValue);
    quiz[index].answer = optionValue
    quiz[index].optionChecked = opIndex
    this.setState({ quiz: quiz })
  }

  handleOptionLabelChange = (e, index, opIndex) => {
    console.log('value', e.target.value, e.target.name, index);
    const { quiz } = this.state
    quiz[index].options[opIndex] = e.target.value
    this.setState({ quiz: quiz })
    //this method should be changed to save answer to multiple choice question
  }

  handleMultipleFormRadioChange = (e, index) => {
    console.log('value', e.target.value, e.target.name, index);
    // const { quiz } = this.state
    // let optionValue = quiz[index].options[opIndex]
    // console.log('optionValue', optionValue);
    // quiz[index].answer = optionValue
    // quiz[index].optionChecked = opIndex
    // this.setState({ quiz: quiz })
  }

  handleMultipleFormOptionLabelChange = (e, index) => {
    console.log('value', e.target.value, e.target.name, index);
    // const { quiz } = this.state
    // quiz[index].options[opIndex] = e.target.value
    // this.setState({ quiz: quiz })
    // //this method should be changed to save answer to multiple choice question
  }


  componentDidMount() {
    this.getQuiz()
  }

  getQuiz () {
    // const {isLoading } = this.state
    const {match} = this.props
    // this.setState({isLoading: !isLoading})

    let quizId = match.params.quizId
    console.log('quizId', match, quizId);

    db.onceGetQuiz(quizId)
    .then(res => {
      let quizSet = res.val()
      let tid = quizSet.metadata.tid
      let title = quizSet.metadata.title
      let instruction = quizSet.metadata.instruction
      let questions = quizSet.questions ? quizSet.questions : []
      this.setState ({ quizId: res.key, tid: tid, title: title, instruction: instruction,
        quiz: questions
      })
    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }

  handleDeleteQuiz = () => {
    console.log('delete');
    this.setState ({ deleteConfirmOpen: true})
  }

  handleCancelDeleteQuiz = () => {
    this.setState ({ deleteConfirmOpen: false})
  }

  handleConfirmDeleteQuiz = () => {
    const {tid, quizId,} = this.state
    db.doDeleteQuiz(tid, quizId, )
      .then(res => {
        this.setState ({ deleteConfirmOpen: false})
        const {history} = this.props;
        console.log('history', history);
        history.replace({
          pathname: '/teaching/dashboard/',

        })
      })
      .catch(error => {
        this.setState({[error]: error});
      });
  }

  render() {
    const { calculations, contextRef } = this.state
    let mobile = calculations.width < 768 ? true : false

    //TITLE
    const {activeItem, quizId, quizSet, title, instruction, quiz,
    isLoading } = this.state
    let quizTitle = title ? title : ''
    let quizInstruction = instruction ? instruction : ''
    let questionList = quiz ? quiz : []

    //EDIT QUESTIONS
    const { questionForm, formOptions, formOptionChecked,

    groupInstructionForShort,
    titleForShort,
    answerForShort,
    explanationForShort,

    answerForMultiple,

    questionSubmit,

    deleteConfirmOpen,
  } = this.state

    console.log('[quiz edit]', quiz);
    const { match } = this.props
        // console.log('groupInstructionForShort', groupInstructionForShort, titleForShort, answerForShort, explanationForShort);
    return (
      <div style={styles.C_EDIT_BODY} ref={this.handleContextRef}>
       {/* <Segment basic
         loading={isLoading}
         styles={styles.C_EDIT_BODY}>

           <Grid.Row className='c-edit-head'> */}
          <Visibility onUpdate={this.handleUpdate}>
            <Segment vertical className='c-edit-head' style={styles.C_EDIT_HEAD}>
                 <QuizEditTop
                   title={quizTitle}
                   instruction={quizInstruction}
                   quiz={questionList}
                 />
            </Segment>
          </Visibility>
          <Segment vertical>

               <Grid container stackable centered>
                 <Grid.Column computer={3}>
                   <Menu vertical={!mobile ? true : false} fluid style={styles.C_EDIT_MENU}>
                     <Menu.Item name='title'
                        active={activeItem === 'title'}
                        onClick={this.handleItemClick}
                        as={Link} to={`${match.url}/title`}
                        style={activeItem === 'title' ? styles.C_EDIT_MENU_ITEM: null}
                        >Title
                     </Menu.Item>
                      <Menu.Item name='questions'
                         active={activeItem === 'questions'}
                         onClick={this.handleItemClick}
                         as={Link} to={`${match.url}/questions`}
                         style={activeItem === 'questions' ? styles.C_EDIT_MENU_ITEM: null}
                         >Questions
                      </Menu.Item>
                      <Menu.Item name='delete'
                         active={activeItem === 'delete'}
                         onClick={this.handleDeleteQuiz}
                         as='a'
                         style={activeItem === 'delete' ? styles.C_EDIT_MENU_ITEM: null}
                         >Delete
                      </Menu.Item>
                   </Menu>

                 </Grid.Column>
                 <Grid.Column computer={13}>
                   <Switch>
                     <Redirect exact from={match.url} to={`${match.url}/questions`} />
                     <Route path={`${match.url}/title`} render={(props) => <QuizEditMeta
                       {...props}
                       title={title}
                       instruction={instruction}
                       quiz={quiz}
                       change={this.handleTitleInputChange}
                       submit={this.handleTitleSubmit}
                     /> }/>
                     <Route path={`${match.url}/questions`} render={(props) => <QuizEditQuestions
                       {...props}
                       quiz={quiz}
                       questionForm={questionForm}
                       formOptions={formOptions}
                       formOptionChecked={formOptionChecked}

                       groupInstructionForShort={groupInstructionForShort}
                       titleForShort={titleForShort}
                       answerForShort={answerForShort}
                       explanationForShort={explanationForShort}

                       answerForMultiple={answerForMultiple}

                       handleChange={this.handleChange}
                       handleQuestionDelete={this.handleQuestionDelete}
                       handleQuestionToggle={this.handleQuestionToggle}

                       handleOpenShortAnswerForm={this.handleOpenShortAnswerForm}
                       handleOpenMultipleChoiceForm={this.handleOpenMultipleChoiceForm}
                       handleOpenEssayForm={this.handleOpenEssayForm}

                       handleInputChange={this.handleInputChange}
                       handleAddShortAnswer={this.handleAddShortAnswer}
                       handleAddOption={this.handleAddOption}
                       handleAddMultipleChoice={this.handleAddMultipleChoice}
                       handleAddEssay={this.handleAddEssay}
                       handleOptionRadioChange={this.handleOptionRadioChange}
                       handleOptionLabelChange={this.handleOptionLabelChange}
                       handleMultipleFormRadioChange={this.handleMultipleFormRadioChange}
                       handleMultipleFormOptionLabelChange={this.handleMultipleFormOptionLabelChange}

                       questionSubmit={this.onQuestionSubmit}

                     /> }/>
                   </Switch>
                 </Grid.Column>
               </Grid>

         </Segment>
         <Confirm
            open={deleteConfirmOpen}
            content='This will delete the quiz. Are you sure to delete the quiz ?'
            onCancel={this.handleCancelDeleteQuiz}
            onConfirm={this.handleConfirmDeleteQuiz}
          />
    </div>

    );
  }
}

export default withRouter(QuizEdit)
