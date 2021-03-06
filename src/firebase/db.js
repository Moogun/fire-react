import {fb, db, storage} from './firebase';

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
    console.log('uid, username, displayName', uid, username, displayName)
    const teachingList = db.ref(`teachingList/${uid}`)

    return teachingList.once('value').then(snap => {
      let updateObj = {}
      if (snap.val()) {
        console.log('db t list snap4');
        let cList = Object.keys(snap.val())
        console.log('db t list snap5');
        cList.forEach(cid => {
          updateObj[`teaching/${uid}/${cid}/metadata/tName`] = username
          updateObj[`teaching/${uid}/${cid}/metadata/lowercaseUsername`] = lowercaseUsername
          updateObj[`teaching/${uid}/${cid}/metadata/displayName`] = displayName
          updateObj[`courses/${cid}/metadata/tName`] = username
          updateObj[`courses/${cid}/metadata/lowercaseUsername`] = lowercaseUsername
          updateObj[`courses/${cid}/metadata/displayName`] = displayName
        })
      }

      updateObj[`users/${uid}/username`] = username
      updateObj[`users/${uid}/lowercaseUsername`] = lowercaseUsername
      updateObj[`users/${uid}/displayName`] = displayName
      // console.log('db t list updateObj', updateObj);
      return db.ref().update(updateObj)
    })
}

export const doUpdateUserPhoto = (uid, downloadURL) =>
  {
    const teachingList = db.ref(`teachingList/${uid}`)

    return teachingList.once('value').then(snap => {
      let updateObj = {}
      if (snap.val()) {
        console.log('db t list snap4');
        let cList = Object.keys(snap.val())
        console.log('db t list snap5');
        cList.forEach(cid => {
          updateObj[`teaching/${uid}/${cid}/metadata/tProfileImg`] = downloadURL
          updateObj[`courses/${cid}/metadata/tProfileImg`] = downloadURL
        })
      }

        updateObj[`users/${uid}/photoUrl`] = downloadURL
      return db.ref().update(updateObj)
    })

    // db.ref(`users/${uid}/`).update({ photoUrl: downloadURL })
  }


export const doSearchForUsername = (queryText) =>
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

//get my course
export const onceGetMyCourses = (uid) =>
  db.ref().child('attendingList').child(uid).once('value')

  // return teachingList.once('value').then(snap => {
  //   let updateObj = {}
  //   if (snap.val()) {
  //     console.log('db t list snap4');
  //     let cList = Object.keys(snap.val())
  //     console.log('db t list snap5');
  //     cList.forEach(cid => {
  //       updateObj[`teaching/${uid}/${cid}/metadata/tProfileImg`] = downloadURL
  //       updateObj[`courses/${cid}/metadata/tProfileImg`] = downloadURL
  //     })
  //   }
  //
  //     updateObj[`users/${uid}/photoUrl`] = downloadURL
  //   return db.ref().update(updateObj)
  // })



//course creation
export const doCreateCourse = (title, tid,  tEmail, tName, tDisplayName, tProfileImg,) =>
{
  var metadata = {
     title,
     tid,
     tEmail,
     tName,
     tDisplayName,
     tProfileImg,
     isPublished: false,
     readyToPublish: false,
     questionCount: 0,
   }
  return db.ref('courses').push({metadata})
}

export const doUpdateTeaching = (title, tid, tEmail, tName, tDisplayName, tProfileImg, cid) =>
{
  var updates = {}
  updates[`teaching/${tid}/${cid}/metadata/title`] = title
  updates[`teaching/${tid}/${cid}/metadata/tid`] = tid
  updates[`teaching/${tid}/${cid}/metadata/tEmail`] = tEmail
  updates[`teaching/${tid}/${cid}/metadata/tName`] = tName
  updates[`teaching/${tid}/${cid}/metadata/tDisplayName`] = tDisplayName
  updates[`teaching/${tid}/${cid}/metadata/tProfileImg`] = tProfileImg
  updates[`teaching/${tid}/${cid}/metadata/isPublished`] = false
  updates[`teaching/${tid}/${cid}/metadata/readyToPublish`] = false
  updates[`teaching/${tid}/${cid}/metadata/questionCount`] = 0

  updates[`teachingList/${tid}/${cid}`] = true
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
  // updates[`attending/${tid}/${cid}/attendee/${uid}`] = 1
  updates[`attendingList/${uid}/${cid}`] = true
  updates[`teaching/${tid}/${cid}/attendee/${uid}`] = true
  updates[`courses/${cid}/attendee/${uid}`] = true
  return db.ref().update(updates)
}



export const doSaveNewQ = (tid, cid, courseTitle, askedById, askedByUsername, askedByUserPhoto, title, text, createdAt, img) => {
  // add course title,
  // get push key
  // console.log('db askedByUsername is needed April 14', tid, cid, askedById, askedByUsername, askedByUserPhoto, title, text, createdAt, img);

  let answerCount = 0
  let timeStamp = fb.database.ServerValue.TIMESTAMP

  let question = {tid, cid, courseTitle, askedById, askedByUsername, askedByUserPhoto, title, text, timeStamp, answerCount}
  let qid = db.ref('questions').push().key

  console.log('qid');
  var updates = {}
  updates[`questions/${tid}/${cid}/${qid}`] = question
  updates[`questionsForT/${tid}/${qid}`] = question
  return db.ref().update(updates)
}

export const doDeleteQuestion = (tid,cid,qid) => {
  var updates = {}
    updates[`questions/${tid}/${cid}/${qid}`] = null
    updates[`questionsForT/${tid}/${qid}`] = null
  return db.ref().update(updates)
}

export const doSaveAnswer = (tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, timeStamp, img, aid)  => {
  // let timeStamp = fb.database.ServerValue.TIMESTAMP

  let answer = {tid, cid, qid, answeredById, answeredByUsername, answeredByUserPhoto, text, timeStamp, img}
  // let aid = db.ref('questions').push().key
    console.log('aid',aid);
    var updates = {}
    updates[`answers/${qid}/${aid}`] = answer
    updates[`questionsForT/${tid}/${qid}/answers/${aid}`] = answer

    return db.ref().update(updates)
}

export const doDeleteAnswer = (tid, qid,aid) => {
  var updates = {}
    updates[`answers/${qid}/${aid}`] = null
    updates[`questionsForT/${tid}/${qid}/answers/${aid}`] = null
  return db.ref().update(updates)
}

export const doFetchRecentQuestions = (tid, cid, FirstFive) => {
    return db.ref('questions').child(tid).child(cid).limitToLast(FirstFive)
}

export const doFetchQuestions = (tid, cid) => {
  return db.ref('questions').child(tid).child(cid).on('child_added', function(data) {
    console.log('data', data.val());
  });
}
//
export const doFetchQuestionsForT = (tid) => {
  return db.ref('questionsForT').child(tid).once('value')
}

export const doFetchNextQuestions = (tid, cid, lastQid, FiveMore) => {
  return db.ref('questions').child(tid).child(cid).orderByKey().endAt(lastQid).limitToLast(FiveMore)
}

//start at limist to first - not working
//start at limist to last - not working
//end at limist to first -  fetch from the oldest to the given num 1,2,3
//end at limist to last - 7 8 9
//limist to last - 7 8 9

// orderByKey().startAt(lastQid).limitToLast(3) 789 789
// orderByKey().startAt(lastQid).limitToFirst(3) 789 789
// .orderByKey().endAt(lastQid).limitToFirst(3) 123 123

// .orderByKey().endAt(lastQid).limitToLast(3) 567

// limi to last start at - not working
// orderbykey limi to last start at - 789 789

export const doSearchForQuestions = (tid, cid, queryText) => {
  return db.ref('questions').child(tid).child(cid).orderByChild('title').startAt(queryText).endAt(queryText+"\uf8ff").once('value')
}


export const doProfileImgUpload = (file, name) => {
  // console.log('file', file);
  return storage.ref(name).put(file)
}

export const doImgUpload = (file, name) => {
  console.log('file', file);
  var uploadTask = storage.ref().child('images').child(name).put(file)
}

export const doUpdateCourseImages = (tid, cid, newKey, fileName, downloadUrl, thumbnail, thumbnailWidth, thumbnailHeight, catpion, progress) => {

  var updates = {}
    updates[`courses/${cid}/images/${newKey}/fileName`] = fileName
    updates[`courses/${cid}/images/${newKey}/src`] = downloadUrl
    updates[`courses/${cid}/images/${newKey}/thumbnail`] = downloadUrl
    updates[`courses/${cid}/images/${newKey}/thumbnailWidth`] = thumbnailWidth
    updates[`courses/${cid}/images/${newKey}/thumbnailHeight`] = thumbnailHeight
    updates[`courses/${cid}/images/${newKey}/catpion`] = catpion
    updates[`courses/${cid}/images/${newKey}/progress`] = progress

    updates[`teaching/${tid}/${cid}/images/${newKey}/fileName`] = fileName
    updates[`teaching/${tid}/${cid}/images/${newKey}/src`] = downloadUrl
    updates[`teaching/${tid}/${cid}/images/${newKey}/thumbnail`] = downloadUrl
    updates[`teaching/${tid}/${cid}/images/${newKey}/thumbnailWidth`] = thumbnailWidth
    updates[`teaching/${tid}/${cid}/images/${newKey}/thumbnailHeight`] = thumbnailHeight
    updates[`teaching/${tid}/${cid}/images/${newKey}/catpion`] = catpion
    updates[`teaching/${tid}/${cid}/images/${newKey}/progress`] = progress
  return db.ref().update(updates)
}

export const doRemoveCourseImage = (tid, cid, newKey, fileName) => {
  console.log('tid, cid, newKey, fileName', tid, cid, newKey, fileName);
  var updates = {}
    updates[`courses/${cid}/images/${newKey}`] = null
    updates[`teaching/${tid}/${cid}/images/${newKey}/`] = null
  return db.ref().update(updates)
}

export const newKey = () => {
  return db.ref('courses').push().key
}

export const doCreateQuiz = (tid, qid, title,) =>
{
  console.log('do create quiz', tid, qid, title);
  let questionCount = 0
  var metadata = {title, questionCount, tid}
  var updates = {}
  updates[`quizzes/${qid}/metadata`] = metadata
  updates[`quizzesForT/${tid}/${qid}/metadata`] = metadata
  return db.ref().update(updates)
}

//DASHBOARD
export const doFetchAllQuizzes = (tid,) => db.ref('quizzesForT').child(tid).once('value')

// QUIZ EDIT get multiple courses
export const onceGetQuiz = (qid) => db.ref('quizzes').child(qid).once('value')

export const doUpdateQuizMeta = (tid, qid, title, instruction) => {
  let quizInstruction = instruction ? instruction : ''

  var updates = {}
    updates[`quizzes/${qid}/metadata/title`] = title
    updates[`quizzes/${qid}/metadata/instruction`] = quizInstruction

    updates[`quizzesForT/${tid}/${qid}/metadata/title`] = title
    updates[`quizzesForT/${tid}/${qid}/metadata/instruction`] = quizInstruction
  return db.ref().update(updates)
}

export const doSaveQuizQuestions = (tid, qid, quiz) => {
  var updates = {}
    updates[`quizzes/${qid}/metadata/questionCount`] = quiz.length
    updates[`quizzes/${qid}/questions`] = quiz
    updates[`quizzesForT/${tid}/${qid}/metadata/questionCount`] = quiz.length
    updates[`quizzesForT/${tid}/${qid}/questions`] = quiz
  return db.ref().update(updates)
}

export const doDeleteQuiz = (tid, qid, ) => {
  var updates = {}
    updates[`quizzes/${qid}/`] = null
    updates[`quizzesForT/${tid}/${qid}/`] = null
  return db.ref().update(updates)
}

export const doSaveQuizEntry = (cid, curriSecIndex, lecIndex, entry) => {
  var updates = {}
    updates[`courses/${cid}/curri/${curriSecIndex}/content/${lecIndex}/quiz/`] = entry
  return db.ref().update(updates)
}
