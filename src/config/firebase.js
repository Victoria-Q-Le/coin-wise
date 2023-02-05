import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV6_t7nHjI2o1bTWJ1DhKkEVir_TFnn2g",
  authDomain: "coin-wise-90574.firebaseapp.com",
  projectId: "coin-wise-90574",
  storageBucket: "coin-wise-90574.appspot.com",
  messagingSenderId: "24885451140",
  appId: "1:24885451140:web:a13251a503521799c265d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)