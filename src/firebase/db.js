import {db} from './firebase';

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

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
