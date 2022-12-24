const express = require('express') //import express
const router = express.Router()
const authChecker = require('../middleware/authChecker')
// Nota: HEAD e OPTIONS sono automaticamente generate dal router!

// API Cliente
const clienteController = require('../controllers/cliente')

router.post('/register', clienteController.newCliente)//ds
router.get('/myAcc', authChecker('utente'), clienteController.getDati)//ds
router.get('/myAcc/impianti', authChecker('utente'), clienteController.getImpianti)//ds
router.get('/myAcc/impianti/:selImpId/heatmap', authChecker('utente'), clienteController.getHeatmap)//ds
router.get('/myAcc/impianti/:selImpId/snapshots/:selSnapTs', authChecker('utente'), clienteController.getOneSnapshot)//ds

/*
router.get('/utente', authChecker('amministratore'), clienteController.getAllUtente)
router.delete('/utente', authChecker('amministratore'), clienteController.deleteAllUtente)
router.get('/utente/:email', authChecker('utente'), clienteController.getOneUtente)
router.delete('/utente/:email', authChecker('amministratore'), clienteController.deleteOneUtente)
*/

module.exports = router;