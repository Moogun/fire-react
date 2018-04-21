import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'

const CEditMetaBorder = {borderRadius: '0px'}

class CEditTitle extends Component {

  render() {
    const { title, subTitle, titleSubmit } = this.props
    console.log('props', title);
    // let prevTitle = title
    // const isInvalid =
    // title === '' ||
    // password === '';
    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Title and Subtitle</Header>
      <Segment attached style={CEditMetaBorder}>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input placeholder='Title'
                value={title || ''}
                 name='title'
                 onChange={this.props.change}
               />
            </Form.Field>
            <Form.Field>
              <label>Subtitle</label>
              <Input placeholder='Subtitle'
                value={subTitle || ''}
                 name='subTitle'
                 onChange={this.props.change}
               />
            </Form.Field>
             <Button onClick={titleSubmit}>저장</Button>
           </Form>
         </Segment>
       </React.Fragment>
    );
  }
}

export default CEditTitle
