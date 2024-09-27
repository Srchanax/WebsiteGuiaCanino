const express = require('express')
const router = express.Router()
//const bcrypt = require('bcrypt') //isso serve pra efetuar a criptografia, nao deletar

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const bcrypt = require('bcrypt');

//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

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

router.get('/', function(req, res) {
  res.render('cadastro')
})

// Rota para adicionar usuário ao Firebase
router.post('/', async (req, res) => {
  const { email, pass } = req.body;
  try {
    const auth = getAuth();
    const db = getFirestore();
    console.log(email, pass);
    const hashedPassword = await bcrypt.hash(pass, 10); // esse hash vai deixar mais seguro
    
    createUserWithEmailAndPassword(auth, email, hashedPassword).then((userCredential) => {
      const user = userCredential.user;
        const userData = {
          email: email,
          password: hashedPassword
        };
        //alert('Cadastro realizado com sucesso!', 'sucess');
        const docRef = doc(db, "user", user.uid);
        setDoc(docRef, userData).then(() => {
          res.redirect("/login")
        })
        .catch((error) => {
        console.log('Error ao escrever documento: ', error);
        });
      })
      .catch((error) => {
        const errorcode = error.code;
        if(errorcode == 'auth/email-already-in-use'){
          console.log('Email já cadastrado!');
        } else {
          console.log(error);
        }
      })
  } catch (error) {
    console.log(error);
  }
  
});

/*

// Handle registration form submissions
router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const usersCollection = req.mongoClient.db('db').collection('col');

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10); // esse hash vai deixar mais seguro

    // Save the user with the hashed password
    await usersCollection.insertOne({ name, password: hashedPassword });

    // Redirect to the login page or main menu page
    res.redirect('/login'); // tbm podia ser o main menu
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

*/

module.exports = router;