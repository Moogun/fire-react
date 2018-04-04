import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Divider, Image, Grid, Dimmer, Progress, Confirm} from 'semantic-ui-react'
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
      images: {},
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
    const {images} = this.state
    let newKey = db.newKey();

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
      images[newKey] = { file: file, imagePreviewUrl: reader.result}
      this.setState ({images})
      // this.setState({
      //     file: file,
      //     imagePreviewUrl: [reader.result],
      // })
    }

    if(e.target.files[0]){
      reader.readAsDataURL(file)
    }

  }

  handleSubmit = () => {
    // let newKey = db.newKey();
    const {images} = this.state
    // console.log('newkey', newKey, 'file', file);
    const {teacherId, courseId } = this.props

    Object.keys(images).map(i => {
      console.log('images[i]', 'i', i, 'file', images[i].file)

      var uploadTask= storage.ref().child('images').child(i).put(images[i].file)
      uploadTask.on('state_changed', function(snapshot){
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
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log('down', downloadURL);
        db.doUpdateCourseImages(teacherId, courseId, i, downloadURL)
          .then(res => console.log('res', res))
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      });
    })
  }

  show = (id) => {
    console.log(id);
    this.setState ({ open: true, selectedImage: id})
  }
  handleConfirm = () => {
    const {images, selectedImage} = this.state
    let newImages = delete images[selectedImage]
    this.setState({ open: false, newImages })
  }
  handleCancel = () => {
    this.setState({ open: false })
  }

  render() {

    const {images } = this.state

    let img = Object.keys(images).map(i => images[i].imagePreviewUrl)
    console.log('img', img);

    const content = (
      <div>
        <Button color='red'>Remove?</Button>
      </div>
    )

    return (
      <Segment style={CEditMetaBorder}>
        <Header as='h2'>Gallery</Header>
        <Divider />
        <Segment basic style={minHeight} textAlign='center'>
          <Grid columns={3}>
            {Object.keys(images).map(i =>
              <Grid.Column>
                <Dimmer.Dimmable
                    as={Image}
                    onClick={() => this.show(i)}
                    size='medium'
                    src={images[i].imagePreviewUrl}
                  />
                </Grid.Column>
            )}
            <Grid.Column>
              <Button icon='image' basic onClick={this.focusTextInput} size='massive' fluid style={{height: '100%'}}/>

              <Confirm
                open={this.state.open}
                content='Remove image?'
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
              />

            </Grid.Column>
          </Grid>
        </Segment>
        <Divider />

        <input placeholder='iage...'
          type='file'
          accept='image/*'

          ref={this.setTextInputRef}
          style={{display: "none"}}
          onChange={(e) => this.handleChange(e)} />
        <Button primary onClick={this.handleSubmit}>Save</Button>
        {/* <Progress percent={11} /> */}
      </Segment>
    );
  }
}

export default CEditGallery
