import React, { Component } from 'react'
import {Link, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, Responsive, Sidebar, Header } from 'semantic-ui-react'

import CEditTop from './CEditTop'
import CEditTitle from './CEditTitle'
import CEditMeta from './CEditMeta'
import CEditFeatures from './CEditFeatures'
import CEditGallery from './CEditGallery'
import CEditCurri from './curri/CEditCurri'
import CEditSettings from './CEditSettings'
import {db} from '../../firebase';
import {storage} from '../../firebase/firebase';

import { NotificationStack } from 'react-notification';
import { OrderedSet } from 'immutable';

import * as style from '../../style/inline'

const INITIAL_STATE = {
  open: true,
  closed: false,
  password: '',
  isLoading: false,
  activeItem: '',
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

const SEGMENT_BORDER={padding: '0'}
const MENU_BORDER={borderRadius: '0'}

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
       visible: false,

      sections: [{title:'', content:[],}],
      formForSection: false,
      sectionTitle: '',
      activeSection: '',

      lectureTitle: '',
    };

  }

  //MENU
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

  //FEATURE
  handleFeatureDismiss = (e) => {
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

  //IMGAES
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
      var uploadTask= storage.ref().child('images').child(teacherId).child('course').child(images[i].file.name).put(images[i].file)
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
        // console.log('filename to db', fileName);
          db.doUpdateCourseImages(teacherId, courseId, i, fileName, downloadURL, downloadURL, 320, 240, 'catpion', 100)
            .then(res => {
              // console.log('1 after uploading success images', images);
              const { images } = this.state
              // console.log('2 after uploading success images', images);
              images[i] = { caption: 'file', fileName: fileName, src: downloadURL, progress: 100, thumbnail: downloadURL, thumbnailHeight: 240, thumbnailWidth: 320}
              // console.log('update image success', res)
              this.setState ({ images })
              // console.log('3 after uploading success images', images);
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            })
      })
    })
  }

  handleRemoveModalShow = (id) => {
    console.log(id);
    this.setState ({ confirmOpen: true, selectedImage: id})
  }

  handleRemoveConfirm = () => {
    const {teacherId, courseId, images, selectedImage} = this.state
    let fileName = images[selectedImage].fileName
    console.log('filename', fileName, selectedImage);

    if (!fileName) {
      // console.log('here', fileName);
      let newImages = delete images[selectedImage]
      this.setState({ confirmOpen: false, newImages })
    } else {
      console.log('there');
      // Create a reference to the file to delete
      var desertRef =  storage.ref().child('images').child(teacherId).child('course').child(fileName)
      console.log('desertRef', desertRef);
      // Delete the file
      desertRef.delete()
        .then(res => {
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
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    }
  }

  handleRemoveCancel = () => {
    this.setState({ confirmOpen: false })
  }

  // //CURRI
  // onCurriSubmit = ( ) => {
  //   const {courseId, teacherId} = this.state
  //   console.log('course teacher', courseId, teacherId);
  //
  //   var editorData = convertToRaw(this.state.editorState.getCurrentContent());
  //   console.log('editor1 data getCurrentContent',editorData);
  //
  //   var strData = JSON.stringify(editorData)
  //
  //   db.doUpdateCourseCurri(teacherId, courseId, strData)
  //     .then(response => console.log('succeded uploading',response))
  //     .catch(error => {
  //       this.setState(byPropKey('error', error));
  //     });
  // }

  //CURRI
  onCurriSubmit = () => {
    const {courseId, teacherId, sections} = this.state
    db.doUpdateCourseCurri(teacherId, courseId, sections)
      .then(response => console.log('succeded uploading',response))
      .catch(error => {
        this.setState(byPropKey('error', error));
    });
  }


  //SETTINGS
  handleSettingsClick = () => {
    const { history, match } = this.props
    history.push({ pathname: `${match.url}/settings`})
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

  //NOTIFICATION
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
          course: course,

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
          sections: curri,
          })

      }).catch(error => {
        this.setState(byPropKey('error', error));
      });

  }

  componentWillUnmount(){
    console.log('will un mount', 0);
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })



  //CURRI
  handleOpenAddSectionForm =()=>{
  const {formForSection} = this.state
  this.setState({formForSection: !formForSection, activeSection: null})
}

handleAddSectionCancel = (e) => {
  const {formForSection} = this.state
  this.setState({formForSection: !formForSection})
  e.preventDefault()
}

handleSaveSection = () => {
  const { sections, formForSection, sectionTitle } = this.state
  let prev
  if (sections == undefined) {
    prev = []
  } else {
    prev = sections
  }
  let newEl = {title: sectionTitle, content: [], expanded: false}
  prev.push(newEl)
  this.setState ({ sections: prev, formForSection: !formForSection, sectionTitle: ''})
}

handleRemoveSection = (id) => {
    this.setState ({sectionToRemove: id })
    this.showRemoveConfirm()
}

showRemoveConfirm = () => this.setState({ removeSectionConfirm: true })

handleConfirmRemove = () => {
  const { sections, sectionToRemove } = this.state
  sections.splice(sectionToRemove, 1)
  let updated = sections
  this.setState ({sections: updated, removeSectionConfirm: false})
}

handleCancelRemove = () => this.setState({ sectionToRemove: null, removeSectionConfirm: false })

handleOpenAddLectureForm = (id) => {
  const {activeSection, formForSection} = this.state
  this.setState({activeSection: id, formForSection: false })
}

handleAddLectureCancel = (e) => {
  e.preventDefault()
  const {activeSection} = this.state
  console.log('activeSection1', activeSection);
  this.setState({activeSection: null})
  // const {activeSection} = this.state
  console.log('activeSection2', activeSection);

}

handleSaveLecture = (sectionId) => {
  console.log(sectionId);
  const { sections, lectureTitle } = this.state
  let section = sections[sectionId]
  section.expanded = true

  if (section.content == undefined) {
    sections[sectionId].content = []
  }
  section.content.push(lectureTitle)
  console.log('section', section);
  sections.splice(sectionId, 1, section)
  let updated = sections
  this.setState ({ sections: updated, lectureTitle: ''})
}

handleRemoveLecture =(secIndex, lecIndex) => {
  console.log('remove lec', secIndex, lecIndex);
  const { sections } = this.state
  sections[secIndex].content.splice(lecIndex, 1)
  let updated = sections
  console.log('updated ', updated);
  this.setState ({sections: updated})
}

handleInlineSectionEdit = (secIndex) => {
  this.setState ({ sectionToEdit: secIndex, sectionTitle: ''})
}

handleSaveSectionTitleEdit = (e, secIndex) => {
  const { sections, sectionTitle } = this.state
  sections[secIndex].title = sectionTitle
  let updated = sections
  console.log('sections[secIndex].title', sections[secIndex].title, 'sectionToEdit': null)
  this.setState ({ sections: updated, 'sectionToEdit': null, })
  // this.setState ({ })
  e.preventDefault()
}

handleInlineLectureEdit = (secIndex, lecIndex) => {
  this.setState ({ lectureToEdit: [secIndex, lecIndex], lectureTitle: '', activeSection: null})
  console.log('lecture to edit', this.state.lectureToEdit);
}

handleSaveLectureTitleEdit = (e, secIndex, lecIndex) => {
  const { sections, lectureTitle} = this.state
  sections[secIndex].content[lecIndex] = lectureTitle
  let updated = sections
  console.log('  sections[secIndex].content[lecIndex]', sections[secIndex].content[lecIndex])
  this.setState ({ sections: updated, 'lectureToEdit': null, lectureTitle: '' })

  e.preventDefault()
}

handleSecMoveUp = (e, secIndex) => {
  if (secIndex === 0) {
    return
  }
  const { sections } = this.state
  let el = sections[secIndex]
  sections.splice(secIndex, 1)
  sections.splice(secIndex-1, 0, el)
  this.setState ({ sections, activeSection: null, })
  e.preventDefault()
}

handleSecMoveDown  = (e, secIndex) => {
  const { sections } = this.state
  let el = sections[secIndex]
  sections.splice(secIndex, 1)
  sections.splice(secIndex+1, 0, el)
  this.setState ({ sections, activeSection: null, })
  e.preventDefault()
}

handleLecMoveUp = (e, secIndex, lecIndex) => {
  if (lecIndex === 0) {
    return
  }

  const { sections } = this.state
  let el = sections[secIndex].content[lecIndex]
  sections[secIndex].content.splice(lecIndex, 1)
  sections[secIndex].content.splice(lecIndex-1, 0, el)
  this.setState ({ sections, activeSection: null, })
  e.preventDefault()
}

handleLecMoveDown  = (e, secIndex, lecIndex) => {
  const { sections } = this.state
  let el = sections[secIndex].content[lecIndex]
  sections[secIndex].content.splice(lecIndex, 1)
  sections[secIndex].content.splice(lecIndex+1, 0, el)
  this.setState ({ sections, activeSection: null, })
  e.preventDefault()
}

handleSecToggle = (e, secIndex) => {
  const { sections } = this.state
  console.log('sections' ,sections, 'secIndex', secIndex);
  sections[secIndex].expanded = !sections[secIndex].expanded
  this.setState ({sections})
}

handleSectionTitleChange = (e) => this.setState ({ sectionTitle: e.target.value})
handleSectionTitleChangeCancel = () => this.setState ({ sectionToEdit: null})

handleLectureTitleChange = (e) => this.setState ({ lectureTitle: e.target.value})
handleLectureTitleChangeCancel = () => this.setState ({ lectureToEdit: null})


  render() {
    const {activeItem, isLoading,
      course,
      courseId, title, subTitle, teacherName, teacherId, teacherPhoto,
      textbook, date, time, location,
      curri,
      openCourse, password, isPublished,
      features,
      images, confirmOpen, selectedImage, handleRemoveModalShow, handleRemoveConfirm, handleRemoveCancel,
      visible,

      // CURRI
      sections, formForSection, sectionTitle, activeSection, lectureTitle, sectionToEdit, lectureToEdit, removeSectionConfirm

    } = this.state
    const {match} = this.props

    // console.log('render 1 ', 'images', images)
    console.log('curri', sections );

    const isInvalidSection = sectionTitle === ''
    const isInvalidLecture = lectureTitle === ''

    return (
      <div>

        {/* <Responsive {...Responsive.onlyComputer}> */}

         <Segment basic loading={isLoading} style={style.C_EDIT_BODY}>

            <Grid centered>
              <Grid.Row centered>
                <Grid.Column>

                <Grid >
                  <Grid.Column style={style.C_EDIT_HEAD}>
                    <CEditTop
                      title={title} teacherName={teacherName} teacherId={teacherId} teacherPhoto={teacherPhoto} isPublished={isPublished}
                      settingsClick={this.handleSettingsClick}/>
                  </Grid.Column>
                </Grid>

                  <Grid container stackable centered>
                    <Grid.Column width={3}>
                      <Menu vertical secondary fluid style={style.C_EDIT_MENU} >
                        <Menu.Item name='title'
                           active={activeItem === 'title'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/title`}
                           style={activeItem === 'title' ? style.C_EDIT_MENU_ITEM: null}
                           >
                           Title
                        </Menu.Item>
                        <Menu.Item name='info'
                           active={activeItem === 'info'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/info`}
                           style={activeItem === 'info' ? style.C_EDIT_MENU_ITEM: null}
                           >
                           Info
                        </Menu.Item>
                        <Menu.Item name='features'
                           active={activeItem === 'features'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/features`}
                           style={activeItem === 'features' ? style.C_EDIT_MENU_ITEM: null}
                           >
                          Features
                        </Menu.Item>
                        <Menu.Item name='gallery'
                           active={activeItem === 'gallery'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/gallery`}
                           style={activeItem === 'gallery' ? style.C_EDIT_MENU_ITEM: null}
                           >
                          Gallery
                        </Menu.Item>
                        <Menu.Item name='curri'
                           active={activeItem === 'curri'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/curriculum`}
                           style={activeItem === 'curri' ? style.C_EDIT_MENU_ITEM: null}
                           >
                            Curriculum
                        </Menu.Item>

                        {/* <Menu.Item name='assignment'
                          disabled
                           active={activeItem === 'assignment'}
                           onClick={this.handleItemClick}
                           as={Link} to={`${match.url}/assignment`}
                           >
                           Assignment (Coming soon)
                        </Menu.Item> */}
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
                            course={course}
                            title={title}
                            subTitle={subTitle}
                            change={this.handleInputChange}
                            titleSubmit={this.onTitleSubmit}
                          /> }/>
                          <Route path={`${match.url}/info`} render={(props) => <CEditMeta
                            {...props}
                            course={course}
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
                            course={course}
                            courseId={courseId}
                            teacherId={teacherId}
                            features={features}
                            change={this.handleInputChange}
                            dismiss={this.handleFeatureDismiss}
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
                            removeModalShow={this.handleRemoveModalShow}
                            removeConfirm={this.handleRemoveConfirm}
                            removeCancel={this.handleRemoveCancel}
                            // change={this.handleInputChange}
                            // submit={this.onInfoSubmit}
                          /> }/>

                          <Route path={`${match.url}/curriculum`} render={(props) =><CEditCurri
                            {...props}
            sections={sections}
            isInvalidSection={isInvalidSection} isInvalidLecture={isInvalidLecture}

            activeSection={activeSection}

            sectionTitle={sectionTitle} sectionToEdit={sectionToEdit}
            lectureTitle={lectureTitle} lectureToEdit={lectureToEdit}

            removeSectionConfirm = {removeSectionConfirm}

            handleSectionTitleChange ={this.handleSectionTitleChange}
            handleSectionTitleChangeCancel = {this.handleSectionTitleChangeCancel}

            handleRemoveSection = {this.handleRemoveSection}

            showRemoveConfirm = {this.showRemoveConfirm}
            handleConfirmRemove = {this.handleConfirmRemove}
            handleCancelRemove = {this.handleCancelRemove}


            handleOpenAddLectureForm = {this.handleOpenAddLectureForm}
            handleAddLectureCancel = {this.handleAddLectureCancel}
            handleSaveLecture = {this.handleSaveLecture}
            handleRemoveLecture = {this.handleRemoveLecture}

            handleLectureTitleChange = {this.handleLectureTitleChange}
            handleLectureTitleChangeCancel = {this.handleLectureTitleChangeCancel}

            handleInlineSectionEdit = {this.handleInlineSectionEdit}
            handleSaveSectionTitleEdit = {this.handleSaveSectionTitleEdit}

            handleInlineLectureEdit = {this.handleInlineLectureEdit}
            handleSaveLectureTitleEdit = {this.handleSaveLectureTitleEdit}

            handleSecMoveUp = {this.handleSecMoveUp}
            handleSecMoveDown = {this.handleSecMoveDown}
            handleLecMoveUp = {this.handleLecMoveUp}
            handleLecMoveDown = {this.handleLecMoveDown}

            handleSecToggle = {this.handleSecToggle}

            formForSection={formForSection}
            isInvalidSection={isInvalidSection}
            handleOpenAddSectionForm = {this.handleOpenAddSectionForm}
            handleAddSectionCancel = {this.handleAddSectionCancel}
            handleSaveSection = {this.handleSaveSection}
            handleSectionTitleChange = {this.handleSectionTitleChange}

            onCurriSubmit={this.onCurriSubmit}

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
              </Grid.Row>

            </Grid>
          </Segment>
        {/* </Responsive> */}

      </div>
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
