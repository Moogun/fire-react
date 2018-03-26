import {db} from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

  //get 1 user
export const onceGetUser = (uid) =>
  db.ref('users').child(uid).once('value');

// export const onceGetUserWithName = () =>
//   // const events =
//   db.ref('users').orderByChild("username").equalTo('moo7').limitToFirst(1).once("value");

export const onceGetUserWithName = (tName) =>
  db.ref('users').orderByChild("username").equalTo(tName).limitToFirst(1).once("value");

export const onceGetCourseWithTitle = (cTitle) =>
  db.ref('courses').orderByChild("/metadata/title").equalTo(cTitle).limitToFirst(1).once("value");

//get multiple courses
export const onceGetCourses = () =>
  db.ref('courses').once('value');

export const onceGetPublishedCourses = () =>
  db.ref('courses').equalTo().once('value');

//get 1 course
export const onceGetCourse = (courseKey) =>
  db.ref('courses').child(courseKey).once('value');

//course creation
export const doCreateCourse = (title, teacherId) =>
{
  var metadata = {
     title,
     teacherId,
     isPublished: false,
   }

  // console.log('new course key generated in db file',newCourseKey);
  //
  // var updates = {}
  // updates[`courses/${newCourseKey}`] = info
  // updates[`users/${instructorId}/courseTeaching/${newCourseKey}`] = 1
  //
  // return db.ref().update(updates)
  return db.ref('courses').push({metadata})
}



export const doUpdateCourseTeaching = (newCourseKey, teacherId, title) =>
{
  var updates = {}
    // before Mar 1 updates[`users/${instructorId}/courseTeaching/${newCourseKey}`] = 1
  updates[`teachers/${teacherId}/courseTeaching/${newCourseKey}/metadata/title`] = title
  updates[`users/${teacherId}/courseTeaching/${newCourseKey}/metadata/title`] = title
  return db.ref().update(updates)
}

export const doUpdateCourseMeta = (courseKey, tid, textbook, date, time, location) => {

  var updates = {}
  updates[`courses/${courseKey}/metadata/textbook`] = textbook
  updates[`courses/${courseKey}/metadata/date`] = date
  updates[`courses/${courseKey}/metadata/time`] = time
  updates[`courses/${courseKey}/metadata/location`] = location

  updates[`users/${tid}/courseTeaching/${courseKey}/metadata/textbook`] = textbook
  updates[`users/${tid}/courseTeaching/${courseKey}/metadata/date`] = date
  updates[`users/${tid}/courseTeaching/${courseKey}/metadata/time`] = time
  updates[`users/${tid}/courseTeaching/${courseKey}/metadata/location`] = location

  return db.ref().update(updates)
}

export const doUpdateCourseCurri = (courseKey, tid, curri) => {
  var updates = {}
  updates[`courses/${courseKey}/curri/`] = curri
  return db.ref().update(updates)
}

export const doUpdateCoursePrivacy = (courseKey, tid, openCourse, password) => {
  console.log('open', courseKey, tid, openCourse, password);

  var updates = {}
  if (openCourse) {
    // console.log('tr', openCourse);
    updates[`courses/${courseKey}/metadata/openCourse`] = openCourse
    updates[`courses/${courseKey}/metadata/password`] = ''
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/openCourse`] = openCourse
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/password`] = ''
  } else {
    // console.log('false',openCourse);
    updates[`courses/${courseKey}/metadata/openCourse`] = openCourse
    updates[`courses/${courseKey}/metadata/password`] = password
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/openCourse`] = openCourse
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/password`] = password
  }

  return db.ref().update(updates)

}

//publish course
export const doPublishCourse = (courseKey, tid, isPublished) => {
  console.log('db', courseKey, isPublished);

  var updates = {}

  if (isPublished === true) {
    updates[`courses/${courseKey}/metadata/isPublished`] = false
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/isPublished`] = false
  } else {
    updates[`courses/${courseKey}/metadata/isPublished`] = true
    updates[`users/${tid}/courseTeaching/${courseKey}/metadata/isPublished`] = true
  }

  return db.ref().update(updates)
}

export const doRegisterCourse = (courseKey, uid) => {
  console.log('db', courseKey, uid);

  // meta has
  // teacher has questions, reviews, enrolled
  // var updates = {}
  //
  // if (isPublished === true) {
  //   updates[`courses/${courseKey}/metadata/isPublished`] = false
  //   updates[`users/${tid}/courseTeaching/${courseKey}/metadata/isPublished`] = false
  // } else {
  //   updates[`courses/${courseKey}/metadata/isPublished`] = true
  //   updates[`users/${tid}/courseTeaching/${courseKey}/metadata/isPublished`] = true
  // }

  return db.ref().update()
}



// 1. database snapshot contains data from a db location
// 2. snapshot is passed to the event callbacks you attache with on() or once()
// 3. you cna extract contents of the snapshot as a javascript object by calling val()
// 4. alternatively you can traverse into the snapshot by calling child()  to return child snapshots (which you could then call val() on)
//
// {name:
//   {
//   "first": "Ada",
//   "last": "Lovelace"
//   }
// }
//
// var ref = firebase.database().ref("users/ada");
// ref.once("value")
//   .then(function(snapshot)) {
//     var key = snapshot.key; //"ada"
//     var childKey = snapshot.child("name/last").key; //last
//   }
//
// var rootRef = firease.database().ref();
// rootRef.once("value")
//   .then(function(snapshot)) {
//     var key = snapshot.key; //null
//     var childKey = snapshot.child("users/ada").key; //ada
//   }
