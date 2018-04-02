import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Image, Item, Grid, Button, Icon} from 'semantic-ui-react'

const textColor = {color: '#fff'}

class CEditTop extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {title, teacherName, isPublished, settingsClick} = this.props
    let published = isPublished ? 'published' : 'draft'
    return (
      <Grid container verticalAlign='middle'>
        <Grid.Column floated='left' width={5}>
        <Item.Group>
          <Item>
            <Item.Image size='tiny' src={profile} />

            <Item.Content>
              <Item.Header as='a' style={textColor}>{title}</Item.Header>
              <Item.Extra style={textColor}>{published}</Item.Extra>
              <Item.Meta style={textColor}> {teacherName} </Item.Meta>

            </Item.Content>
          </Item>
        </Item.Group>
        </Grid.Column>
        <Grid.Column floated='right' width={5} centered={true}>
          <Button.Group floated='right' >
            <Button inverted style={{margin: '1px'}}>Preview</Button>
            <Button  style={{margin: '1px'}}>Save</Button>
            <Button  icon style={{margin: '1px'}} onClick={settingsClick}><Icon name='settings' /></Button>
          </Button.Group>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CEditTop
