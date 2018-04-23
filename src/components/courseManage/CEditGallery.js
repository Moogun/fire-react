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

    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      if (this.textInput) this.textInput.click()
    }
}

  render() {

    const {images, confirmOpen, selectedImage, handleImageChange, submit, removeModalShow, removeConfirm, removeCancel } = this.props
    console.log('rdr c edit gallery imgaes', images);

    const isInvalid = false

    return (
      <React.Fragment>
      <Header as='h1' attached='top'>Gallery
          {/* <Button onClick={submit} floated='right' color='red'>{isInvalid ? 'Saved' : 'Save'}</Button> */}
          {isInvalid ?
            <Button basic disabled floated='right' content='Saved' />
          : <Button disabled={isInvalid} onClick={submit} floated='right' color='red' content='Save'/>
          }
      </Header>
      <Segment attached stacked style={CEditMetaBorder}>
        <Segment basic style={minHeight} textAlign='center'>
          <Grid columns={3}>
            {images && Object.keys(images).map(i =>
              <Grid.Column key={i}>
                <Dimmer.Dimmable
                    as={Image}
                    onClick={() => this.props.removeModalShow(i)}
                    size='medium'
                    src={images[i].src}
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
        <Divider />

        <input placeholder='image...' type='file' accept='image/*'
          ref={this.setTextInputRef} style={{display: "none"}}
          onChange={handleImageChange} />
        {/* <Button primary onClick={submit}>Save</Button> */}

      </Segment>
    </React.Fragment>
    );
  }
}

export default CEditGallery
