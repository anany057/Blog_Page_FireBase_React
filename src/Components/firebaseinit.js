// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhDhJICl0NpytTqUs3vHdaGjMZWOZGBPk",
  authDomain: "blogging-app-927dd.firebaseapp.com",
  projectId: "blogging-app-927dd",
  storageBucket: "blogging-app-927dd.appspot.com",
  messagingSenderId: "101650406840",
  appId: "1:101650406840:web:3cb1c2c3df086ed53b834d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//storing the service getfirestore


