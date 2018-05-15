import React, {Component} from 'react'
import { Table, Responsive, Image, List, Grid, Segment, Container,  Loader, Dimmer, Button, Modal, Header, Form, Input, Icon  } from 'semantic-ui-react'
import profile from '../../assets/profile-lg.png'
import * as style from '../../style/inline';

class QuizPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { quizClick,quizzes,loading, title, quizTitleChange, onNewQuizSubmit } = this.props
    let quizList = quizzes
    ? (<Table selectable attached celled textAlign='center' >
        <Table.Header >
          <Table.Row >
            {/* <Table.HeaderCell collapsing>Status</Table.HeaderCell> */}
            <Table.HeaderCell >Title</Table.HeaderCell>
            <Table.HeaderCell collapsing># of Questions</Table.HeaderCell>
            {/* <Table.HeaderCell collapsing>Students</Table.HeaderCell> */}
            {/* <Table.HeaderCell collapsing>Questions</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(quizzes).map(key =>
          <Table.Row  key={key} onClick={(e)=> quizClick(e, key)}>
            {/* <Table.Cell textAlign='left' >
              {quizzes[key].metadata.title ? <p>Published</p> : <p>draft</p>}
            </Table.Cell> */}
            <Table.Cell textAlign='left' >
              {quizzes[key].metadata.title}
            </Table.Cell>
            <Table.Cell textAlign='left' >
              {quizzes[key].metadata.questionCount}
            </Table.Cell>
            {/* <Table.Cell textAlign='center' >
              26 ??? fix
            </Table.Cell>
            <Table.Cell textAlign='center' >
              30 ??? fix
            </Table.Cell> */}
          </Table.Row>
        )}
      </Table.Body>
    </Table>)
    : <p>No quiz yet</p>
    return (
      <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
         <Responsive minWidth={768} >

            <Grid centered>
            <Grid.Column width={16}>

              {quizList}

              <br/>
              <Modal size='tiny' trigger={<Button fluid>Create New Quiz</Button>}>
                  <Modal.Header>Quiz</Modal.Header>
                  <Modal.Content >

                    <Modal.Description>
                      <Header>Create Quiz</Header>
                      <Form onSubmit={onNewQuizSubmit}>
                        <Form.Field>
                          <Input
                            icon='pencil'
                            iconPosition='left'
                            value={title}
                            onChange={quizTitleChange}
                            // onChange={event => this.setState(byPropKey('title', event.target.value))}
                            type="text"
                            placeholder="Title"
                          />
                          </Form.Field>
                          <Button color='blue' fluid>
                            <Icon name='checkmark' /> Save and Go
                          </Button>
                      </Form>

                    </Modal.Description>
                  </Modal.Content>
                </Modal>

          </Grid.Column>
          </Grid>
         </Responsive>

         <Responsive maxWidth={767}>

               {quizList}

         </Responsive>
       </Segment>
    );
  }
}


export default QuizPanel
