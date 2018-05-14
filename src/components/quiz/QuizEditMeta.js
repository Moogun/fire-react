import React, {Component} from 'react'
import {Link, Route, withRouter, Redirect, Switch} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, Responsive, Sidebar, Header, Confirm, Form, Input } from 'semantic-ui-react'
import * as styles from '../../constants/styles'

class QuizEditMeta extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const {} = this.state
    const {title, instruction, change, submit} = this.props
    let isInvalid = title == '' && instruction == ''

    return (
      <React.Fragment>
          <Header as='h1' attached='top'>Title
            {isInvalid ?
              <Button basic disabled floated='right' content='Saved' />
            : <Button disabled={isInvalid} onClick={submit} floated='right' color='red' content='Save'/>
            }
          </Header>
          <Segment attached style={styles.C_EDIT_MENU_PADDING} stacked>
              <Form>
                <Form.Field required>
                  <label>Title</label>
                  <input placeholder='Title'
                    value={title || ''}
                     name='title'
                     onChange={change}
                   />
                </Form.Field>
                <Form.Field>
                  <label>Instruction</label>
                  <input placeholder='Instruction'
                    value={instruction || ''}
                     name='instruction'
                     onChange={change}
                   />
                </Form.Field>
               </Form>
             </Segment>
       </React.Fragment>
    );
  }
}

export default QuizEditMeta
