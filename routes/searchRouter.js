require('dotenv').config({ path: './keys/.env' }); // process.env.API_KEY

const express = require('express');
const router = express.Router()
const { MongoClient } = require('mongodb');

// mongodb://<username>:<password>@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true
const uri = process.env.MongoUuu

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    //https://stackoverflow.com/questions/68875026/error-querysrv-eservfail-mongodb-tcp-cluster0-abcd0-mongodb-net
    //https://stackoverflow.com/questions/55499175/how-to-fix-error-querysrv-erefused-when-connecting-to-mongodb-atlas
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }
  const collection = client.db("Guia-Canino").collection("dogs");

  router.get('/dogs', async (req, res) => {
    try {
      const dogs = await collection.find({}).toArray();
      res.json(dogs);
      //res.toArray(dogs);
      //return await dogs.toArray()
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/query/:field/:value', async (req, res) => {
    try {
      const field = req.params.field;
      const value = req.params.value;
      collection.find( { [field] : value } ).toArray((err, docs) => {
        if (err) throw err;
        res.json(docs);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/six/:userInput', async (req, res) => {
    /*
      const query = req.query.q;
      const collection = db.collection('books');

      collection.find({ title: new RegExp(query, 'i') }).toArray((err, docs) => {
          if (err) throw err;
          res.json(docs);
      });
    */
    try {
      //db.usuarios.find({ nome: { $regex: userInput, $options: 'i' } })
      /*
      const userInput = req.params.nome;
      const dogs = await collection.find({ nome: { $regex: userInput } }).toArray();
      res.json(dogs);
      */
      const userInput = req.params.userInput;
      collection.find({ nome: { $regex: userInput, $options: "i" } }).toArray((err, docs) => {
        if (err) throw err;
        res.json(docs);
      });
      
    } catch (err) {
      res.status(500).send(err);
    }
  });

  router.get('/dogs/query/:clima', async (req, res) => {
    try {
      const clim = req.params.clima;
      const moradi  = req.params.moradia; // esses valores são passados na url "dogs/query?clima=quente&moradia=muito"
      collection.find({
           clima: { $regex: clim, $options: "i" } ,
      }).toArray((err, docs) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(docs);
      });
      
    } catch (err) {
      const errr = {
        "err" : err,
        "errorMsg" : err.message,
      }
      res.status(500).send(errr);
    }

  });


  router.get('/dogs/:nome', async (req, res) => {
    const nome = req.params.nome;
    try {
      const dog = await collection.findOne({ nome: nome });
      if (dog) {
        res.json(dog);
      } else {
        res.status(404).send('Dog not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;

/*
db.collection.find({
  $and: [
    { campo1: { $gt: 10 } },
    { campo2: "valor" }
  ]
});
*/
