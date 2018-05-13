import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Segment, Image, Item, Grid, Button, Icon, Responsive, List, Header, Modal, Form, Message} from 'semantic-ui-react'
import * as styles from '../../constants/styles'

class QuizEditTop extends Component {

  render() {
    const {title, instruction, quiz, handleChange, handleRadioChange} = this.props
    let quizEntryResult = false
    return (
      <Grid container verticalAlign='middle'>

        <Grid.Column floated='left' width={12}>
          <Header as='h2' inverted >
           {/* <Image circular src={teacherProfile}/> */}
           <Header.Content>
             {title}
             {/* <Header.Subheader >
               {published}
             </Header.Subheader>
             <Header.Subheader >
               {teacherName}
             </Header.Subheader> */}
           </Header.Content>
          </Header>
        </Grid.Column>

        <Grid.Column floated='right' width={4}>
          <Button.Group floated='right' >
            {/* <Button inverted style={{margin: '1px'}}>Preview</Button> */}

            <Modal trigger={<Button inverted>Preview</Button>}>
              <Modal.Header>Preview</Modal.Header>
              <Modal.Content scrolling>

                <Modal.Description>
                  <Header>{title}</Header>
                  <Header.Subheader>
                   {instruction}
                 </Header.Subheader>
                  {quiz.length > 0 && quiz.map((q, index) =>

                    QuestionType(index, q, handleChange, handleRadioChange, quizEntryResult)[q.type]
                  )}

                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button primary>
                  Proceed <Icon name='right chevron' />
                </Button>
              </Modal.Actions>
            </Modal>


          </Button.Group>
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
