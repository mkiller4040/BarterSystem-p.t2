import firebase from 'firebase'

require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBfoxGTYdxBgSJOQYWpGFsEsSheSm8vG_0",
    authDomain: "barter-system-88b4f.firebaseapp.com",
    projectId: "barter-system-88b4f",
    storageBucket: "barter-system-88b4f.appspot.com",
    messagingSenderId: "268634670109",
    appId: "1:268634670109:web:8a680a7e1563219c17f2f4",
    measurementId: "G-Y1GB6EDLCW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase.firestore()