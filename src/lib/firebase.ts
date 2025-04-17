// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtjYo20DrzNA_Oi8-x12LqxMM32zWWVWw",
    authDomain: "se-project-521ce.firebaseapp.com",
    projectId: "se-project-521ce",
    storageBucket: "se-project-521ce.firebasestorage.app",
    messagingSenderId: "58063373671",
    appId: "1:58063373671:web:e3f0b83a9dca92b6ca5bc2",
    measurementId: "G-BY0WWK2LB0"
  };
  
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
