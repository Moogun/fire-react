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

  componentDidMount(){
  }

  render() {
    const { click,quizzes,loading, title, quizTitleChange, onNewQuizSubmit } = this.props

    let quizList = quizzes
    ? <Segment basic loading={loading} style={style.SEGMENT_LOADER}>
       <Responsive minWidth={768} >

          <Grid centered>
          <Grid.Column width={12}>

            <Table selectable attached celled textAlign='center'>
                <Table.Header >
                  <Table.Row >
                    <Table.HeaderCell collapsing>Status</Table.HeaderCell>
                    <Table.HeaderCell >Title</Table.HeaderCell>
                    <Table.HeaderCell collapsing># of Questions</Table.HeaderCell>
                    <Table.HeaderCell collapsing>Students</Table.HeaderCell>
                    <Table.HeaderCell collapsing>Questions</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Object.keys(quizzes).map(key =>
                  <Table.Row  key={key} onClick={()=> click(key)}>
                    <Table.Cell textAlign='left' >
                      {quizzes[key].metadata.title ? <p>Published</p> : <p>draft</p>}
                    </Table.Cell>
                    <Table.Cell textAlign='left' >
                      {quizzes[key].metadata.title}
                    </Table.Cell>
                    <Table.Cell textAlign='left' >
                      {quizzes[key].metadata.questionCount}
                    </Table.Cell>
                    <Table.Cell textAlign='center' >
                      26 ??? fix
                    </Table.Cell>
                    <Table.Cell textAlign='center' >
                      30 ??? fix
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
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

       <Responsive minWidth={320} maxWidth={767}>
           <Container>
              <List divided >
                {Object.keys(quizzes).map(key =>
                  <List.Item key={key} onClick={()=> click(key)}>

                    <Image src={profile} size='tiny'/>

                    <List.Content  verticalAlign='top'>
                      <List.Header>{quizzes[key].title}</List.Header>
                      {quizzes[key].title}
                      {quizzes[key].title ? <p>Published</p> : <p>draft</p>}
                    </List.Content>

                    <List.Content floated='right' >
                      {quizzes[key].title ? <p>Open</p> : <p>Private</p>}
                    </List.Content>
                  </List.Item>
                )}
              </List>
           </Container>
       </Responsive>

       </Segment>
      : <Loader active size='massive' inline='centered'>Loading</Loader>

    return (
        <div>
            {quizList}
        </div>
    );
  }
}

// const  = () => {
//   return (
//       <div>
//         ''
//       </div>
//   );
// }

export default QuizPanel
