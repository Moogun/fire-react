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

//get multiple courses
export const onceGetCourses = () =>
  db.ref('courses').once('value');

//get 1 course
export const onceGetCourse = (courseKey) =>
  db.ref('courses').child(courseKey).child('metadata').once('value');

//course creation
export const doCreateCourse = (title, teacherId) =>
{
  var metadata = {
     title,
     teacherId,
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

export const doUpdateCourseMeta = (courseKey, date, time, location, textbook, uid) => {

  var metadata = {
     date,
     time,
     location,
     textbook,
   }

  var updates = {}
  updates[`courses/${courseKey}/metadata/date`] = date
  updates[`courses/${courseKey}/metadata/time`] = time
  updates[`courses/${courseKey}/metadata/location`] = location
  updates[`courses/${courseKey}/metadata/textbook`] = textbook

  updates[`users/${uid}/courseTeaching/${courseKey}/metadata/date`] = date
  updates[`users/${uid}/courseTeaching/${courseKey}/metadata/time`] = time
  updates[`users/${uid}/courseTeaching/${courseKey}/metadata/location`] = location
  updates[`users/${uid}/courseTeaching/${courseKey}/metadata/textbook`] = textbook

  return db.ref().update(updates)

}

//publish course
export const doPublishCourse = (courseKey, isPublished) => {
  const status = isPublished
  console.log('db', courseKey, status);
  return db.ref(`courses/${courseKey}/metadata/`).update(status)
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
