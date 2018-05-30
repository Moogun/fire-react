const functions = require('firebase-functions');
// const gcs = require('@google-cloud/storage')()
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.bigben = functions.https.onRequest((req, res) => {
  const hours = (new Date().getHours() % 12) + 1 // london is UTC + 1hr;
  res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});

exports.makeUppercase = functions.database.ref('/users/{uid}/username')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.uid, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });

// Keeps track of the length of the 'likes' child list in a separate property.
// exports.countQuestion = functions.database.ref('/posts/{postid}/likes/{likeid}').onWrite(
exports.countQuestion = functions.database.ref('/questions/{tid}/{cid}/{qid}').onWrite(
    (change, context) => {
      // const collectionRef = change.after.ref.parent;
      // const countRef = collectionRef.parent.child('questions_count');

      let tid = context.params.tid
      let cid = context.params.cid

      const promises = [];

      const countRef = admin.database().ref(`/courses/${cid}/metadata/questionCount`)
      const original = change.after.val();
      console.log('Uppercasing', context.params.tid, original);

      let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

      const prom1 = countRef.transaction(current => {
           return (current || 0) + increment;
        });
      const prom2 = admin.database().ref(`/teaching/${tid}/${cid}/metadata/questionCount`).transaction(current => {
           return (current || 0) + increment;
         });
      return Promise.all([prom1, prom2])
      .then(() => {
        return console.log('Counter updated.');
      });

      // Return the promise from countRef.transaction() so our function
      // waits for this async event to complete before it exits.
    //   return countRef.transaction((current) => {
    //     return (current || 0) + increment;
    //   }).then(() => {
    //     return console.log('Counter updated.');
    //   });
    });

// If the number of likes gets deleted, recount the number of likes
// exports.recountQuestions = functions.database.ref('/questions/{postid}/likes_count').onDelete((snap) => {
//   const counterRef = snap.ref;
//   const collectionRef = counterRef.parent.child('likes');
//
//   // Return the promise from counterRef.set() so our function
//   // waits for this async event to complete before it exits.
//   return collectionRef.once('value')
//       .then((messagesData) => counterRef.set(messagesData.numChildren()));
// });

exports.countAnswer = functions.database.ref('/questionsForT/{tid}/{qid}/answers/{aid}').onWrite(
    (change, context) => {
      const collectionRef = change.after.ref.parent;

      const original = change.after.val();

      let cid
      if (original !== null) {
        cid = original['cid']
      } else {
        cid = change.before.val()['cid']
      }
      console.log('cid', cid);
      let tid = context.params.tid
      let qid = context.params.qid
      let aid = context.params.aid

      const promises = [];
      // const countRef = admin.database().ref(`/questions/${tid}/${cid}/${qid}`)
      const countRef = admin.database().ref(`/questionsForT/${tid}/${qid}/answerCount`)

      let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

      const prom1 = countRef.transaction(current => {
           return (current || 0) + increment;
        });
      const prom2 = admin.database().ref(`/questions/${tid}/${cid}/${qid}/answerCount`).transaction(current => {
           return (current || 0) + increment;
         });
      return Promise.all([prom1, prom2])
      .then(() => {
        return console.log('Counter updated.');
      });

    });

  exports.countAttendee = functions.database.ref('/teaching/{tid}/{cid}/attendee/{uid}').onWrite(
      (change, context) => {
        // const collectionRef = change.after.ref.parent;
        // const countRef = collectionRef.parent.child('questions_count');

        let tid = context.params.tid
        let cid = context.params.cid

        const promises = [];

        const countRef = admin.database().ref(`/courses/${cid}/metadata/attendeeCount`)
        const original = change.after.val();
        // console.log('Uppercasing', context.params.tid, original);

        let increment;
        if (change.after.exists() && !change.before.exists()) {
          increment = 1;
        } else if (!change.after.exists() && change.before.exists()) {
          increment = -1;
        } else {
          return null;
        }

        const prom1 = countRef.transaction(current => {
             return (current || 0) + increment;
          });
        const prom2 = admin.database().ref(`/teaching/${tid}/${cid}/metadata/attendeeCount`).transaction(current => {
             return (current || 0) + increment;
           });
        return Promise.all([prom1, prom2])
        .then(() => {
          return console.log('Counter updated.');
        });

      });

exports.processFile = functions.storage.object().onFinalize((object, context) => {
  const filePath = object.name;
  const contentType = object.contentType;
  console.log('File change detected, function execution started');

  if (object.resourceState === 'not_exists') {
      console.log('We deleted a file, exit...');
      return;
  }
});
