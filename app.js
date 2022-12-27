const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
var mongoose = require("mongoose")
const tokenChecker = require("./middleware/tokenChecker")
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger3.json")

const routesToken = require("./routes/token")
const routesCliente = require("./routes/cliente")

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const isJest = () => {
  return process.env.JEST_WORKER_ID !== undefined;
}

// logging
console.log("...server started");
console.log("DB_HOST="+process.env.DB_HOST)
console.log("DB_USER="+process.env.DB_USER)
console.log("MONGODB_URI="+process.env.MONGODB_URI)
console.log("see api-docs at http://localhost:8080/api-docs")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
app.use(express.json())
app.use("/", (req, res, next) => {
  console.log(
    req.method, req.path, {
    'x-access-token':req.headers?.['x-access-token'],
    ...req.params,
    ...req.body
  })
  next()
})

app.use(tokenChecker)
app.use("/", routesToken)
app.use("/", routesCliente)

if(isJest()){
  // Create mock in-memory database
  MongoMemoryServer.create().then((mongodb)=>{
    const mongodb_uri = mongodb.getUri();
      mongoose.connect(
        mongodb_uri,
        {useNewUrlParser: true, useUnifiedTopology: true},
        (err) => {
          if (err) return console.log("Error: ", err)
          console.log("Mock MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
        }
      )    
  });
}else{
  mongoose.connect(
    process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) return console.log("Error: ", err)
      console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
    }
  )
}

module.exports = app