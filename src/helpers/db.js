import firebase from "./firebaseConfig";

const db = firebase.database().ref('favoriteList');

export default db;