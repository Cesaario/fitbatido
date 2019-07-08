import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBYLa7oyZMiMjPPLUQ9TS9gixx2ebd8BmI",
    authDomain: "fitbatido-2d79f.firebaseapp.com",
    databaseURL: "https://fitbatido-2d79f.firebaseio.com",
    projectId: "fitbatido-2d79f",
    storageBucket: "fitbatido-2d79f.appspot.com",
    messagingSenderId: "302940530760",
    appId: "1:302940530760:web:96fef5af771db5d7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;