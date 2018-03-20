import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider } from 'semantic-ui-react'
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState,} from 'medium-draft';
import { convertToRaw, convertFromRaw } from 'draft-js';
import 'medium-draft/lib/index.css';
import {db} from '../../firebase';

class CEditCurri extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorState(), // for empty content
    };
    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];
    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  handleSubmit = () => {
    const {courseId, teacherId} = this.props
    console.log('course teacher', courseId, teacherId);
    var editorData = convertToRaw(this.state.editorState.getCurrentContent());
    console.log('editor data',editorData);
    db.doUpdateCourseCurri(courseId, teacherId, editorData)
      .then(response => console.log('succeded uploading',response))
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  render() {
    const { editorState } = this.state;
    const { } = this.props
    return (
      <Segment basic>
        <Header as='h2'>Curriculum</Header>
        <Divider />
        <Form onSubmit={this.handleSubmit}>
        <Editor
           ref="editor"
           editorState={editorState}
           onChange={this.onChange}
         />
         <Button>Save</Button>
        </Form>
      </Segment>
    );
  }
}

class CustomImageSideButton extends ImageSideButton {

  onChange(e) {
    const file = e.target.files[0];
    if(file.type.indexOf('image/') === 0) {
      const formData = new FormData();
      formData.append('image', file);
      fetch('/your-server-endpoint', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (response.status === 200) {
          // Assuming server responds with
          // `{ "url": "http://example-cdn.com/image.jpg"}`
          return response.json().then(data => {
            if (data.url) {
              this.props.setEditorState(addNewBlock(
                this.props.getEditorState(),
                Block.IMAGE, {
                  src: data.url,
                }
              ));
            }
          });
        }
      });
    }
    this.props.close();
  }
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

export default CEditCurri
