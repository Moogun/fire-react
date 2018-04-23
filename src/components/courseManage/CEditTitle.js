import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'

const CEditMetaBorder = {borderRadius: '0px'}

class CEditTitle extends Component {

  render() {
    const {course, title, subTitle, titleSubmit } = this.props
    console.log('c edit title props ', title, 'course', course);

    let titleChanged = !!course && course.metadata.title !== title
    let subTitleChanged = !!course && course.metadata.subTitle !== subTitle

    const isInvalid =
    title === ''||
	  titleChanged === false && subTitleChanged === false

    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Title
        <Button disabled={isInvalid} onClick={titleSubmit} floated='right' color='red'>Save</Button>
      </Header>
      <Segment attached style={CEditMetaBorder} stacked>
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
             {/* <Button onClick={titleSubmit}>저장</Button> */}
           </Form>
         </Segment>
       </React.Fragment>
    );
  }
}

export default CEditTitle
