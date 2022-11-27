StatusCodes = require("http-status-codes").StatusCodes
const { response } = require("express");
const Utente = require("../models/utente")

//POST utente
const newUtente = (req, res) => {
  //create a new utente object using the Utente model and req.body
  const newCliente = new Utente({
    nome: req.body.nome,
    cognome: req.body.cognome,
    telefono: req.body.telefono,
    email: req.body.email,
    indirizzo: req.body.indirizzo,
    password: req.body.password,
    cf: req.body.cf,
    tipo: req.body.tipo
  })
  // save this object to database
  newCliente.save((err, data) => {
    if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.CREATED).json(data)
  })
}

//GET all utentes
const getAllUtente = (req, res) => {
  Utente.find({}, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json(data)
  })
}

//DELETE utentes
const deleteAllUtente = (req, res) => {
  Utente.deleteMany({}, err => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

//GET one utente
const getOneUtente = (req, res) => {
  let email = req.params.email;
  //find the specific utente with that email
  Utente.findOne({ email: email }, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else if (!data) res.status(StatusCodes.NOT_FOUND).json()
    else res.status(StatusCodes.OK).json(data) //return the utente object if found
  })
}

//DELETE one utente
const deleteOneUtente = (req, res) => {
  // Query for a utente that has email
  let email = req.params.email
  var query = { email: email }

  Utente.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

module.exports = {
    getAllUtente,
    newUtente,
    deleteAllUtente,
    getOneUtente,
    deleteOneUtente
}