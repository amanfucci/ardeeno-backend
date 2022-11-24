const express = require('express'); //import express
// 1.
const router = express.Router();
// 2.
const utenteController = require('../controllers/utente');
// 3.
router.post('/cliente', utenteController.newCliente);
router.get('/utente', utenteController.getAllUtente);
router.delete('/utente', utenteController.deleteAllUtente);
router.get('/utente/:email', utenteController.getOneUtente);
router.delete('/utente/:email', utenteController.deleteOneUtente);
// 4.
module.exports = router; // export to use in server.js