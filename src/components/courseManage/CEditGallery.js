import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Image, Grid, Dimmer} from 'semantic-ui-react'
import {db} from '../../firebase';
import {storage} from '../../firebase/firebase';

const CEditMetaBorder = {borderRadius: '0px'}
const minHeight = { minHeight: '200px'}

const INITIAL_STATE = {
  header: '',
  sub: '',
  error: null,
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CEditGallery extends Component {
  constructor(props) {
  super(props);
  this.state = {

    }
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.click()
    }
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  handleChange = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader()
    let file =  e.target.files[0]
    let files = e.target.files

    reader.onloadend = () => {
      console.log('reader', reader.result);

      // if(e.target.files[0]){
      //   Object.keys(files).map(f => {
      //     let file = e.target.files[f]
      //     let localUrl = reader.readAsDataURL(file[f])
      //   })
      //  }


      // this.setState({
      //   file: file,
      //   imagePreviewUrl: reader.result
      // });


      this.setState({
          file: file,
          imagePreviewUrl: [reader.result],
      })
    }
    if(e.target.files[0]){
      reader.readAsDataURL(file)
   }
  }

  handleSubmit = () => {
    let newKey = db.newKey();
    const {file} = this.state
    console.log('newkey', newKey, 'file', file);
    const {teacherId, courseId } = this.props
    var uploadTask = storage.ref().child('images').child(newKey).put(file);

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused': // or 'paused'
          console.log('Upload is paused');
          break;
        case 'running': // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
        switch (error.code) {
           case 'storage/unauthorized':
             // User doesn't have permission to access the object
             break;
           case 'storage/canceled':
             // User canceled the upload
             break;
           case 'storage/unknown':
             // Unknown error occurred, inspect error.serverResponse
             break;
         }
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log('down', downloadURL);
      db.doUpdateCourseImages(teacherId, courseId, newKey, downloadURL)
        .then(res => console.log('res', res))
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    });
  }

  handleClick2 = () => {

  }

  render() {
    console.log('image preview url', this.state.imagePreviewUrl);
    const { active } = this.state

    const content = (
    <div>
      <Button color='red'>Remove?</Button>
    </div>
  )

    let {imagePreviewUrl} = this.state;
       let $imagePreview = null;
       if (imagePreviewUrl) {
         $imagePreview = (
         <Dimmer.Dimmable
          as={Image}
          dimmed={active}
          dimmer={{ active, content }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          size='medium'
          src={imagePreviewUrl}
        />
      );
       } else {
         $imagePreview = (<div>Please select an Image for Preview</div>);
       }

    return (
      <Segment style={CEditMetaBorder}>

        {$imagePreview}

        <input placeholder='iage...'
          type='file' input={{ accept: 'image/*', multiple: 'true'}}
          ref={this.setTextInputRef}
          style={{display: "none"}}
        onChange={(e) => this.handleChange(e)}
       />
        <Button onClick={this.handleSubmit}>Save</Button>

        <Button onClick={this.focusTextInput}>open up</Button>

      </Segment>
    );
  }
}

export default CEditGallery
