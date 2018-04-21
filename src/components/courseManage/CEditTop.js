import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Image, Item, Grid, Button, Icon, Responsive, List, Header} from 'semantic-ui-react'

const TEXT_COLOR = {color: '#fff'}

class CEditTop extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {title, teacherName, teacherPhoto, isPublished, settingsClick} = this.props
    let teacherProfile = teacherPhoto ? teacherPhoto : profile
    let published = isPublished ? 'published' : 'draft'

    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Grid container verticalAlign='middle'>

            <Grid.Column floated='left' width={12}>
              <Header as='h1' inverted >
               <Image circular src={teacherProfile}/>
               <Header.Content>
                 {title}
                 <Header.Subheader >
                   {published}
                 </Header.Subheader>
                 <Header.Subheader >
                   {teacherName}
                 </Header.Subheader>
               </Header.Content>
              </Header>
            </Grid.Column>

            <Grid.Column floated='right' width={4}>
              <Button.Group floated='right' >
                <Button inverted style={{margin: '1px'}}>Preview</Button>
                <Button  style={{margin: '1px'}}>Save</Button>
                <Button  icon style={{margin: '1px'}} onClick={settingsClick}><Icon name='settings' /></Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Responsive>

        <Responsive
          minWidth={320}
          maxWidth={992}>
          <Grid container>
            <Grid.Column>
              <List>
                <List.Item>
                  <Image src={teacherProfile} size='tiny'/>

                  <List.Content  verticalAlign='top' style={TEXT_COLOR}>
                    <List.Header style={TEXT_COLOR}>
                      {title}
                      {isPublished ? <p>Published</p> : <p>draft</p>}
                    </List.Header>
                    {teacherName}
                  </List.Content>

                  <List.Content floated='right' >
                    <Button  icon style={{margin: '1px'}} onClick={settingsClick}><Icon name='settings' /></Button>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Responsive>
      </div>
    );
  }
}

export default CEditTop
