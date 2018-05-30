import * as firebase from 'firebase';

var config = {
   apiKey: "AIzaSyCpvlBi5EtSPtx5ykJ6m78xLzF4cTEpEI0",
   authDomain: "router-41378.firebaseapp.com",
   databaseURL: "https://router-41378.firebaseio.com",
   projectId: "router-41378",
   storageBucket: "router-41378.appspot.com",
   messagingSenderId: "325279197623"
 };

if (!firebase.apps.length) {
 firebase.initializeApp(config);
}

const fb = firebase
const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.FacebookAuthProvider();
const db = firebase.database();
const storage = firebase.storage();
const messaging = firebase.messaging();

messaging.requestPermission()
  .then(() => handleTokenRefresh())
  // .then(() => checkSubscription())
  .catch((err) => {
    console.log("error getting permission :(");
  });

  function handleTokenRefresh() {
    let uid = auth.currentUser.uid
    return messaging.getToken().then((token) => {
      var updates = {}
      updates[`users/${uid}/token`] = token
      db.ref().update(updates)
    });
  }

  // function checkSubscription() {
  //   db.ref('/tokens').orderByChild("uid").equalTo(auth.currentUser.uid).once('value').then((snapshot) => {
  //     if ( snapshot.val() ) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log('none');
  //     }
  //   });
  // }



export {
  fb,
  auth,
  google,
  facebook,
  db,
  storage,
  messaging,
}
