StatusCodes = require("http-status-codes").StatusCodes
const { response } = require("express");
const Impianto = require("../models/impianto")

//POST impianto
const newImpianto = (req, res) => {
  //create a new impianto object using the Impianto model and req.body
  const newImpianto = new Impianto({
    id: req.body.id,
    superficie: req.body.superficie,
    indirizzo: req.body.indirizzo,
    fattura: req.body.fattura,
    dataAcquisto: req.body.dataAcquisto,
    dataDismissione: req.body.dataDismissione
  })
  // save this object to database
  newImpianto.save((err, data) => {
    if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.CREATED).json(data)
  })
}

//GET all impianti
const getAllImpianto = (req, res) => {
  Impianto.find({}, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json(data)
  })
}

//DELETE impianti
const deleteAllImpianto = (req, res) => {
    Impianto.deleteMany({}, err => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

//GET one impianto
const getOneImpianto = (req, res) => {
  let id = req.params.id;
  //find the specific impianto with that id
  Impianto.findOne({ id: id }, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else if (!data) res.status(StatusCodes.NOT_FOUND).json()
    else res.status(StatusCodes.OK).json(data) //return the impianto object if found
  })
}

//DELETE one impianto
const deleteOneImpianto = (req, res) => {
  // Query for a impianto that has id
  let id = req.params.id
  var query = { id: id }

  Impianto.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

module.exports = {
    getAllImpianto,
    newImpianto,
    deleteAllImpianto,
    getOneImpianto,
    deleteOneImpianto
}