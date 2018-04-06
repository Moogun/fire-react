import {db, storage} from './firebase';

export const doCreateUser = (id, username, email, providerName, photoURL) =>
  {
    let displayName = providerName.length > 0 ? providerName : ''
    let photoUrl = photoURL.length > 0 ? photoURL : ''
    let lowercaseUsername = username.toLowerCase()

    return db.ref(`users/${id}`).set({
    username,
    email,
    displayName,
    lowercaseUsername,
    photoUrl,
  });}

export const doUpdateUserProfile = (uid, username, displayName) =>
  {
    let lowercaseUsername = username.toLowerCase()

    return db.ref(`users/${uid}`).update({
    username,
    displayName,
    lowercaseUsername,
  });}

export const doUpdateUserPhoto = (uid, downloadURL) =>
  db.ref(`users/${uid}/`).update({ photoUrl: downloadURL })


export const doSearchForUsername = (queryText) =>
  // db.ref('users').orderByChild('lowercaseUsername').startAt(queryText.toLowerCase()).endAt(queryText.toLowerCase()+"\uf8ff").once('value')
  db.ref('users').orderByChild('lowercaseUsername').equalTo(queryText.toLowerCase()).once('value')


export const onceGetUsers = () =>
  db.ref('users').once('value');

  //get 1 user
export const onceGetUser = (uid) =>
  db.ref('users').child(uid).once('value');


//query
export const onceGetUserWithName = (tName) =>
  db.ref('users').orderByChild("username").equalTo(tName).limitToFirst(1).once("value");

export const onceGetCourseWithTitle = (cTitle) =>
  db.ref('courses').orderByChild("/metadata/title").equalTo(cTitle).limitToFirst(1).once("value");


//get multiple courses
export const onceGetCourses = () =>
  db.ref('courses').limitToFirst(20).once('value');

export const onceGetPublishedCourses = () =>
  db.ref('courses').orderByChild("/metadata/isPublished").equalTo(true).limitToFirst(20).once('value');

//get 1 course
export const onceGetCourse = (courseKey) =>
  db.ref('courses').child(courseKey).once('value');

//course creation
export const doCreateCourse = (title, tid, tName, tProfileImg, tEmail) =>
{
  var metadata = {
     title,
     tid,
     tName,
     tProfileImg,
     tEmail,
     isPublished: false,
     readyToPublish: false,
   }
  return db.ref('courses').push({metadata})
}

export const doUpdateTeaching = (title, tid, cid, tName, tProfileImg, tEmail) =>
{
  var updates = {}
  updates[`teaching/${tid}/${cid}/metadata/title`] = title
  updates[`teaching/${tid}/${cid}/metadata/tid`] = tid
  updates[`teaching/${tid}/${cid}/metadata/tName`] = tName
  updates[`teaching/${tid}/${cid}/metadata/tProfileImg`] = tProfileImg
  updates[`teaching/${tid}/${cid}/metadata/tEmail`] = tEmail
  updates[`teaching/${tid}/${cid}/metadata/isPublished`] = false
  updates[`teaching/${tid}/${cid}/metadata/readyToPublish`] = false
  return db.ref().update(updates)
}


export const doUpdateCourseTitle = (tid, cid, title, subTitle) =>
{
  var updates = {}
  updates[`courses/${cid}/metadata/title`] = title
  updates[`courses/${cid}/metadata/subTitle`] = subTitle

  updates[`teaching/${tid}/${cid}/metadata/title`] = title
  updates[`teaching/${tid}/${cid}/metadata/subTitle`] = subTitle

  return db.ref().update(updates)
}

export const doUpdateCourseMeta = (tid, cid, textbook, date, time, location) => {

  var updates = {}
  updates[`courses/${cid}/metadata/textbook`] = textbook
  updates[`courses/${cid}/metadata/date`] = date
  updates[`courses/${cid}/metadata/time`] = time
  updates[`courses/${cid}/metadata/location`] = location

  updates[`teaching/${tid}/${cid}/metadata/textbook`] = textbook
  updates[`teaching/${tid}/${cid}/metadata//date`] = date
  updates[`teaching/${tid}/${cid}/metadata/time`] = time
  updates[`teaching/${tid}/${cid}/metadata/location`] = location

  return db.ref().update(updates)
}

export const doUpdateFeatures = (tid, cid, features) => {
  var updates = {}
  updates[`courses/${cid}/features/`] = features
  updates[`teaching/${tid}/${cid}/features/`] = features
  return db.ref().update(updates)
}

export const doUpdateCourseCurri = (tid, cid, curri) => {
  var updates = {}
  updates[`courses/${cid}/curri/`] = curri
  updates[`teaching/${tid}/${cid}/curri/`] = curri
  return db.ref().update(updates)
}

export const doUpdateCoursePrivacy = (tid, cid, openCourse, password) => {
  console.log('open', cid, tid, openCourse, password);

  var updates = {}
  if (openCourse) {
    // console.log('tr', openCourse);
    updates[`courses/${cid}/metadata/openCourse`] = openCourse
    updates[`courses/${cid}/metadata/password`] = ''
    updates[`teaching/${tid}/${cid}/metadata/openCourse`] = openCourse
    updates[`teaching/${tid}/${cid}/metadata/password`] = ''
  } else {
    // console.log('false',openCourse);
    updates[`courses/${cid}/metadata/openCourse`] = openCourse
    updates[`courses/${cid}/metadata/password`] = password
    updates[`teaching/${tid}/${cid}/metadata/openCourse`] = openCourse
    updates[`teaching/${tid}/${cid}/metadata/password`] = password
  }

  return db.ref().update(updates)

}

//publish course
export const doPublishCourse = (tid, cid, isPublished) => {

  var updates = {}

  if (isPublished === true) {
    updates[`courses/${cid}/metadata/isPublished`] = false
    updates[`teaching/${tid}/${cid}/metadata/isPublished`] = false
  } else {
    updates[`courses/${cid}/metadata/isPublished`] = true
    updates[`teaching/${tid}/${cid}/metadata/isPublished`] = true
  }
  return db.ref().update(updates)
}

export const doRemoveCourse = (tid, cid) => {
  var updates = {}
  updates[`courses/${cid}/`] = null
  updates[`teaching/${tid}/${cid}/`] = null
  return db.ref().update(updates)
}

export const doFetchTeaching = (tid) => {
  return db.ref('teaching').child(tid).limitToFirst(10).once('value')
}

export const doEnrollInCourse = (tid, cid, password, uid) => {
  console.log('db', tid, cid, password, uid);
  var updates = {}
  updates[`attending/${tid}/${cid}/attendee/${uid}`] = 1
  return db.ref().update(updates)
}

export const doSaveNewQ = (tid, cid, askedBy, title, text, createdAt, img) => {
  console.log('db', tid, cid, askedBy, title, text, createdAt, img);
  return db.ref('questions').child(tid).push({tid, cid, askedBy, title, text, createdAt})
}

export const doSaveAnswer = (tid, cid, qid, answeredBy, text, createdAt, img) => {
  console.log('db', tid, cid, qid, answeredBy, text, createdAt, img);
  var answer = {answeredBy, text, createdAt, img}
  return db.ref('questions').child(tid).child(qid).child('answers').push(answer)
}

export const doFetchRecentQuestions = (tid) => {
  return db.ref('questions').child(tid).limitToFirst(10).once('value')
}

export const doSearchForQuestions = (tid, queryText) => {
  return db.ref('questions').child(tid).orderByChild('title').startAt(queryText).endAt(queryText+"\uf8ff").once('value')
}


export const doProfileImgUpload = (file, name) => {
  // console.log('file', file);
  return storage.ref(name).put(file)
}

export const doImgUpload = (file, name) => {
  console.log('file', file);
  var uploadTask = storage.ref().child('images').child(name).put(file)
}

export const doUpdateCourseImages = (tid, cid, newKey, downloadsUrl) => {

  var updates = {}
    updates[`courses/${cid}/images/${newKey}`] = downloadsUrl
    updates[`teaching/${tid}/${cid}/images/${newKey}`] = downloadsUrl
  return db.ref().update(updates)
}

export const newKey = () => {
  return db.ref('courses').push().key
}
