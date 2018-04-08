import React, { Component } from 'react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, } from 'semantic-ui-react'

import CEditTop from './CEditTop'
import CEditTitle from './CEditTitle'
import CEditMeta from './CEditMeta'
import CEditFeatures from './CEditFeatures'
import CEditGallery from './CEditGallery'
import CEditCurri from './CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import {storage} from '../../firebase/firebase';

import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState,} from 'medium-draft';
import 'medium-draft/lib/index.css';

const CEditBody = {backgroundColor: '#ecf0f1', marginTop: '0px', minHeight: '700px'}
const CEditTitleBg = {backgroundColor: '#2c3e50'}
const CEditMenu = {marginTop: '4rem'}

const INITIAL_STATE = {
  open: true,
  closed: false,
  password: '',
  isLoading: false,
  activeItem: 'info',
  openCourse: true,
  error: null,
}

const INITIAL_FEATURE_STATE = {
  header: '',
  sub: '',
}

const byPropKey = (propertyName, value) => ()=> ({
  [propertyName]: value
})

class CourseEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
       notifications: OrderedSet(),
       count: 0,
       key: 0,
       images: {},
       confirmOpen: false,
       selectedImage: null,
       editorState: createEditorState(),
    };
    this.sideButtons = [{
      title: 'Image',
      component: ImageSideButton,
      // component: CustomImageSideButton,
    }];

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  handleImageChange = (e) => {
    const {images, key, count} = this.state

    let file = e.target.files[0]
    let existing = Object.keys(images).map(i => images[i].fileName)
    let found = existing.find((el) => el == file.name )

    if (found) {
      console.log('found', found);
      return
    }

    let newKey = db.newKey();
    let reader = new FileReader()
    reader.onloadend = () => {
      // console.log('reader', reader.result);
      images[newKey] = { file: file, src: reader.result, progress: 0, }
      this.setState ({images})
    }

    if (e.target.files[0]) {
      reader.readAsDataURL(file)
    }
  }

  onImageSubmit = () => {
    console.log('submit clicked');
    const {images} = this.state
    const {teacherId, courseId} = this.state

    Object.keys(images).map(i => {
      console.log('images[i]', 'i', i, 'file', images[i].file, images[i].progress)

      if (images[i].progress == '100') {
         return
      }
      var uploadTask= storage.ref().child('images').child(teacherId).child('<course></course>').child(images[i].file.name).put(images[i].file)
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
        let fileName = images[i].file.name
        console.log('filename to db', fileName);
          db.doUpdateCourseImages(teacherId, courseId, i, fileName, downloadURL, downloadURL, '320', '240', 'catpion', '100')
            .then(res => console.log('res', res))
            .catch(error => {
              this.setState(byPropKey('error', error));
            })
      })
    })
  }

  show = (id) => {
    console.log(id);
    this.setState ({ confirmOpen: true, selectedImage: id})
  }

  handleConfirm = () => {
    const {teacherId, courseId, images, selectedImage} = this.state
    let fileName = images[selectedImage].fileName
    console.log('filename', fileName, selectedImage);

    if (!fileName) {
      // console.log('here', fileName);
      let newImages = delete images[selectedImage]
      this.setState({ confirmOpen: false, newImages })
    } else {
      // console.log('there');
      // // Create a reference to the file to delete
      // var desertRef = storageRef.child('images/desert.jpg');
      //
      // // Delete the file
      // desertRef.delete().then(function() {
      //   // File deleted successfully
      // }).catch(function(error) {
      //   // Uh-oh, an error occurred!
      // });
      
      db.doRemoveCourseImage(teacherId, courseId, selectedImage, fileName)
        .then(res => {
          // console.log('res', res)
          //remove download url
          let newImages = delete images[selectedImage]
          this.setState({ confirmOpen: false, newImages })
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    }
  }

  handleCancel = () => {
    this.setState({ confirmOpen: false })
  }
  //life cycle
  componentDidMount() {

    const {isLoading } = this.state
    const {match} = this.props
    // console.log('did mount 1 ', 'beforeIsLoading')
    this.setState({isLoading: !isLoading})

    let courseId = match.params.cid
    db.onceGetCourse(match.params.cid)
      .then(snapshot => {
        let course = snapshot.val()
        let meta = course.metadata
        let curri = course.curri
        let features = course.features
        let images = course.images ? course.images : {}
        // console.log('meta', meta);
        // console.log('curri', curri);
        // console.log('features', features);
        // console.log('dmt images', images);
        const {isLoading } = this.state
        this.setState ({
          courseId: courseId,

          title: meta.title,
          subTitle: meta.subTitle,
          teacherId: meta.tid,

          teacherName: meta.tName,
          teacherPhoto: meta.tProfileImg,

          textbook: meta.textbook,
          date: meta.date,
          time: meta.time,
          location: meta.location,
          openCourse: meta.openCourse ? meta.openCourse : false,
          password: meta.password ? meta.password : '',
          isPublished: meta.isPublished,

          isLoading: !isLoading,
          features: features,
          images: images,
          })
          this.onChange(createEditorState(JSON.parse(curri)))
      }).catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  componentWillUnmount(){
    console.log('will un mount', 0);
  }

  //
  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

  // course edit
  handleInputChange = (event) => {
    this.setState(byPropKey(event.target.name, event.target.value))
  }

  onTitleSubmit = (e) => {
    console.log('title submit');
    const { courseId, teacherId, title, subTitle } = this.state
    db.doUpdateCourseTitle(teacherId, courseId, title, subTitle)
      .then(res => {
        console.log('title submit res', res)
      }).catch(error => {
        this.setState(byPropKey('error', error))
      })
    e.preventDefault()
  }

  onInfoSubmit = (event) => {
    const {courseId, teacherId, textbook, date, time, location, isLoading} = this.state
    console.log('onInfoSubmit', courseId, teacherId, textbook, date, time, location, isLoading);
    this.setState({isLoading: !isLoading})

    db.doUpdateCourseMeta(teacherId, courseId, textbook, date, time, location)
        .then((res)=> {
          console.log(' meta saved', res);
          const {isLoading} = this.state
          console.log('is Loading', isLoading);
          this.setState({isLoading: !isLoading})
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
      event.preventDefault();
  }

  onCurriSubmit = ( ) => {
    const {courseId, teacherId} = this.state
    console.log('course teacher', courseId, teacherId);

    var editorData = convertToRaw(this.state.editorState.getCurrentContent());
    console.log('editor1 data getCurrentContent',editorData);

    var strData = JSON.stringify(editorData)

    db.doUpdateCourseCurri(teacherId, courseId, strData)
      .then(response => console.log('succeded uploading',response))
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  onSettingsSubmit = (event) => {
      const {courseId, teacherId, openCourse, password } = this.state;
      // console.log('on settings submit public', this.state.openCourse );

      db.doUpdateCoursePrivacy(teacherId, courseId, openCourse, password)
        .then((res)=> {
          console.log(' doUpdateCoursePrivacy', res);
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
        event.preventDefault();
  }

  handleSettingsOpenOrClose = (btn) => {
    const { openCourse } = this.state
    if (btn === 1) {
      this.setState({openCourse: true})
    } else {
      this.setState({openCourse: false})
    }
  }

  handleRemoveCourse = () => {

    const { teacherId, courseId} = this.state
    const {history} = this.props
    db.doRemoveCourse(teacherId, courseId)
      .then(res => {
        console.log('remove', res)
        console.log('history', history)
        history.replace({pathname: '/dashboard/courses'})
        })
  }

  handlePublish = () => {

    const {courseId, teacherId, isPublished, isLoading, textbook} = this.state
      console.log('1 textbook', !!textbook);
      // if (!!textbook) {
      console.log('before 1',isLoading);
      this.setState({isLoading: !isLoading})
      console.log('handle publish', courseId, teacherId, isPublished);

      db.doPublishCourse(teacherId, courseId, isPublished)
        .then(response => {
          console.log('succeed uploading')
          const { isLoading } = this.state
          this.setState({isLoading: !isLoading})
          this.addNotification()
        })
        .catch(error => {
            this.setState(byPropKey('error', error))
        })
  }

  //notification
  barStyleFactory = (index, style) => {
    return Object.assign(
      {},
      style,
      { top: `${2 + (index * 4)}rem`, left: 'auto', right: '-100%', height: '3rem', backgroundColor: '#0E6EB8'}
    );
  }

  activeBarStyleFactory = (index, style) => {
    return Object.assign(
      {},
      style,
      { top: `${2 + (index * 4)}rem`, left: 'auto', right: '1rem', height: '3rem', color: '#fff', font: 'Lato'}
    );
  }

  addNotification = () => {
    const {count, key} = this.state
    const newCount = count + 1;
    const newkey = key + 1

    this.setState ({ key: newkey})
      return this.setState({
        notifications: this.state.notifications.add({
          message: `Succesfully saved `,
          key: newkey,
        })
      });
    }

  removeNotification = (count) => {
    this.setState({
      notifications: this.state.notifications.filter(n => n.key !== count)
    })
  }

  handleSettingsClick = () => {
    const { history, match } = this.props
    history.push({ pathname: `${match.url}/settings`})
  }

  handleDismiss = (e) => {
      console.log('e', e);

      let fList = this.state.features
      delete fList[e]
      console.log('new lsit', fList);
      this.setState ({ features: fList })
      console.log('state', this.state.features);
   }

  handleAddNewFeature = () => {

     let newKey = db.newKey();
     console.log('newkey', newKey);
     let id = newKey

     const {features, header, sub} = this.state
     let feats = !!features ? features : {}
     console.log('featuers', feats);
     feats[newKey] = {header: header, sub: sub}

     this.setState ({
       features: feats,
       ...INITIAL_FEATURE_STATE,
     })
     console.log('state', this.state.features);
  }

  onFeaturesSubmit = () => {
    const {courseId, teacherId, features } = this.state
    console.log('courseId, tid, features', features, courseId, teacherId);

    db.doUpdateFeatures(teacherId, courseId, features)
      .then(res => console.log('res', res))
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  render() {
    const {activeItem, isLoading,
      courseId, title, subTitle, teacherName, teacherId, teacherPhoto,
      textbook, date, time, location,
      curri,
      openCourse, password, isPublished,
      features,
      editorState,
      images, confirmOpen, selectedImage, show, handleConfirm, handleCancel,
    } = this.state
    const {match} = this.props

    // console.log('render 2 course info', courseId, title, teacherName, teacherId, textbook, openCourse, isLoading);
    // console.log('is loading render', isLoading );
    // console.log('render 1 ', 'features', !!features)
    console.log('render 1 ', 'images', images)
    return (
      <Segment basic loading={isLoading} style={CEditBody}>

        <Grid centered>
          {/* <Grid.Row centered> */}
            <Grid.Column>

            <Grid >
              <Grid.Column style={CEditTitleBg}>
                <CEditTop
                  title={title} teacherName={teacherName} teacherId={teacherId} teacherPhoto={teacherPhoto} isPublished={isPublished}
                  settingsClick={this.handleSettingsClick}/>
              </Grid.Column>
            </Grid>

              <Grid container stackable>
                <Grid.Column width={3}>
                  <Menu vertical fluid style={CEditMenu} >
                    <Menu.Item name='title'
                       active={activeItem === 'title'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/title`}
                       >
                       <Icon name='check circle outline'  size='large'/> title
                    </Menu.Item>
                    <Menu.Item name='info'
                       active={activeItem === 'info'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/info`}
                       >
                       <Icon name='check circle outline'  size='large'/> Info
                    </Menu.Item>
                    <Menu.Item name='features'
                       active={activeItem === 'features'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/features`}
                       >
                      <Icon name='radio'  size='large'/> Features
                    </Menu.Item>
                    <Menu.Item name='gallery'
                       active={activeItem === 'gallery'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/gallery`}
                       >
                      <Icon name='radio'  size='large'/> Gallery
                    </Menu.Item>
                    <Menu.Item name='curri'
                       active={activeItem === 'curri'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/curriculum`}
                       >
                       <Icon name='radio'  size='large'/> Curriculum
                    </Menu.Item>

                    <Menu.Item name='assignment'
                      disabled
                       active={activeItem === 'assignment'}
                       onClick={this.handleItemClick}
                       as={Link} to={`${match.url}/assignment`}
                       >
                       Assignment (Coming soon)
                    </Menu.Item>
                    <Menu.Item name='assignment'
                       active={activeItem === 'assignment'}
                       onClick={this.handleItemClick}
                       >
                       <Button fluid color='red' onClick={this.handlePublish}>Publish</Button>
                    </Menu.Item>
                   </Menu>

                </Grid.Column>

                <Grid.Column width={11}>
                    <Switch>
                      <Redirect exact from={match.url} to={`${match.url}/info`} />
                      <Route path={`${match.url}/title`} render={(props) => <CEditTitle
                        {...props}
                        title={title}
                        subTitle={subTitle}
                        change={this.handleInputChange}
                        titleSubmit={this.onTitleSubmit}
                      /> }/>
                      <Route path={`${match.url}/info`} render={(props) => <CEditMeta
                        {...props}
                        title={title}
                        subTitle={subTitle}
                        textbook={textbook}
                        date={date}
                        time={time}
                        location={location}
                        change={this.handleInputChange}
                        submit={this.onInfoSubmit}
                      /> }/>
                      <Route path={`${match.url}/features`} render={(props) => <CEditFeatures
                        {...props}
                        courseId={courseId}
                        teacherId={teacherId}
                        features={features}
                        change={this.handleInputChange}
                        dismiss={this.handleDismiss}
                        addNewFeature={this.handleAddNewFeature}
                        submit={this.onFeaturesSubmit}
                      /> }/>
                      <Route path={`${match.url}/gallery`} render={(props) => <CEditGallery
                        {...props}
                        courseId={courseId}
                        teacherId={teacherId}
                        images={images}
                        handleImageChange={this.handleImageChange}
                        submit={this.onImageSubmit}
                        confirmOpen={confirmOpen}
                        selectedImage={selectedImage}
                        show={this.show}
                        handleConfirm={this.handleConfirm}
                        handleCancel={this.handleCancel}
                        // change={this.handleInputChange}
                        // submit={this.onInfoSubmit}
                      /> }/>
                      <Route path={`${match.url}/curriculum`} render={(props) =><CEditCurri
                        {...props}
                        courseId={courseId}
                        teacherId={teacherId}
                        editorState={editorState}
                        change={this.onChange}
                        submit={this.onCurriSubmit}
                      />} />
                      <Route path={`${match.url}/settings`} render={() => <CEditSettings
                        courseId={courseId}
                        teacherId={teacherId}
                        openCourse={openCourse}
                        password={password}
                        change={this.handleInputChange}
                        toggle={this.handleSettingsOpenOrClose}
                        submit={this.onSettingsSubmit}
                        remove={this.handleRemoveCourse}
                      />} />
                      <Route path={`${match.url}/assignment`} render={() => <CEditSettings />} />

                    </Switch>
                </Grid.Column>

              </Grid>

        {/* <NotificationStack
          barStyleFactory={this.barStyleFactory}
          activeBarStyleFactory={this.activeBarStyleFactory}
          // notifications={this.state.notifications.toArray()}
          onDismiss={notification => this.setState({
            notifications: this.state.notifications.delete(notification)
          })}
        /> */}
              </Grid.Column>
          {/* </Grid.Row> */}

        </Grid>
      </Segment>
    );
  }
}

export default withRouter(CourseEdit)


// secure course key 1) from create page, 2) from the url match, 3)
// 1. fetch course meta info
// 2. check teacher id
// compare ids
// const teacherId = () => db.onceGetCourse(courseKey);
//
// const authCondition = (authUser) => !!authUser
//
// export default withTeacherAuthorization(authCondition)(CourseEdit);
