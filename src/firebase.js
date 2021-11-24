import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC-El-kN1ruZORvNdTOpquUECD-mJEhGqw",
  authDomain: "aksha-zharaty-test.firebaseapp.com",
  databaseURL: "https://aksha-zharaty-test.firebaseio.com",
  projectId: "aksha-zharaty-test",
  storageBucket: "aksha-zharaty-test.appspot.com",
  messagingSenderId: "921219179004",
  appId: "1:921219179004:web:a3a7844cae4b773f4d5279",
  measurementId: "G-KV5FQDMB97",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()

export const auth = firebase.auth()

export default db;
