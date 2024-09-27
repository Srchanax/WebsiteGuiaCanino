const express = require('express')
const router = express.Router()

// Melhorar

require('firebase/firestore');
const { getAuth, updatePassword } = require('firebase/auth');

router.get('/', function(req, res, next) {
  res.render('senha')
})

router.post('/', async (req, res) => {

  const auth = getAuth();
  // const NewPass = document.getElementById('pass')
  const user = auth.currentUser;
  const newPassword = req.body.pass;

  updatePassword(user, newPassword).then(() => {
    res.send('Senha atualizada com sucesso.');
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Erro ao atualizar a senha.');
  });

})

module.exports = router;