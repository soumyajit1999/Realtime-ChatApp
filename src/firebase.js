import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAH9yREDjwO2cbhe6Q-on1Fe1HP2bhTgao",
    authDomain: "soupify-chatapp.firebaseapp.com",
    databaseURL: "https://soupify-chatapp.firebaseio.com",
    projectId: "soupify-chatapp",
    storageBucket: "soupify-chatapp.appspot.com",
    messagingSenderId: "214775550710",
    appId: "1:214775550710:web:0f29e9f3beed4cd1ea12d7",
    measurementId: "G-0M4RBRHZEG"
  });

  const db = firebaseApp.firestore();

  export default db;