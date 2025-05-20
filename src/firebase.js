import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBJv43_LbDwE7B_YJiRx8VC1BvFY9eikIo",
    authDomain: "qazaqeduplus.firebaseapp.com",
    projectId: "qazaqeduplus",
    storageBucket: "qazaqeduplus.firebasestorage.app",
    messagingSenderId: "209193046720",
    appId: "1:209193046720:web:7b2903c9c680d3918e1325",
    measurementId: "G-1GJYBX70S0"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)



// const firebaseConfig = {
//     apiKey: "AIzaSyBJv43_LbDwE7B_YJiRx8VC1BvFY9eikIo",
//     authDomain: "qazaqeduplus.firebaseapp.com",
//     projectId: "qazaqeduplus",
//     storageBucket: "qazaqeduplus.firebasestorage.app",
//     messagingSenderId: "209193046720",
//     appId: "1:209193046720:web:7b2903c9c680d3918e1325",
//     measurementId: "G-1GJYBX70S0"
// };