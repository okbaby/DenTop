import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyCSfwDG1HgLd7gKoOjYJv6fGosYMBqcDiQ",
    authDomain: "dentop-186919.firebaseapp.com",
    databaseURL: "https://dentop-186919.firebaseio.com",
    projectId: "dentop-186919",
    storageBucket: "dentop-186919.appspot.com",
    messagingSenderId: "528587870215"
};

let configFirebase = firebase.initializeApp(config, 'secondary');

export default configFirebase;
