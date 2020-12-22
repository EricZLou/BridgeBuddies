import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
  apiKey: "AIzaSyAUrHjLAsNYF7rlJSdWfp5illkXkQH37xk",
  authDomain: "bridgebuddies-b2de6.firebaseapp.com",
  projectId: "bridgebuddies-b2de6",
  storageBucket: "bridgebuddies-b2de6.appspot.com",
  messagingSenderId: "879848527626",
  appId: "1:879848527626:web:eea198a926b1424eda4cf3",
  measurementId: "G-5XK225RR1K"
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
