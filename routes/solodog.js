const express = require('express')
const router = express.Router()

/*
const { MongoClient } = require('mongodb');
// Ex
// https://replit.com/@JoseRoberto16/contactapp3?v=1#routes/list.js

const uri = "mongodb+srv://darftsoftware:11101110@cluster0.8en20si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

var contactsDAO = require('../src/models/dao/dogsDAO');

router.get('/', async function(req, res, next) {
  try {
    const a = "Pug"
    await client.connect();
    const results = await contactsDAO.findDog(client, a);
    res.render('solodog', { results: results });
  } catch (err) {
    res.send(err);
  } finally {
    await client.close()
  }
});

*/
router.get('/', function(req, res, next) {
  res.render('solodog')
})

module.exports = router;