const express = require("express");
const router = express.Router();

const { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } = require('firebase/firestore');

router.get("/getUser", async function (req, res) {
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require("node-localstorage").LocalStorage;
        localStorage = new LocalStorage("./scratch");
    }
    const userID = localStorage.getItem("userID");
    if (!userID) {
        return res.json("Nenhum ID encontrado no localStorage");
    }
    try {
        const db = getFirestore();
        const docRef = doc(db, "user", userID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = {
                "email": docSnap.data().email,
                "user": docSnap.data().user,
                "idade": docSnap.data().idade,
                "clima": docSnap.data().clima,
                "moradia": docSnap.data().moradia,
            };
          res.json(data);
        } else {
          res.json("Nenhum documento encontrado");
        }
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
    
});

router.post("/", async function (req, res) {
    const { user, idade, moradia, clima } = req.body;

    const db = getFirestore();

    try {
        if (typeof localStorage === "undefined" || localStorage === null) {
            var LocalStorage = require("node-localstorage").LocalStorage;
            localStorage = new LocalStorage("./scratch");
        }
        const userID = localStorage.getItem("userID");
        if (!userID) {
            return res.json("Nenhum ID encontrado no localStorage");
        }
        
        const docRef = doc(db, "user", userID);

        // Criar um novo campo ou atualizar um campo existente
        await setDoc(docRef, { 
            user: user,
            idade: idade,
            moradia: moradia,
            clima: clima
        }, { merge: true });

        res.render("perfilUser");
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
});

router.get("/", function (req, res, next) {
    res.render("perfilUser");
});

router.get("/edit", function (req, res, next) {
    res.render("perfil");
});

module.exports = router;
