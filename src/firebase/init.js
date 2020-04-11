import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAHG_lbysk8ToJ8y5zG_Bnkf1JabRdAwow",
  authDomain: "track-acquintances.firebaseapp.com",
  databaseURL: "https://track-acquintances.firebaseio.com",
  projectId: "track-acquintances",
  storageBucket: "track-acquintances.appspot.com",
  messagingSenderId: "338217467430",
  appId: "1:338217467430:web:b375c96b925db8370cf0e7",
  measurementId: "G-FXSMXZRRNY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase.firestore()