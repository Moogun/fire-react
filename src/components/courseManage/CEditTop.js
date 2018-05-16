import React, {Component} from 'react'
import profile from '../../assets/profile-lg.png'
import {Image, Item, Grid, Button, Icon, Responsive, List, Header, Segment} from 'semantic-ui-react'
import '../App.css' //May 16  not working ??
import * as style from '../../constants/styles'

class CEditTop extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const {title, teacherName, teacherPhoto, isPublished, settingsClick, coursePreview} = this.props
    let teacherProfile = teacherPhoto ? teacherPhoto : profile
    let published = isPublished ? 'published' : 'draft'

    return (
      <Segment vertical style={style.C_EDIT_HEAD}
        // className='c-edit-head'
        >
        <Responsive {...Responsive.onlyComputer}>
          <Grid centered container verticalAlign='middle'>

            <Grid.Column width={12}>
              <Header as='h2' inverted >
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
                <Button inverted style={{margin: '1px'}} onClick={coursePreview}>Preview</Button>
                <Button icon style={{margin: '1px'}} onClick={settingsClick}><Icon name='settings' /></Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Responsive>

        <Responsive minWidth={Responsive.onlyMobile.minWidth} maxWidth={Responsive.onlyTablet.maxWidth}>

          <Grid container verticalAlign='middle' textAlign='left'>
            <Grid.Column>
              <Header as='h4' inverted floated='left'>
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
              <Button.Group floated='right' inverted>
                <Button icon style={{margin: '1px'}} ><Icon name='eye' /></Button>
                <Button icon style={{margin: '1px'}} onClick={settingsClick}><Icon name='settings' /></Button>
              </Button.Group>
            </Grid.Column>

          </Grid>
        </Responsive>
      </Segment>
    );
  }
}

export default CEditTop
