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

const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();
const facebook = new firebase.auth.FacebookAuthProvider();
const db = firebase.database();
const storage = firebase.storage();
const msg = firebase.messaging();

export {
  auth,
  google,
  facebook,
  db,
  storage,
  msg,
}
