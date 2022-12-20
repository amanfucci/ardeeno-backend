const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const tokenChecker = require("./middleware/tokenChecker")
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const routesToken = require("./routes/token")
const routesCliente = require("./routes/cliente")

// logging
console.log("server started");
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.MONGODB_URI)
console.log("see api-docs at http://localhost:8080/api-docs")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())
app.use("/", (req, res, next) => {
  console.log(req.body)
  next()
})
app.use(tokenChecker)
app.use("/", routesToken)
app.use("/", routesCliente)

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err)
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
    }
);

module.exports = app