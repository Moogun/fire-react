import React, {Component} from 'react'
import { Form, Input, Button, Segment, Icon, Header, Image, Grid, Dimmer, Progress, Confirm} from 'semantic-ui-react'

class CEditGallery extends Component {
  constructor(props) {
  super(props);
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.click()
    }
  }

  unsavedImage = (images) => {
    let re = Object.keys(images).map(i => images[i].progress)

    let imageNotSaved = re.filter(i => i === 0)
    let imageToSave
    if (imageNotSaved.length === 0) {
      imageToSave = false
    } else {
      imageToSave = true
    }
    return imageToSave
  }

  render() {

    const {images, confirmOpen, selectedImage, handleImageChange, submit, removeModalShow, removeConfirm, removeCancel, galleryToSave } = this.props
    console.log('rdr c edit gallery imgaes', images);
    console.log('check', Object.keys(images).map(i =>  images[i].progress
    ))
    console.log('check 2', this.unsavedImage(images))

    const isInvalid = galleryToSave === false || this.unsavedImage(images) === false

    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Gallery
          {/* <Button onClick={submit} floated='right' color='red'>{isInvalid ? 'Saved' : 'Save'}</Button> */}
          {isInvalid ?
            <Button basic disabled floated='right' content='Saved' />
          : <Button disabled={isInvalid} onClick={submit} floated='right' color='red' content='Save'/>
          }
      </Header>
      <Segment attached stacked >
        <Segment basic textAlign='center'>
          <Grid columns={3}>
            {images && Object.keys(images).map(i =>
              <Grid.Column key={i}>
                <Dimmer.Dimmable
                    as={Image}
                    bordered
                    onClick={() => this.props.removeModalShow(i)}
                    size='medium'
                    src={images[i].src}
                    label={{ corner: 'right', icon: 'save', color: `${images[i].progress === 100 ? 'grey': 'red'}`, }}
                  />
                <Progress percent={images[i].progress} attached='bottom' color='blue' />
                </Grid.Column>
            )}
            <Grid.Column>
              <Button icon='image' basic onClick={this.focusTextInput} size='massive' fluid style={{height: '100%'}}/>

              <Confirm
                open={confirmOpen}
                content='Remove image?'
                onCancel={removeCancel}
                onConfirm={removeConfirm}
              />

            </Grid.Column>
          </Grid>
        </Segment>

        <input placeholder='image...' type='file' accept='image/*'
          ref={this.setTextInputRef} style={{display: "none"}}
          onChange={handleImageChange} />

      </Segment>
    </React.Fragment>
    );
  }
}

export default CEditGallery
