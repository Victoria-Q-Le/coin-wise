import {initializeApp} from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'


const firebaseConfig = {
    apiKey: "AIzaSyAV-wbQqqJuRQLEIYH85Y7-qNYLi66--iM",
    authDomain: "coin-wise.firebaseapp.com",
    projectId: "coin-wise",
    storageBucket: "coin-wise.appspot.com",
    messagingSenderId: "553279337498",
    appId: "1:553279337498:web:b97788e14eba5f82f74da3"
};

const app = initializeApp(firebaseConfig)



const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, provider)

export const db = getFirestore(app)

export const auth = getAuth(app)