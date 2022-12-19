const StatusCodes = require('http-status-codes').StatusCodes
const { response } = require('express');
const Utente = require('../models/utente')
const bcrypt = require('bcrypt')
const HASH_ROUNDS=10

// POST cliente
const newCliente = (req, res) => {
  // create a new cliente object using the Utente model and req.body
  const newCliente = new Utente({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, HASH_ROUNDS),
    indirizzo: req.body.indirizzo,
    nome: req.body.nome,
    cognome: req.body.cognome,
    telefono: req.body.telefono,
  })
  // save this object to database
  newCliente.save((err, data) => {
    if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:(void console.log(err))+'->Error registering Cliente'})
    else res.status(StatusCodes.CREATED).json({message:'New Cliente created', _id:data._id})
  })
}

//GET dati
const getDati = (req, res) => {
  //find the specific utente with that email
  Utente.findOne({ email: req.loggedUser.email }, (err, data) => {
    if (err)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:(void console.log(err))+'->Error retrieving user data'})
    else if(!data)
      res.status(StatusCodes.NOT_FOUND).json({message:'Error retrieving user data'})
    else
      res.status(StatusCodes.OK).json(data) //return the utente object if found
  })
}

/*
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



//DELETE one utente
const deleteOneUtente = (req, res) => {
  // Query for a utente that has email
  let email = req.params.email
  var query = { email: email }

  Utente.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}*/

module.exports = {
  newCliente, 
  getDati
}