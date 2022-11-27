const express = require("express") //import express
const router = express.Router()
const authChecker = require("../middleware/authChecker")
// Nota: HEAD e OPTIONS sono automaticamente generate dal router!

// API Utente
const utenteController = require("../controllers/utente")
router.post("/utente", authChecker("amministratore"), utenteController.newUtente)
router.get("/utente", authChecker("amministratore"), utenteController.getAllUtente)
router.delete("/utente", authChecker("amministratore"), utenteController.deleteAllUtente)
router.get("/utente/:email", authChecker("utente"), utenteController.getOneUtente)
router.delete("/utente/:email", authChecker("amministratore"), utenteController.deleteOneUtente)

module.exports = router;