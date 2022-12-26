const express = require("express") //import express
const app = express()
const router = express.Router()

// API Authentication
const tokenController = require("../controllers/token")
router.post("/auth", tokenController.genToken)//dst

module.exports = router;