import React, { Component } from 'react'
import {Link, Route, withRouter, Switch, Redirect, Prompt} from 'react-router-dom'
import { Segment,Grid, Menu, Button, Icon, Responsive, Sidebar, Header, Confirm, Modal } from 'semantic-ui-react'

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

import * as style from '../../constants/styles'

const INITIAL_STATE = {
  open: true,
  closed: false,
  password: '',
  isLoading: false,
  activeItem: '',
  openCourse: true,
  error: null,
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
       visible: false,

      sections: [{title:'', content:[],}],
      formForSection: false,
      sectionTitle: '',
      activeSection: '',

      lectureTitle: '',
      titleToSave: false,
      header: '',
      sub: '',
      infoToSave: false,
      featuresToSave: false,
      sameFileNameSelectedAlready: false,
      galleryToSave: false,
      curriToSave: false,
      coursePrivacy: '',

      quizAttachModalOpen: false,
    };

  }

  //MENU
  handleItemClick = (e, {name}) => { this.setState({activeItem: name}) }

  // course edit
  handleTitleInputChange = (event) => this.setState({[event.target.name]: event.target.value, titleToSave: true })

  handleMetaInputChange = (event) => this.setState({[event.target.name]: event.target.value, infoToSave: true })

  handleFeaturesInputChange = (event) => this.setState({[event.target.name]: event.target.value })

  handleSettingsPasswordInputChange = (event) => this.setState({[event.target.name]: event.target.value, settingsToSave: true })

  onTitleSubmit = (e) => {
    console.log('title submit');
    const { courseId, teacherId, title, subTitle, isLoading } = this.state
    this.setState({isLoading: !isLoading})

    db.doUpdateCourseTitle(teacherId, courseId, title, !!subTitle ? subTitle : '' )
      .then(res => {
        const { course } = this.state
        course.metadata.title = title
        course.metadata.subTitle = subTitle
        console.log('on title submit course', course)

        const {isLoading} = this.state
        this.setState ({ titleToSave: false, course: course, isLoading: !isLoading})
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

          const { course } = this.state
          course.metadata.textbook = textbook
          course.metadata.date = date
          course.metadata.time = time
          course.metadata.location = location
          const {isLoading} = this.state
          this.setState ({ infoToSave: false, course: course, isLoading: !isLoading})

        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
      event.preventDefault();
  }

  //FEATURE
  handleFeatureDismiss = (e) => {
      console.log('e', e);

      let fList = this.state.featureList
      delete fList[e]
      console.log('new lsit', fList);
      this.setState ({ featureList: fList, featuresToSave: true })
      console.log('state', this.state.featureList);
      //add a method to remove feature
   }

  handleAddNewFeature = () => {

     let newKey = db.newKey();
     console.log('newkey', newKey);
     let id = newKey

     const {featureList, header, sub, course } = this.state
     let feats = !!featureList ? featureList : {}
     console.log('featuers', feats);
     feats[newKey] = {header: header, sub: sub}


     this.setState ({
       featureList: feats,
       header: '',
       sub: '',
       featuresToSave: true,
     })
     console.log('state', this.state.featureList, 'course', course);

     // features = [{title: 'abc', list={a,1,2,}, }, {title: 'abc', list={a,1,2,}, },]
  }

  onFeaturesSubmit = () => {
    const {courseId, teacherId, featureList } = this.state

    console.log('courseId, tid, featureList', featureList, courseId, teacherId);

    db.doUpdateFeatures(teacherId, courseId, featureList)
      .then(res => this.setState ({featuresToSave: false}))
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
      this.setState ({ sameFileNameSelectedAlready: true })
      const {sameFileNameSelectedAlready} = this.state
      return
    }

    let newKey = db.newKey();
    let reader = new FileReader()
    reader.onloadend = () => {
      // console.log('reader', reader.result);
      images[newKey] = { file: file, src: reader.result, progress: 0, }
      this.setState ({images, galleryToSave: true})
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
              this.setState ({ images, galleryToSave: false, })
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
              this.setState({ confirmOpen: false, newImages, galleryToSave: true })
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

  //CURRI
  onCurriSubmit = () => {
    const {courseId, teacherId, sections} = this.state
    db.doUpdateCourseCurri(teacherId, courseId, sections)
      .then(response => this.setState ({ curriToSave: false }))
      .catch(error => {
        this.setState(byPropKey('error', error));
    });
  }


  //SETTINGS
  handleSettingsClick = () => {
    const { history, match } = this.props
    history.push({ pathname: `${match.url}/settings`})
  }

  handleSettingsPrivacyChange = (e, {value}) => {
    console.log(value)
    if (value === 'public') {
      this.setState ({ coursePrivacy : 'public' })
    } else {
      this.setState ({ coursePrivacy : 'private' })
    }
  }

  onSettingsSubmit = (event) => {
      const {courseId, teacherId, coursePrivacy, password } = this.state;
      // console.log('on settings submit public', this.state.openCourse );

      db.doUpdateCoursePrivacy(teacherId, courseId, coursePrivacy, password)
        .then((res)=> {
          if (coursePrivacy === 'public') {
            this.setState ({ openCourse: 'public' })
          } else {
            this.setState ({ openCourse: 'private' })
          }
        })
        .catch(error => {
          this.setState(byPropKey('error', error))
        })
        event.preventDefault();
  }

  // handleSettingsOpenOrClose = (btn) => {
  //   const { openCourse } = this.state
  //   if (btn === 1) {
  //     this.setState({openCourse: true})
  //   } else {
  //     this.setState({openCourse: false})
  //   }
  // }

  handleRemoveCourse = () => {

    const { teacherId, courseId} = this.state
    const {history} = this.props
    db.doRemoveCourse(teacherId, courseId)
      .then(res => {
        console.log('remove', res)
        console.log('history', history)
        history.replace({pathname: '/teaching/dashboard/courses'})
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

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    handleOpenAddFeatureForm = (e) => {
      const {formForFeature} = this.state
      this.setState({formForFeature: !formForFeature})
      e.preventDefault()
    }
    handleAddFeatureCancel = (e) => {
      const {formForFeature} = this.state
      this.setState({formForFeature: !formForFeature})
      e.preventDefault()
    }

    //CURRI
    handleOpenAddSectionForm =()=>{
      const {formForSection} = this.state
      this.setState({formForSection: !formForSection, activeSection: null,})
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
      this.setState ({ sections: prev, formForSection: !formForSection, sectionTitle: '',  curriToSave: true})
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
      this.setState ({sections: updated, removeSectionConfirm: false,  curriToSave: true})
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

      // SIMPLE ARR CONTENT  - BEFORE TEST
      // section.content.push(lectureTitle)
      // console.log('section', section);
      // sections.splice(sectionId, 1, section)
      // let updated = sections
      // this.setState ({ sections: updated, lectureTitle: '',  curriToSave: true})

      // OBJECT ARR CONTENT
      let lecture = {lectureTitle: lectureTitle, quiz: null, isExpanded: false }
      section.content.push(lecture)
      console.log('section', section);
      sections.splice(sectionId, 1, section)
      let updated = sections
      this.setState ({ sections: updated, lectureTitle: '',  curriToSave: true})

    }

    handleRemoveLecture =(secIndex, lecIndex) => {
      console.log('remove lec', secIndex, lecIndex);
      const { sections } = this.state
      sections[secIndex].content.splice(lecIndex, 1)
      let updated = sections
      console.log('updated ', updated);
      this.setState ({sections: updated, curriToSave: true})
    }

    handleInlineSectionEdit = (secIndex) => {
      this.setState ({ sectionToEdit: secIndex, sectionTitle: ''})
    }

    handleSaveSectionTitleEdit = (e, secIndex) => {
      const { sections, sectionTitle } = this.state
      sections[secIndex].title = sectionTitle
      let updated = sections
      console.log('sections[secIndex].title', sections[secIndex].title, 'sectionToEdit': null)
      this.setState ({ sections: updated, 'sectionToEdit': null,  curriToSave: true})
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
      this.setState ({ sections: updated, 'lectureToEdit': null, lectureTitle: '',  curriToSave: true })

      e.preventDefault()
    }

    handleAttachQuiz = (secIndex, lecIndex) => {
      // this.setState ({ lectureToEdit: [secIndex, lecIndex], lectureTitle: '', activeSection: null})
      const {quizAttachModalOpen, teacherId, selectedLecForQuiz } = this.state
      console.log('attach some to lecture', selectedLecForQuiz);

      const {sections } = this.state
      if (sections[secIndex].content[lecIndex]['qid'] != null) {
        console.log('warning');
      }

      this.setState ({ quizAttachModalOpen: !quizAttachModalOpen, selectedLecForQuiz: [secIndex, lecIndex], })

      db.doFetchAllQuizzes(teacherId)
      .then(res =>this.setState ({ quizList: res.val()}))
      .catch(error => {
        this.setState({[error]: error});
      });
    }

    handleCancelAttachQuiz = () => {
      const {quizAttachModalOpen} = this.state
      this.setState ({ quizAttachModalOpen: false})
    }


    handleQuizSelectToAttach = (e, qid, quiz, quizTitle) => {
      console.log('12345', quiz );
      const {sections, selectedLecForQuiz } = this.state
      sections[selectedLecForQuiz[0]].content[selectedLecForQuiz[1]]['qid'] = qid
      sections[selectedLecForQuiz[0]].content[selectedLecForQuiz[1]]['quiz'] = quiz

      this.setState ({ sections, quizAttachModalOpen: false, curriToSave: true})
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

    handleLecToggle = (e, secIndex, lecIndex) => {
      const { sections } = this.state
      console.log('sections' ,sections, 'secIndex', secIndex, 'lecIndex', lecIndex);
      // let el = sections[secIndex].content[lecIndex]
      sections[secIndex].content[lecIndex].isExpanded = !sections[secIndex].content[lecIndex].isExpanded
      // sections[secIndex].content.splice(lecIndex, 1)
      // sections[secIndex].content.splice(lecIndex+1, 0, el)
      // this.setState ({ sections, activeSection: null, })
      this.setState ({sections})
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

    handleDiscardCancel = () => {}
    handleDiscardChange = () => {
      //here save course data to each edit field
      console.log('discard');
    }

    handleConfirmSameFile = () => {
      const {sameFileNameSelectedAlready} = this.state
      this.setState ({ sameFileNameSelectedAlready: !sameFileNameSelectedAlready})
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
          let featureList = course.features
          let images = course.images ? course.images : {}

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
            featureList: featureList,
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

  render() {
    const {activeItem, isLoading,
      course,
      courseId, teacherName, teacherId, teacherPhoto,

      title, subTitle, titleToSave,
      textbook, date, time, location, infoToSave,
      // features,
      featureList, formForFeature,
      header, sub, featuresToSave,
      // gallery,
      images, confirmOpen, selectedImage, handleRemoveModalShow, handleRemoveConfirm, handleRemoveCancel,
      visible, galleryToSave, sameFileNameSelectedAlready,

      // CURRI
      sections, formForSection, sectionTitle, activeSection, lectureTitle, sectionToEdit, lectureToEdit, removeSectionConfirm, curriToSave,
      //settings
      openCourse, coursePrivacy, password, isPublished, settingsToSave,

      //Modal for quiz attahcment
      quizAttachModalOpen,
      quizList,
    } = this.state
    const {match} = this.props

    // console.log('render 1 ', 'images', images)
    console.log('curri', sections );

    const isInvalidSection = sectionTitle === ''
    const isInvalidLecture = lectureTitle === ''

    return (
      <div>

        <Responsive {...Responsive.onlyComputer}>
         <Segment basic
           loading={isLoading}
           style={style.C_EDIT_BODY}>

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

                        {isPublished
                          ? null
                          : <Menu.Item name='publish'
                             active={activeItem === 'publish'}
                             onClick={this.handleItemClick}>
                               <Button fluid color='red' onClick={this.handlePublish}>Publish</Button>
                            </Menu.Item>
                        }
                       </Menu>
                    </Grid.Column>

                    <Grid.Column width={13}>
                        <Switch>
                          <Redirect exact from={match.url} to={`${match.url}/info`} />
                          <Route path={`${match.url}/title`} render={(props) => <CEditTitle
                            {...props}
                            course={course}
                            title={title}
                            subTitle={subTitle}
                            change={this.handleTitleInputChange}
                            titleSubmit={this.onTitleSubmit}
                            titleToSave={titleToSave}
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
                            change={this.handleMetaInputChange}
                            submit={this.onInfoSubmit}
                            infoToSave={infoToSave}
                          /> }/>
                          <Route path={`${match.url}/features`} render={(props) => <CEditFeatures
                            {...props}
                            course={course}
                            courseId={courseId}
                            teacherId={teacherId}
                            featureList={featureList}
                            header = {header}
                            sub = {sub}
                            change={this.handleFeaturesInputChange}
                            dismiss={this.handleFeatureDismiss}
                            addNewFeature={this.handleAddNewFeature}
                            formForFeature={formForFeature}
                            handleOpenAddFeatureForm={this.handleOpenAddFeatureForm}
                            handleAddFeatureCancel={this.handleAddFeatureCancel}
                            submit={this.onFeaturesSubmit}
                            featuresToSave={featuresToSave}
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
                            galleryToSave={galleryToSave}
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

            handleLecToggle = {this.handleLecToggle}

            handleSecToggle = {this.handleSecToggle}

            formForSection={formForSection}
            isInvalidSection={isInvalidSection}
            handleOpenAddSectionForm = {this.handleOpenAddSectionForm}
            handleAddSectionCancel = {this.handleAddSectionCancel}
            handleSaveSection = {this.handleSaveSection}
            handleSectionTitleChange = {this.handleSectionTitleChange}

            onCurriSubmit={this.onCurriSubmit}
            curriToSave={curriToSave}

            handleAttachQuiz={this.handleAttachQuiz}

                          />} />
                          <Route path={`${match.url}/settings`} render={() => <CEditSettings
                            course={course}
                            courseId={courseId}
                            teacherId={teacherId}
                            openCourse={openCourse}
                            password={password}
                            change={this.handleSettingsPasswordInputChange}
                            // toggle={this.handleSettingsOpenOrClose}
                            coursePrivacy={coursePrivacy}
                            privacyChange={this.handleSettingsPrivacyChange}
                            submit={this.onSettingsSubmit}
                            remove={this.handleRemoveCourse}
                          />} />
                          <Route path={`${match.url}/assignment`} render={() => <CEditSettings />} />

                        </Switch>
                        <Confirm
                            content='A file that has the same name has been already added'
                            open={sameFileNameSelectedAlready}
                            onConfirm={this.handleConfirmSameFile}
                          />
                        {/* <Confirm
                           open={this.state.titleToSave}
                           onCancel={this.handleDiscardCancel}
                           onConfirm={this.handleDiscardChange}
                         /> */}
                        {/* <Prompt
                          when={titleToSave}
                          message={location =>
                            this.handleDiscardChange()
                          }
                        /> */}
                    </Grid.Column>
                  </Grid>

                  </Grid.Column>
              </Grid.Row>
            </Grid>

          </Segment>

          <Modal open={quizAttachModalOpen}>
            <Modal.Header>Select a Quiz</Modal.Header>
            <Modal.Content scrolling>
              <Modal.Description>

                {quizList && Object.keys(quizList).map(i => (

                    <Segment clearing vertical key={i} clearing  >
                        <PreviewModal quiz={quizList[i]}/>

                        <Button style={{backgroundColor: 'white'}} disabled={quizList[i].metadata.questionCount===0}
                          onClick={(e) => this.handleQuizSelectToAttach(e, i, quizList[i], quizList[i].metadata.title )} > {quizList[i].metadata.title} - {quizList[i].metadata.questionCount} question(s)</Button>

                    </Segment>)
                )}
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={this.handleCancelAttachQuiz}>
                 <Icon name='cancel' /> Cancel
               </Button>
             </Modal.Actions>
          </Modal>

        </Responsive>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Header as='h2' icon textAlign='center' style={{maxWidth: '500px'}}>
             <Icon name='exclamation' />
             We are developing smaller version of this page.
             <br/>Please make your brwoser fullscreen to edit your course for the time   being
           </Header>
        <Responsive minWidth={320} maxWidth={991}>

        </Responsive>

      </div>
    );
  }
}

export default withRouter(CourseEdit)

class PreviewModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    const { quiz } = this.props
    console.log('[nested quiz]', quiz);
    return (
      <Modal
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        trigger={  <Button icon basic> <Icon name='eye' /> Preview </Button>}>

        <Modal.Header>{quiz.metadata.title}</Modal.Header>
        <Modal.Content scrolling>
          {!!quiz.questions == false
            ? <p>No question added yet. Go to <strong>'Instructor Dashboard'</strong> -> <strong>'Quiz'</strong> to add some questions </p>
            : <Segment basic>
              <Segment>{quiz.metadata.instruction}</Segment>
              {quiz.questions.map((q, index) =>
               <Segment key={index}>
                 {q.title}
               </Segment>)}
            </Segment>}
        </Modal.Content>
        <Modal.Actions>
          <Button icon='check' content='Back to the list' onClick={this.close} />
        </Modal.Actions>
      </Modal>
    )
  }
}
