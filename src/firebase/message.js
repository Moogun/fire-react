import {messaging, db} from './firebase';

export const doRequestPermission = () => messaging.requestPermission()
 .then(() => console.log('1');)
 .then(() => console.log('2');)
 .catch((err) => {
    console.log("error getting permission :(");
  });



  // function handleTokenRefresh() {
  //   return messaging.getToken().then((token) => {
  //     FIREBASE_DATABASE.ref('/tokens').push({
  //       token: token,
  //       uid: FIREBASE_AUTH.currentUser.uid
  //     });
  //   });
  // }
  //
  // function checkSubscription() {
  //   FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value').then((snapshot) => {
  //     if ( snapshot.val() ) {
  //       subscribeButton.setAttribute("hidden", "true");
  //       unsubscribeButton.removeAttribute("hidden");
  //     } else {
  //       unsubscribeButton.setAttribute("hidden", "true");
  //       subscribeButton.removeAttribute("hidden");
  //     }
  //   });
  // }
