// https://console.firebase.google.com/u/0/project/aaa01-6d50e/authentication/users

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"
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
const analytics = getAnalytics(app);

//Cadastro

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

// Initialize Firebase
/*const app = initializeApp(firebaseConfig);
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