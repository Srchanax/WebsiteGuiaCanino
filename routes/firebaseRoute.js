const express = require('express');
const router = express.Router();
/*
const admin = require('firebase-admin');

// Inicializa o Firebase
const serviceAccount = require('../serviceKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://auth-users-guia-canino-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Rota para exibir o formulário
router.get('/', (req, res) => {
    res.render('login');
});

// Rota para adicionar usuário ao Firebase
router.post('/add-user', (req, res) => {
    const { username, email } = req.body;
    const ref = db.ref('users').push();

    ref.set({
        username: username,
        email: email
    })
    .then(() => {
        res.send('Usuário adicionado com sucesso!');
    })
    .catch((error) => {
        res.send('Erro ao adicionar usuário: ' + error);
    });
});
*/

const initializeApp = require('firebase/app').initializeApp;
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
const getAuth = require('firebase/auth').getAuth;
const createUserWithEmailAndPassword = require('firebase/auth').createUserWithEmailAndPassword;


//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
//import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
//import { log } from "console";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//Cadastro
router.post('/add', (req, res) => {
    const { email, pass } = req.body;

    const auth = getAuth();
    const db = getFirestore();
    
    createUserWithEmailAndPassword(auth, email, pass).then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          email: email,
          password: pass
        };
        alert('Cadastro realizado com sucesso!', 'sucess');
        const docRef = doc(db, "user", user.uid);
        setDoc(docRef, userData).then(() => {
          window.location.href = "/views/login.ejs";
        })
        .catch((error) => {
        console.log('Error ao escrever documento: ', error);
        });
      })
      .catch((error) => {
        const errorcode = error.code;
        if(errorcode == 'auth/email-already-in-use'){
          alert('Email já cadastrado!', 'error');
        } else {
          alert('Erro ao cadastrar usuário: ', 'error');
        }
      })

});

/*
const signUp = document.getElementById('SubmitSignUp')
signUp.addEventListener('click', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    const userData = {
      email: email,
      password: password
    };
    alert('Cadastro realizado com sucesso!', 'sucess');
    const docRef = doc(db, "user", user.uid);
    setDoc(docRef, userData).then(() => {
      window.location.href = "/views/login.ejs";
    })
    .catch((error) => {
    console.log('Error ao escrever documento: ', error);
    });
  })
  .catch((error) => {
    const errorcode = error.code;
    if(errorcode == 'auth/email-already-in-use'){
      alert('Email já cadastrado!', 'error');
    } else {
      alert('Erro ao cadastrar usuário: ', 'error');
    }
  })
});
*/

/*
// Initialize Firebase
const app = initializeApp(firebaseConfig);
function SignUp(){
  const auth = getAuth();
  console.log("Iniciando processo de registro...");

  auth.createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("pass").value)
  .then(function(userCredential){
    console.log("Usuário criado:", userCredential);
    alert("Seus dados foram salvos com sucesso!");
    const user = userCredential.user;

    document.getElementById("email").value = '';
    document.getElementById("pass").value = '';

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    SignUp(userRef, { email: document.getElementById("email").value });

  }).catch(function(error){
    console.error("Erro ao cadastrar:", error);
    alert("Falha ao cadastrar!");
  });

}



const analytics = getAnalytics(app);

document.getElementById('submitSignUp').addEventListener('click', () => {
  SignUp();
});
*/

module.exports = router;