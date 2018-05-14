import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Segment, Image, Item, Grid, Button, Icon, Responsive, List, Header, Modal, Form, Message} from 'semantic-ui-react'
import * as styles from '../../constants/styles'

class QuizEditTop extends Component {

  render() {
    const {title, instruction, quiz, handleChange, handleRadioChange} = this.props
    let quizEntryResult = false
    let uid = ''
    return (
      <Grid container verticalAlign='middle'>
          <Grid.Column >
            <Header as='h2' inverted floated='left'>
             <Header.Content>
               {title}
             </Header.Content>
            </Header>

            <PreviewModal title={title} instruction={instruction} quiz={quiz} handleChange={handleChange} handleRadioChange={handleRadioChange} quizEntryResult={quizEntryResult} />
          </Grid.Column>
      </Grid>

    );
  }
}

export default QuizEditTop

export const QuestionType = (index, q, handleChange, handleRadioChange, quizEntryResult, uid) => ({
  shortAnswer: (
      //instruction??
      <Segment key={index}>
        <Form>
          <Form.Field>
            {index + 1}. {q.title}
          </Form.Field>
            {quizEntryResult
            ? null
            : <Form.Field>
              <input type="text" placeholder='Enter the answer' style={styles.QUIZ_QUESTION_INPUT} onChange={(e) => handleChange(e, index, q)} />
            </Form.Field> }

          {quizEntryResult
            ? <Message
                 color={q.entry[uid] == q.answer ? 'blue' : 'red'}
                 header={q.entry[uid] == q.answer ? 'Correct' : 'Wrong'}
                 list={[
                   `Your answer:' ${q.entry[uid]}`,
                   `Correct Answer : ${q.answer}`,
                   `Explanation : ${q.explanation}`,
                   `Correct Total:
                   ${correctCount(Object.values(q.entry).filter(a => a == q.answer).length)} / ${totalCount(Object.keys(q.entry).length)},
                   ( ${percentile(Object.values(q.entry).filter(a => a == q.answer).length, Object.keys(q.entry).length)} %)`,
                 ]}
               />
            : null}

        </Form>
      </Segment>
  ),
  multipleChoice: (
    <Segment key={index}>
          {index + 1}. {q.title}
    </Segment>
  ),
})

const correctCount = (correct) => correct
const totalCount = (total) => total
const percentile = (correct, total) => Math.round(correct/total * 100)

class PreviewModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { title, instruction, quiz, handleChange, handleRadioChange, quizEntryResult, uid } = this.props
    console.log('[nested quiz]', quiz);
    return (
      <Modal
        dimmer
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={ <Button icon floated='right'> <Icon name='eye' /> Preview </Button> }>

        <Modal.Header>{title}</Modal.Header>
        <Modal.Content scrolling>
          <Segment basic>
            <Segment>{instruction}</Segment>
            {quiz.map((q, index) =>
               QuestionType(index, q, handleChange, handleRadioChange, quizEntryResult, uid)[q.type]
             )}
           </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Done' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
