const express = require("express") //import express
const router = express.Router()
// Nota: HEAD e OPTIONS sono automaticamente generate dal router!

// API Impianto
const impiantoController = require("../controllers/utente")
router.post("/impianto", impiantoController.newImpianto)
router.get("/impianto", impiantoController.getAllImpianto)
router.delete("/impianto", impiantoController.deleteAllImpianto)
router.get("/impianto/:id", impiantoController.getOneImpianto)
router.delete("/impianto/:id", impiantoController.deleteOneImpianto)

module.exports = router;