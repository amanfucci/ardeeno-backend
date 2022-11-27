const express = require("express") //import express
const app = express()
const router = express.Router()

// API Authentication
const authController = require("../controllers/auth")
router.post("/auth", authController.authenticate)

module.exports = router;