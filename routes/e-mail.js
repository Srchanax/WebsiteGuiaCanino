const express = require('express')
const router = express.Router()

const { initializeApp } = require('firebase-admin/app');
const { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

/*
const firebaseConfig = {
  apiKey: "AIzaSyAlJRuOMmhX7-23HqK8-4zwyBOVB2BtL8M",
  authDomain: "aaa01-6d50e.firebaseapp.com",
  databaseURL: "https://aaa01-6d50e-default-rtdb.firebaseio.com",
  projectId: "aaa01-6d50e",
  storageBucket: "aaa01-6d50e.appspot.com",
  messagingSenderId: "112590453924",
  appId: "1:112590453924:web:7bd30c395f9acd418ffa31",
  measurementId: "G-MXFNG40JJJ"
};

const app = initializeApp(firebaseConfig);
*/

router.get('/', function(req, res, next) {
  res.render('e-mail')
})

router.post('/', async function(req, res, next){
  try {
    const auth = getAuth();
    const db = getFirestore();
    const email = req.body.emailRec;

    sendPasswordResetEmail(auth, email)
      .then( () => {
        console.log("Um link para resetar senha foi enviado para o email informado.")
      })
      .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
      })
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
  
  //Quando Esqueceu é clicado, executa a função Forgot
  
})

module.exports = router;