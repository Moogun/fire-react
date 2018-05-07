import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, Responsive, Sidebar, Header, Confirm } from 'semantic-ui-react'
import {db} from '../../firebase';
import * as styles from '../../constants/styles'
import QuizEditTop from './QuizEditTop'
import QuizEditMeta from './QuizEditMeta'
import QuizEditQuestions from './QuizEditQuestions'

class QuizEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizId: null,
      quizSet: null,
      title: null,
      instruction: null,

      isLoading: false,

      //QUIZ EDIT QUESTION
      quiz : [],
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

    };
  }



  //META
  handleTitleInputChange = (e) => {
    console.log('[change]', e.target.name, e.target.value);
    this.setState ({ [e.target.name] : e.target.value})
  }

  handleTitleSubmit = () => {
    const { quizId, title, instruction } = this.state
    db.doSaveQuizMeta(quizId, title, instruction)
      .then(res => console.log('res', res))
      .catch(error => {
        this.setState({[error]: error});
      });
  }

  onQuestionSubmit = () => {
    console.log('111');
    const { quiz } = this.state
    console.log('[quiz]', quiz);

    db.doSaveQuizQuestions()

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
    // let quizId = '-LBOK9o22WeVJXpi07v8'
    // console.log('[quiz edit]', quizId);

    db.onceGetQuiz(quizId)
    .then(res => {
      let quizSet = res.val()
      let title = quizSet.metadata.title
      let instruction = quizSet.metadata.instruction
      this.setState ({ quizId: res.key, title: title, instruction: instruction})
    })
    .catch(error => {
      this.setState({[error]: error});
    });
  }


  render() {

    //TITLE
    const {activeItem, quizId, quizSet, title, instruction,
    isLoading } = this.state
    let quizTitle = title ? title : ''
    let quizInstruction = instruction ? instruction : ''

    //EDIT QUESTIONS
    const { quiz, questionForm, formOptions, formOptionChecked,

    groupInstructionForShort,
    titleForShort,
    answerForShort,
    explanationForShort,

    answerForMultiple,

    questionSubmit,} = this.state

    const { match } = this.props
        console.log('groupInstructionForShort', groupInstructionForShort, titleForShort, answerForShort, explanationForShort);
    return (

      <Responsive {...Responsive.onlyComputer}>
       <Segment basic
         loading={isLoading}
         style={styles.C_EDIT_BODY}>

         <Grid centered>
           <Grid.Row centered>
             <Grid.Column>

               <Grid >
                 <Grid.Column style={styles.C_EDIT_HEAD}>
                   <QuizEditTop
                     title={quizTitle}
                     instruction={quizInstruction}
                     quiz={quiz}
                   />
                 </Grid.Column>
               </Grid>

               <Grid container stackable centered>
                 <Grid.Column width={4}>
                   <Menu vertical secondary fluid style={styles.C_EDIT_MENU} >
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
                   </Menu>

                 </Grid.Column>
                 <Grid.Column width={12}>

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

                 </Grid.Column>
               </Grid>
             </Grid.Column>
           </Grid.Row>
         </Grid>

       </Segment>
     </Responsive>


    );
  }
}

export default withRouter(QuizEdit)
