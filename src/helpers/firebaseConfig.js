import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyABa_zpdNeHfsi85RWuWE4QRaMKlD1GLiY',
  authDomain: 'swapi-db03f.firebaseapp.com',
  databaseURL: 'https://swapi-db03f.firebaseio.com',
  projectId: 'swapi-db03f',
  storageBucket: 'swapi-db03f.appspot.com',
  messagingSenderId: '641898057913',
  appId: '1:641898057913:web:964aa7dfd53258cde2cb68',
  measurementId: 'G-M9ZG8GLJSC',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;