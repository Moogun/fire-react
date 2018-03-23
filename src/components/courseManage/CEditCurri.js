import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider } from 'semantic-ui-react'
import {db} from '../../firebase';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState,} from 'medium-draft';
import 'medium-draft/lib/index.css';


class CEditCurri extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   editorState: createEditorState(), // for empty content'
    // };
    // this.sideButtons = [{
    //   title: 'Image',
    //   component: ImageSideButton,
    //   // component: CustomImageSideButton,
    // }];
    //
    // this.onChange = (editorState) => {
    //   this.setState({ editorState });
    // };
  }

  // componentDidMount() {
  //   const { curri } = this.props
  //   if (curri) {
  //     console.log('did mount curri', curri);
  //     var parsedCurri = JSON.parse(curri)
  //     console.log('parsed curri', parsedCurri);
  //     // var data = convertFromRaw(parsedCurri)
  //     // console.log('data', data);
  //     this.setState({
  //       editorState: createEditorState(parsedCurri),
  //     });
  //   }
  //   this.refs.editor.focus();
  // }

  // handleSubmit = () => {
  //   const {courseId, teacherId} = this.props
  //   console.log('course teacher', courseId, teacherId);
  //
  //   var editorData = convertToRaw(this.state.editorState.getCurrentContent());
  //   console.log('editor1 data getCurrentContent',editorData);
  //
  //   var a = JSON.stringify(editorData)
  //   console.log('a stringify', a);
  //   var b = JSON.parse(a)
  //   console.log('b parsed', b);
  //
  //   this.setState({editorState: createEditorState(b)})
  //   var editorData2 = convertToRaw(this.state.editorState.getCurrentContent());
  //
  //   console.log('editor data2',editorData2);
  //   db.doUpdateCourseCurri(courseId, teacherId, a)
  //     .then(response => console.log('succeded uploading',response))
  //     .catch(error => {
  //       this.setState(byPropKey('error', error));
  //     });

  // }

  render() {
    // const { editorState } = this.state;
    // const { curri } = this.props
    // console.log('render curri', curri);
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
