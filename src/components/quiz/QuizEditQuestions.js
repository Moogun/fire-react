import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import { Container, Segment, Button, Icon, Header, Modal, Form, Radio } from 'semantic-ui-react'
import * as styles from '../../constants/styles'

class QuizEditQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // quiz : [],
      // questionsForm: '',
      //
      // groupInstructionForShort: '',
      // titleForShort: '',
      // answerForShort: '',
      // explanationForShort: '',
      //
      // groupQInstructionForMultiple: '',
      // titleForMultiple: '',
      // answerForMultiple: '',
      // explanationForMultiple: '',
      // formOptions: ['a','b','c','d'],
      // formOptionChecked: '',
      // // options: [{a: 'option 1'},{b: 'option 2'},{c: 'option 3'},{d: 'option d'},],
      // // optionCount: ['a','b','c','d'],
      //
      // groupQInstructionForEssay: '',
      // titleForEssay: '',
      // answerForEssay: '',
      // explanationForEssay: '',
      //
      // edit:null,
      //
      // // entry will look like this
      // // entry: {uid: {'id 1': '1'}, {'id 2': '1'}, {'id 3': 'a'},}
    };
  }




  render() {
    const { quiz, questions, questionForm, formOptions, formOptionChecked, answerForMultiple,
    groupInstructionForShort, titleForShort, answerForShort, explanationForShort,
    questionSubmit,

    handleChange,
    handleQuestionDelete,
    handleQuestionToggle,
    handleOpenShortAnswerForm,
    handleOpenMultipleChoiceForm,
    handleOpenEssayForm,
    handleInputChange,
    handleAddShortAnswer,
    handleAddOption,
    handleAddMultipleChoice,
    handleAddEssay,
    handleOptionRadioChange,
    handleOptionLabelChange,
    handleMultipleFormRadioChange,
    handleMultipleFormOptionLabelChange,
  } = this.props

    console.log('render options', formOptions, formOptionChecked, answerForMultiple, quiz);

    let qForm = QuestionFormType(
      groupInstructionForShort, titleForShort, answerForShort, explanationForShort,
      handleAddShortAnswer, handleAddMultipleChoice, handleAddOption, handleAddEssay, handleInputChange, handleMultipleFormRadioChange, handleMultipleFormOptionLabelChange,
      formOptions, formOptionChecked)[questionForm]

    console.log('[quiz edit question]', quiz);

    let isInvalid = false
    return (
        <React.Fragment>
          <Header as='h1' attached='top'>Questions
            {isInvalid ?
              <Button basic disabled floated='right' content='Saved' />
            : <Button
              onClick={questionSubmit}
              floated='right' color='red' content='Save' />
            }
          </Header>
          <Segment attached stacked style={styles.C_EDIT_MENU_PADDING} textAlign='left' >

          { !!quiz && quiz.length> 0 && quiz.map((q, index) =>
            <Segment.Group key={index} >
              <Segment secondary style={{paddingTop: '0.5rem', paddingBottom: '0.5rem', }}>

                <Button icon basic size='mini'
                  style={{marginRight: '2rem'}}
                  onClick={(e) => handleQuestionToggle(e, index)}
                  >
                  <Icon name='minus' />
                </Button>
                {q.type}
                 {index +1}. {q.title.length > 30 ? q.title.substring(0, 30) : q.title}
                <Button.Group basic size='mini' style={{marginLeft: '2rem'}}>
                   <Button icon='pencil' basic
                     // onClick={() => handleInlineLectureEdit(secIndex, lecIndex)}
                   />
                   <Button icon='trash' basic
                     onClick={(e) => this.handleQuestionDelete(e, index)}
                   />
                   <Button basic icon='chevron up'
                     // disabled={lecIndex=== 0}
                     // onClick={(e) => handleLecMoveUp(e, secIndex, lecIndex)}
                   />
                   <Button basic icon='chevron down'
                     // disabled={(sections[secIndex].content.length === (lecIndex +1))}  onClick={(e) => handleLecMoveDown(e, secIndex, lecIndex)}
                   />
                </Button.Group>

              </Segment>

              {QuestionEditableType (index, q, handleChange, handleOptionRadioChange, handleOptionLabelChange)[q.type]}

            </Segment.Group>
          )}

          {qForm}
          <br/>
          <Button.Group basic fluid>
            <Button onClick={handleOpenShortAnswerForm}>Short Answer</Button>
            <Button onClick={handleOpenMultipleChoiceForm} disabled>multiple</Button>
            <Button onClick={handleOpenEssayForm} disabled>essay</Button>
          </Button.Group>

          </Segment>

        </React.Fragment>

    );
  }
}

export default QuizEditQuestions


// FORM BOTTOM
const QuestionFormType = (
  groupInstructionForShort, titleForShort, answerForShort, explanationForShort,
  handleAddShortAnswer, handleAddMultipleChoice, handleAddOption, handleAddEssay, handleInputChange, handleMultipleFormRadioChange, handleMultipleFormOptionLabelChange, formOptions, formOptionChecked) => ({

  shortAnswer: (<React.Fragment>
    <Header as='h3' attached='top' inverted>Short Answer</Header>
    <Segment attached>
    <Form onSubmit={handleAddShortAnswer}>
      <Form.Field>
        <label>Instruction</label>
        <input label='Instruction' placeholder='Instruction' name='groupInstructionForShort' value={groupInstructionForShort} onChange={handleInputChange}
        />
      </Form.Field>
      <Form.Field>
        <label>Title</label>
        <input label='Short Answer Title:' placeholder='Title' name='titleForShort' value={titleForShort} onChange={handleInputChange}

        />
      </Form.Field>
      <Form.Field>
        <label>Answer</label>
        <input placeholder='Answer' name='answerForShort'
          value={answerForShort}
        onChange={handleInputChange}

      />
      </Form.Field>
      <Form.Field>
        <label>Explanation</label>
        <textarea placeholder='Explanation' name='explanationForShort' rows='3'
          value={explanationForShort}
        onChange={handleInputChange}
      />
      </Form.Field>
      <Button >Add</Button>
    </Form>
    </Segment>
  </React.Fragment>),

  multipleChoice: (<Segment>
    <Header as='h3'>Multiple Choice</Header>
    <Form onSubmit={handleAddMultipleChoice}>
      <Form.Field>
        <label>Title:</label>
        <input placeholder='Title' name='titleForMultiple' onChange={handleInputChange}
        style={styles.QUIZ_QUESTION_INPUT}
      />
      </Form.Field>

      {formOptions.map((i, opIndex)=> (
        <Form.Field inline key={opIndex} >
            <Radio label={opIndex +1}
              name='answerForMultiple'
              value={opIndex}
              checked={opIndex === formOptionChecked}
              onChange={(e) => handleMultipleFormRadioChange(e, opIndex)}
            />
            <input placeholder='Option'
              style={styles.QUIZ_QUESTION_OPTION_INPUT}
                value={i}
                onChange={(e) => handleMultipleFormOptionLabelChange(e, opIndex)}
            />
            <Button.Group floated='right' size='mini' basic>
              <Button icon >
                <Icon name='pencil' />
              </Button>
              <Button icon>
                <Icon name='remove' />
              </Button>
              <Button icon>
                <Icon name='chevron up' />
              </Button>
              <Button icon>
                <Icon name='chevron down' />
              </Button>
            </Button.Group>
          </Form.Field>
      ))}

      <Form.Field>
        <label>Explanation:</label>
        <textarea placeholder='Explanation' name='explanationForMultiple'
        onChange={handleInputChange}
        style={styles.QUIZ_QUESTION_INPUT}
      />
      </Form.Field>
      <Button onClick={handleAddOption} >Add option</Button>
      <Button >Add</Button>

    </Form>
  </Segment>),

  essay: (<Segment >
    <Form onSubmit={handleAddEssay}>
      <Form.Field>
        <label>Essay Title:</label>
        <input placeholder='Title' name='titleForEssay' onChange={handleInputChange}/>
      </Form.Field>

      <Form.Field>
        <label>Explanation:</label>
        <input placeholder='Explanation' name='explanationForEssay'
        onChange={this.handleInputChange}/>
      </Form.Field>
      <Button>Add</Button>
    </Form>
  </Segment>),
})

const checkAnswer = (answer, entry) => {
  let correct = 0
  let wrong = 0
  let result = {}

  entry.map(e => {
    let totalEntry = entry.length // null, 0, 1~

    if (totalEntry == null || totalEntry == undefined) {
      return null
    }

    if (Object.values(e)[0] == answer[0]) {
      correct += 1

    } else {
      wrong += 1
    }

    result['totalEntry'] = totalEntry
    result['correct'] = correct
    result['wrong'] = wrong
  })

  return (
    <p>TotalEntry: {result['totalEntry']},
      Correct: {result['correct']} ({ Math.floor(result['correct'] / result['totalEntry'] * 100)} %),
      Wrong: {result['wrong']} ({ 100 - Math.floor(result['correct'] / result['totalEntry'] * 100)} %),
    </p>
  )
}


// FORM IN THE QUIZ

const QuestionEditableType  = (index, q, handleChange, handleOptionRadioChange, handleOptionLabelChange) => ({
  shortAnswer: ( q.isExpanded
    ? <Segment key={index}>
        <Form>
          <Form.Field>
            <label>Instruction</label>
            <input type="text" name='instruction' value={q.instruction} onChange={(e) => handleChange(e, index)}
            />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input type="text" name='title' value={q.title} onChange={(e) => handleChange(e, index)}

            />
          </Form.Field>
          <Form.Field>
            <label>Answer</label>
            <input type="text" name='answer' value={q.answer} onChange={(e) => handleChange(e, index)}

            />
          </Form.Field>
          <Form.Field>
            <label>Explanation</label>
            <textarea type="text" name='explanation' value={q.explanation} onChange={(e) => handleChange(e, index)}
              rows='3'
            />
          </Form.Field>
        </Form>
      </Segment>
      : null
  ),
  multipleChoice: ( q.isExpanded
    ?
    <Segment key={index}>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input type="text" name='title' value={q.title} onChange={(e) => handleChange(e, index)} style={styles.QUIZ_QUESTION_INPUT} />
        </Form.Field>

          {q.options && q.options.map((i, opIndex)=> (
            <Form.Field inline key={opIndex} >
                <Radio label={opIndex +1}
                  name='answerForMultiple'
                  value={opIndex}
                  checked={opIndex === q.optionChecked}
                  onChange={(e)=>handleOptionRadioChange(e, index, opIndex)}
                />
                <input placeholder='Option'
                  style={styles.QUIZ_QUESTION_OPTION_INPUT}
                    value={i}
                    onChange={(e) => handleOptionLabelChange(e, index, opIndex)}
                />
                <Button.Group floated='right' size='mini' basic>
                  <Button icon >
                    <Icon name='pencil' />
                  </Button>
                  <Button icon>
                    <Icon name='remove' />
                  </Button>
                  <Button icon>
                    <Icon name='chevron up' />
                  </Button>
                  <Button icon>
                    <Icon name='chevron down' />
                  </Button>
                </Button.Group>
              </Form.Field>
          ))}

        <Form.Field>
          <label>Answer</label>
          <input type="text" name='answer' value={q.answer} onChange={(e) => handleChange(e, index)} style={styles.QUIZ_QUESTION_INPUT} readOnly/>
        </Form.Field>
        <Form.Field>
          <label>Explanation</label>
          <input type="text" name='explanation' value={q.explanation} onChange={(e) => handleChange(e, index)} style={styles.QUIZ_QUESTION_INPUT}/>
        </Form.Field>
      </Form>
    </Segment>
    : null
  ),
  essay: ( q.isExpanded
    ?
    <Segment key={index}>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input type="text" name='title' value={q.title} onChange={(e) => handleChange(e, index)} style={styles.QUIZ_QUESTION_INPUT} />
        </Form.Field>
        <Form.Field>
          <label>Explanation</label>
          <input type="text" name='explanation' value={q.explanation} onChange={(e) => handleChange(e, index)} style={styles.QUIZ_QUESTION_INPUT}/>
        </Form.Field>
      </Form>
    </Segment> : null
  ),
})
