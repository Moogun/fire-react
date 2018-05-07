import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Segment, Image, Item, Grid, Button, Icon, Responsive, List, Header, Modal, Form} from 'semantic-ui-react'
import * as styles from '../../constants/styles'

class QuizEditTop extends Component {

  render() {
    const {title, instruction, quiz, handleChange, handleRadioChange} = this.props

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

                    QuestionType(index, q, handleChange, handleRadioChange)[q.type]
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

const QuestionType = (index, q, handleChange, handleRadioChange) => ({
  shortAnswer: (
    <React.Fragment>
      {q.instruction
        ? <Segment key={index+'a'} >{q.instruction}</Segment>
        : null
      }
      <Segment key={index}>

        <Form>
          <Form.Field>
            {index + 1}. {q.title}
          </Form.Field>
          <Form.Field>
            <input type="text" placeholder='Enter the answer' style={styles.QUIZ_QUESTION_INPUT} />
          </Form.Field>
        </Form>
      </Segment>
  </React.Fragment>
  ),
  multipleChoice: (
    <Segment key={index}>
          {index + 1}. {q.title}
    </Segment>
  ),
})
