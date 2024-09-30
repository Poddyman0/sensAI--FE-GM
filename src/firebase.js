// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTuHbvVEuDon9j7v1bAQmLxTmrL8SNEn8',
  authDomain: 'sensai-5ded5.firebaseapp.com',
  projectId: 'sensai-5ded5',
  storageBucket: 'sensai-5ded5.appspot.com',
  messagingSenderId: '1071236229449',
  appId: '1:1071236229449:web:b330379a139befae7cd298',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
