//chiamato cosi per abbreviare ma e il misurazione/sensore/snapshot di kanban.

StatusCodes = require("http-status-codes").StatusCodes
const { response } = require("express");
const Misurazione = require("../models/Misurazione")
const Sensore = require("../models/Misurazione")
const snapshot = require("../models/Misurazione")


//POST Misurazione
const newMisurazione = (req, res) => {
    //create a new Misurazione object using the Misurazione model and req.body
    const newMisurazione = new Misurazione({
      Temperatura: req.body.Temperatura,
      Pressione: req.body.Pressione,
      Vento: req.body.Vento,
      Qualitaaria: req.body.Qualitaaria,
      Luminosita: req.body.Luminosita,
      Timestamp: req.body.Timestamp,
      Sensoreassociato: req.body.Sensoreassociato
    })
    // save this object to database
    newMisurazione.save((err, data) => {
      if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.CREATED).json(data)
    })
  }



//GET all Misurazioni
const getAllMisurazione = (req, res) => {
    Misurazione.find({}, (err, data) => {
      if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.OK).json(data)
    })
  }


//DELETE Misurazione
const deleteAllMisurazione = (req, res) => {
    Misurazione.deleteMany({}, err => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

//GET one Misurazione
const getOneMisurazione = (req, res) => {
  let Timestamp = req.params.Timestamp;
  let Sensoreassociato = req.params.Sensoreassociato;
  //find the specific Misurazione with that sensor id and timestamp.
  Misurazione.findOne({ Timestamp: Timestamp , Sensoreassociato: Sensoreassociato }, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else if (!data) res.status(StatusCodes.NOT_FOUND).json()
    else res.status(StatusCodes.OK).json(data) //return the Misurazione object if found
  })
}

//DELETE one Misurazione
const deleteOneMisurazione = (req, res) => {
  // Query for a Misurazione that has Timestamp and certain Sensoreassocitato
  let Timestamp = req.params.Timestamp
  var query = { Timestamp: Timestamp, Sensoreassociato: Sensoreassociato}

  Impianto.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}






// adesso per sensori


//POST Sensore
const newSensore = (req, res) => {
    //create a new Sensore object using the Sensore model and req.body
    const newSensore = new Sensore({
      IDsensore: req.body.IDsensore,
      Latitudine: req.body.Latitudine,
      Longitudine: req.body.Longitudine,
      Impianto: req.body.Impianto
    })
    // save this object to database
    newSensore.save((err, data) => {
      if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.CREATED).json(data)
    })
  }



//GET all Sensori
const getAllSensore = (req, res) => {
    Misurazione.find({}, (err, data) => {
      if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.OK).json(data)
    })
  }


//DELETE Sensore
const deleteAllSensore = (req, res) => {
    Misurazione.deleteMany({}, err => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

//GET one Sensore
const getOneSensore = (req, res) => {
  let IDsensore = req.params.IDsensore;
  //find the specific Sensore with that sensor id.
  Sensore.findOne({ IDsensore: IDsensore }, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else if (!data) res.status(StatusCodes.NOT_FOUND).json()
    else res.status(StatusCodes.OK).json(data) //return the Sensore object if found
  })
}

//DELETE one Sensore
const deleteOneSensore = (req, res) => {
  // Query for a Misurazione that has a certain IDsensore
  let IDsensore = req.params.IDsensore
  var query = { IDsensore: IDsensore}

  Sensore.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}








// addesso per snapshot



//POST Snapshot
const newSnapshot = (req, res) => {
    //create a new Snapshot object using the Snapshot model and req.body
    const newSnapshot = new snapshot({
      Time: req.body.Time,
      IDImpianto: req.body.IDImpianto
    })
    // save this object to database
    newSnapshot.save((err, data) => {
      if (err) response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.CREATED).json(data)
    })
  }



//GET all Snapshot
const getAllSnapshot = (req, res) => {
    Misurazione.find({}, (err, data) => {
      if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
      else res.status(StatusCodes.OK).json(data)
    })
  }


//DELETE Snapshot
const deleteAllSnapshot = (req, res) => {
    Misurazione.deleteMany({}, err => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

//GET one Snapshot
const getOneSnapshot = (req, res) => {
  let IDImpianto = req.params.IDImpianto;
  let Time = req.params.Time;
  //find the specific Snapshot with that specific Time and IDImpianto
  Snapshot.findOne({ IDImpianto: IDImpianto, Time: Time }, (err, data) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else if (!data) res.status(StatusCodes.NOT_FOUND).json()
    else res.status(StatusCodes.OK).json(data) //return the Snapshot object if found
  })
}

//DELETE one Snapshot
const deleteOneSnapshot = (req, res) => {
  // Query for a Snapshot that has a certain IDImpianto and time.
  let IDImpianto = req.params.IDImpianto;
  let Time = req.params.Time;
  var query = { IDImpianto: IDImpianto, Time: Time}

  Snapshot.deleteOne(query, (err, collection) => {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
    else res.status(StatusCodes.OK).json()
  })
}

























//e infine gli exports 
module.exports = {
    newMisurazione,
    getAllMisurazione,
    deleteAllMisurazione,
    getOneMisurazione,
    deleteOneMisurazione,

    newSensore,
    getAllSensore,
    deleteAllSensore,
    getOneSensore,
    deleteOneSensore,

    newSnapshot,
    getAllSnapshot,
    deleteAllSnapshot,
    getOneSnapshot,
    deleteOneSnapshot
}
