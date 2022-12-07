const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const tokenChecker = require("./middleware/tokenChecker")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const routesAuth = require("./routes/auth")
const routesUtente = require("./routes/utente")
const routesImpianto = require("./routes/impianto")

//logging
console.log("server started");
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.MONGODB_URI)
console.log("see api-docs at http://localhost:8080/api-docs")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json())
app.use("/", (req, res, next) => {
  console.log(req.body)
  next()
})
app.use(tokenChecker)
app.use("/", routesAuth)
app.use("/", routesUtente)
app.use("/", routesImpianto) //to use the routes

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err)
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
    }
);

const listener = app.listen(process.env.PORT)