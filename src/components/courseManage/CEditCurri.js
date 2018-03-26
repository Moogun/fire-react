import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState,} from 'medium-draft';
import 'medium-draft/lib/index.css';


class CEditCurri extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { editorState, change, submit } = this.props;
    console.log('curri editorState', editorState, change);
    return (
      <Segment basic>
        <Header as='h2'>Curriculum</Header>
        <Divider />
        <Form onSubmit={submit}>
        <Editor
           ref="editor"
           editorState={editorState ? editorState : createEditorState()}
           onChange={change}
           placeholder="Start editing your curriculum"
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
