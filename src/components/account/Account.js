import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link, Route, Switch, Redirect} from 'react-router-dom'
import withAuthorization from '../../HOC/withAuthorization';
import profile from '../../assets/profile-lg.png'
import * as routes from '../../constants/routes';

import Profile from './Profile'
import Photo from './Photo'
import PasswordForgetPage from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import Danger from './Danger'
import {db} from '../../firebase';
import {storage} from '../../firebase/firebase';

import { Container, Menu, Grid, Image} from 'semantic-ui-react'

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class AccountPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      uid: '',
      email: '',
      username: '',
      displayName: '',
      photoUrl: '',
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
    console.log('did mount');
    const {authUser} = this.context
    db.onceGetUser(authUser.uid)
      .then(res => {
           // console.log('res', res.val())
           this.setState ({
              user: res.val(),
              uid: authUser.uid,
              email: res.val().email,
              username: res.val().username,
              displayName: res.val().displayName,
              photoUrl: res.val().photoUrl ? res.val().photoUrl : profile,
              images: {},
            })
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      })
  }

  handleProfileInfoChange = (event) => {
    this.setState(byPropKey(event.target.name, event.target.value))
    this.setState ({
      usernameTaken: null,
    })
  }

  onProfileInfoSubmit = () => {
    const { uid, username, displayName} = this.state
    db.doSearchForUsername(username)
      .then(res => {
        console.log('res', res)
        if (res.val() === null) {
          db.doUpdateUserProfile(uid, username, displayName)
            .then(res => {
              console.log('res', res)
              this.setState ({ buttonContent: 'Saved'})
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
        } else {
          this.setState ({ usernameTaken: username + ' is already taken'})
        }
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  handlePhotoChange = (e) => {
    const {images} = this.state
    let img = {}
    let newKey = db.newKey();

    console.log(e.target.files[0]);
    let reader = new FileReader()
    let file =  e.target.files[0]

    reader.onloadend = () => {
      console.log('reader', reader.result);
      img[newKey] = { file: file, imagePreviewUrl: reader.result, progress: 0}
      this.setState ({images: img})
    }

    if(e.target.files[0]){
      reader.readAsDataURL(file)
    }
  }

  onPhotoSubmit = () => {
    const { uid } = this.state
    const {images} = this.state
    const {teacherId, courseId } = this.props

    Object.keys(images).map(i => {
      console.log('images[i]', 'i', i, 'file', images[i].file, images[i].progress)

      var uploadTask= storage.ref().child('images').child(images[i].file.name).put(images[i].file)
      uploadTask.on('state_changed', (snapshot) => {
        // console.log('snapshot', snapshot.bytesTransferred);
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running progress', progress);
            let roundedProgress = Math.round(progress)
            images[i].progress = roundedProgress
            console.log('images[i]', images[i].progress);
            this.setState ({ images }) //called multiple tiems
            break;
          }
      }, (error) => {
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
      }, () => {
        var downloadURL = uploadTask.snapshot.downloadURL;
          console.log('down', downloadURL);
          db.doUpdateUserPhoto(uid, downloadURL)
             .then(res => console.log('res', res))
             .catch(error => {
               this.setState(byPropKey('error', error));
             })
      })
    })
  }

  render() {
    const {match} = this.props
    console.log('account props',this.props.match, this.props.user);
    // console.log('account authUser',this.context.authUser);
    const {authUser} = this.context
    const { activeItem, user, email, username, displayName, photoUrl, usernameTaken, images } = this.state
    // console.log('photoUrl', photoUrl, 'image', images);

    return (
      <Container text>
        <Grid celled stackable>
          <Grid.Row centered>
            <Grid.Column width={4}>
                <Menu vertical secondary fluid>
                <br/>
                <Image src={photoUrl} circular centered size='small'/>
                <br/>
                <Menu.Item name='profile'
                  active
                  // as={Link} to='/account/profile'
                  as={Link} to={`${match.url}/profile`}
                  active={activeItem === 'profile'} onClick={this.handleItemClick}
                 />
                <Menu.Item name='photo'
                  // as={Link} to='/account/photo'
                  as={Link} to={`${match.url}/photo`}
                    active={activeItem === 'photo'} onClick={this.handleItemClick}
                 />
                 <Menu.Item name='passwordChange'
                  // as={Link} to='/account/passwordChange'
                   as={Link} to={`${match.url}/pw-change`}
                    active={activeItem === 'passwordChange'} onClick={this.handleItemClick}
                />
                <Menu.Item name='passwordForget'
                 // as={Link} to='/account/passwordForget'
                  as={Link} to={`${match.url}/pw-forget`}
                   active={activeItem === 'passwordForget'} onClick={this.handleItemClick}
                 />
                <Menu.Item name='danger'
                  as={Link} to={`${match.url}/danger`}
                  active={activeItem === 'danger'} onClick={this.handleItemClick}
                 />
              </Menu>
            </Grid.Column>

            <Grid.Column width={12}>
              <Switch>
                <Redirect exact from={match.url} to={routes.ACCOUNT_PROFILE} />
                <Route path={routes.ACCOUNT_PROFILE} render={(props) => <Profile {...props}
                  user={user}
                  email={email}
                  username={username}
                  usernameTaken={usernameTaken}
                  displayName={displayName}
                  change={this.handleProfileInfoChange}
                  submit={this.onProfileInfoSubmit}
                  />} />
                <Route path={routes.ACCOUNT_PHOTO} render={() => <Photo
                  image={images}
                  photo={photoUrl}
                  photoChange={this.handlePhotoChange}
                  submit={this.onPhotoSubmit}
                  />} />
                <Route path={routes.ACCOUNT_PASSWORD_CHANGE} render={ () => <PasswordChangeForm />} />
                <Route
                  path={routes.ACCOUNT_PASSWORD_FORGET}
                  render={ () => <PasswordForgetPage />} />
                <Route path={routes.ACCOUNT_DANGER} render={() => <Danger />} />
              </Switch>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

AccountPage.contextTypes ={
  authUser: PropTypes.object,
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
