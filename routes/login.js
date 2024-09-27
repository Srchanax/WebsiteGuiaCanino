const express = require('express')
const router = express.Router()

//const firebase = require('firebase/app');
//const { initializeApp, applicationDefault, cert } = require('firebase/app');
require('firebase/firestore');
const { getFirestore, doc, getDoc, updateDoc, collection, query, where, getDocs } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } = require("firebase/auth") 
const { signInWithPopup, GoogleAuthProvider } = require("firebase/auth")
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('login')
})

router.get("/token", async function(req, res) {
  console.log("A");
  try {
    console.log("B");
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    const auth = getAuth();
    auth.useDeviceLanguage();

    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });

    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("token → " + token)
      // The signed-in user info.
      const user = result.user;
      console.log("user → " + user)

      const data = {
        "user → " : user,
        "token → " : token
      };

      res.json(data)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);

      const data = {
        "errorCode → " : errorCode,
        "errorMessage → " : errorMessage,
        "email → " : email,
        "credential → " : credential
      }
      // ...
    });
  } catch (err) {
    res.json("Error → " + err.message)
  }
})

router.post('/', async (req, res) => {
  const { email, pass } = req.body;
  const auth = getAuth();
  try {
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let pas = ""
    querySnapshot.forEach((doc) => {
      pas = doc.data().password;
    });
    console.log(pas)
    
    const match = await bcrypt.compare(pass, pas);
    console.log(match)
    if(match){
      signInWithEmailAndPassword(auth, email, pas)
      .then((userCredential) => {

        console.log('Login realizado com sucesso!');

        const user = userCredential.user;

        /* Usando localStorage */
        const userID = user.uid;
        if (typeof localStorage === "undefined" || localStorage === null) {
          var LocalStorage = require('node-localstorage').LocalStorage;
          localStorage = new LocalStorage('./scratch');
          console.log()
        }
        localStorage.setItem('myFirstKey', 'myFirstValue');
        console.log(localStorage.getItem('myFirstKey'));
        localStorage.setItem('userID', userID);
        console.log('ID do usuário:', userID);

        //res.json({ userID });

        res.redirect("/perfil")
      })
      .catch((error) => {
        console.log(error);
      })
    } else {
      res.json("Senha incorreta");
    }
  } catch(error) {
    console.log("error in post(/login) → " + error)
  }
/*
  // Esqueceu a senha inicio
  
  // Pega emailHelp em login.ejs
  let EmailHelp = document.getElementById('emailHelp')
  // Pega o esqueceusenha em login.ejs
  let Esqueceu = document.getElementById('esqueceusenha');

  // Pega oque está armazenado em EmailHelp e executa o sendPasswordResetEmail

  const Forgot = () => {
    sendPasswordResetEmail(auth, EmailHelp.value).then( () => {
      console.log("Um link para resetar senha foi enviado para o email informado.")
    })
    .catch((error)=>{
      console.log(error.code);
      console.log(error.message);
    })
  }

  //Quando Esqueceu é clicado, executa a função Forgot

  Esqueceu.addEventListner("click", () => {
    Forgot();
  })

  // Fim do EsqueceuSenha
*/
});

router.get('/getU/:email', async (req, res) => {

  try {
    
    const email = req.params.email;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty){
      return res.json("User not found");
    }
    
    querySnapshot.forEach((doc) => {
      res.json(doc.data().email);  
    });
    
    // TESTE DE GET DATA
    /*
    // get data whit the doc name
    const docRef = doc(db, "user", "1IDW8k38MSSngKqY9FFUIetoBoD3");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    */
    /*
    // Get all data from the "users" collection
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      console.log(doc.id, " => ", doc.data().email);
     
    });
    */
  } catch(error) {
    console.log("catched error :" + error)
  }
  
})

router.get('/getUser/:email', async (req, res) => {

  try {

    const email = req.params.email;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty){
      return res.json("User not found");
    }
    querySnapshot.forEach((doc) => {
      res.json(doc.data());  
    });
  } catch(error) {
    console.log("catched error :" + error)
  }

})

router.get('/getP/:email/:pass', async (req, res) => {

  try {
    const email = req.params.email;
    const pass = req.params.pass;
    const db = getFirestore();
    // get a doc with a query
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let pas = true
    querySnapshot.forEach((doc) => {
      pas = doc.data().password;
    });
    console.log(typeof pass)
    console.log(typeof pas)
    const match = await bcrypt.compare(pass, pas);

    if(match){
      console.log(typeof match)
      res.json("Senha correta");
    } else {
      res.json("Senha incorreta");
    }
    
  } catch(error) {
    console.log("catched error a:" + error)
  }

})

router.get('/recovery', function(req, res, next) {
  res.render('loginRec')
})

router.post("/recovery", async function(req, res) {
  const email = req.body.email;
  const newPass = req.body.pass;
  const db = getFirestore();
  
  try {
    const q = query(collection(db, "user"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty){
      return res.json("User not found");
    }
    let userId = ""
    querySnapshot.forEach((doc) => {
      userId = doc.id;  
    });

    const hashedNewPass = await bcrypt.hash(newPass, 10);
    
    const userDocs = doc(db, "user", userId);
    await updateDoc(userDocs, {
      password: hashedNewPass
    });

    res.redirect("/login")
  } catch (error) {
    console.log("error in post(/recovery) → " + error)
  }
  
  
})

module.exports = router;

/*

// OAuth?
// https://www.youtube.com/watch?v=Q0a0594tOrc

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const { OAuth2Client } = require('google-auth-library');
const oauth2Client = new OAuth2Client()

const app = express();

// Enable CORS for all routes
app.use(cors());
  app.post('/auth', async (req, res) => {
    try {
      const code = req.headers.authorization;
      console.log('Authorization Code:', code);

      // Exchange the authorization code for an access token
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: '58730156701-d27fqgjb0.apps.googleusercontent.com',
          client_secret: 'GOCSPX-u02eNiucPXxRAsQVi',
          redirect_uri: 'postmessage',
          grant_type: 'authorization_code'
        }
      );
      const accessToken = response.data.access_token;
      console.log('Access Token:', accessToken);

      // Fetch user details using the access token
      const userResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const userDetails = userResponse.data;
      console.log('User Details:', userDetails);

      // Process user details and perform necessary actions

      res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
      console.error('Error saving code:', error);
      res.status(500).json({ message: 'Failed to save code' });
    }
  });


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
*/