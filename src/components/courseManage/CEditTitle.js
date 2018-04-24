import React, {Component} from 'react'
import { Form, Input, Button, Segment, Header, Divider } from 'semantic-ui-react'
import * as style from '../../style/inline'

class CEditTitle extends Component {

  render() {
    const {course, title, subTitle, titleSubmit, titleToSave } = this.props
    console.log('c edit title props ', title, 'course', course);

    let titleChanged = !!course && course.metadata.title !== title
    let subTitleChanged = !!course && course.metadata.subTitle !== subTitle

    let isInvalid =
    title === ''||
	  titleChanged === false && subTitleChanged === false ||
    titleToSave === false

    // saved
    return (
      <React.Fragment>
        {/* <Segment basic> */}
          <Header as='h1' attached='top'>Title
            {isInvalid ?
              <Button basic disabled floated='right' content='Saved' />
            : <Button disabled={isInvalid} onClick={titleSubmit} floated='right' color='red' content='Save'/>
            }
          </Header>
          <Segment attached style={style.C_EDIT_MENU_PADDING} stacked>
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
         {/* </Segment> */}
       </React.Fragment>
    );
  }
}

export default CEditTitle
