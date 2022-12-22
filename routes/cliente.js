const express = require('express') //import express
const router = express.Router()
const authChecker = require('../middleware/authChecker')
// Nota: HEAD e OPTIONS sono automaticamente generate dal router!

// API Cliente
const clienteController = require('../controllers/cliente')
router.post('/register', clienteController.newCliente)
router.get('/myAcc', authChecker('utente'), clienteController.getDati)
router.get('/myAcc/impianti', authChecker('utente'), clienteController.getImpianti)

/*
router.get('/utente', authChecker('amministratore'), clienteController.getAllUtente)
router.delete('/utente', authChecker('amministratore'), clienteController.deleteAllUtente)
router.get('/utente/:email', authChecker('utente'), clienteController.getOneUtente)
router.delete('/utente/:email', authChecker('amministratore'), clienteController.deleteOneUtente)
*/

module.exports = router;