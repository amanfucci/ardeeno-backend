const StatusCodes = require('http-status-codes').StatusCodes
const { res } = require('express')
const Utente = require('../models/utente')
const Impianto = require('../models/impianto')
const Modello = require('../models/modello')
const Sensore = require('../models/sensore')
const SnapshotSchema = require('../schemas/snapshotSchema')
const MisurazioneSchema = require('../schemas/misurazioneSchema')

const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const HASH_ROUNDS=10
//"403": {"description": "FORBIDDEN", "schema": {"type":"object", "properties":{"message":{"type":"string", "default":"You are not allowed to access this resource"}}}, "headers": {"x-token-status": {"description": "The status of the token sent", "type":"string", "default":"valid"}}},
// POST cliente
const newCliente = async (req, res) => {
  // create a new cliente object using the Utente model and req.body
  try{
    if(await Utente.findOne({email:req.body.email}).exec())
      res.status(StatusCodes.CONFLICT).json({code:0, message:'Error registering Cliente - email already used'})
    else if(await Utente.findOne({telefono:req.body.telefono}).exec())
      res.status(StatusCodes.CONFLICT).json({code:1, message:'Error registering Cliente - telefono already used'})
    else{
      const newCliente = new Utente({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, HASH_ROUNDS),
        indirizzo: req.body.indirizzo,
        nome: req.body.nome,
        cognome: req.body.cognome,
        telefono: req.body.telefono,
      })
      const userData = await newCliente.save()//save this object to database
      if(!userData)//mongo error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:2, message:'Error registering Cliente'})
      else
        res.status(StatusCodes.CREATED).json({message:'New Cliente created', _id:userData._id})
    }
  }catch(err){//mongo error
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:3, message:'Error registering Cliente'})
  }
}

//GET dati
const getDati = async (req, res) => {
  //find the specific utente with that email
  try{
    const userData = await Utente.findOne(
      { email: req.loggedUser.email },
      {__v:false, _id:false, isDimesso:false, impiantiAcquistati:false, ruolo:false, isEmailConfermata:false}).exec()
    if(!userData){//ha token ma non lo trovo => mongo error
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code: 0, message:'Error retrieving user data'})
    }else{
      res.status(StatusCodes.OK).json(userData) //return the utente object if found
    }
  }catch(err){
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code: 1, message:'Error retrieving user data'})
  }
}

//GET dati
const getImpianti = async (req, res) => {
  //find the specific utente with that email
  try{
    const userData = await Utente.findOne({ email: req.loggedUser.email }).exec()
    if(!userData){//ha token ma non lo trovo => mongo error
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:0, message:'Error retrieving user data'})
    }else{
      try{
        const modelli = await Modello.find().exec()
        const impianti = await Impianto.find({_id:{$in:userData.impiantiAcquistati}}, {__v:false, sensori:false}).exec()
        res.status(StatusCodes.OK).json(impianti.map(
          imp=>{return { ...imp._doc, modello: modelli.find(m => ''+m._id == imp.modello).nome}}
        )) //return all impiantiAcquistati if found -- with "inner join" on modelli
      }catch(err){//mongo error
        console.log(err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:1, message:'Error retrieving user impianti'})
      }
    }
  }catch(err){//mongo error
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:2, message:'Error retrieving user data'})
  }
}

//GET Heatmap
const getHeatmap = async (req, res) => {
  //find the specific utente with that email
  try{
    const userData = await Utente.findOne({ email: req.loggedUser.email }).exec()
    if(!userData){//ha token ma non lo trovo => mongo error
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:0, message:'Error retrieving user data'})
    }else{
      const selImpId = req.params.selImpId
      //devo controllare che l'utente abbia questo impianto
      if(userData.impiantiAcquistati.every(e => e != selImpId)){//non ce l'ha => request error
        res.status(StatusCodes.NOT_FOUND).json({code:1, message:'Error retrieving impianto - no such impianto for this user'})
      }
      else{
        try{
          const selImp = await Impianto.findOne({_id:selImpId}).exec()
          if(!selImp){//mongo ha $ref imp ma non lo trovo => mongo error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:2, message:'Error retrieving impianto'})
          }else{
            try{
              const selImpSensori = await Sensore.find({_id:{$in:selImp.sensori}}, {__v:false, impianto:false}).exec()
              try{
                const selImpSnapshot = mongoose.model('Snapshot', SnapshotSchema, 'Snapshots_'+selImp._id)
                const selImpSnapshots =
                (await selImpSnapshot.find({}, {_id:false, date:true}).exec()).map(snap => snap.date)
                const selImpPar = (await Modello.findOne({_id:''+selImp.modello}).exec()).parametri
                res.status(StatusCodes.OK).json({
                  lat: selImp.lat,
                  long: selImp.long,
                  parametri:selImpPar,
                  sensori:selImpSensori,
                  snapshots:selImpSnapshots
                })
              }catch(err){//mongo error
                console.log(err)
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:3, message:'Error retrieving snapshots'})
              }
            }catch(err){//mongo error
              console.log(err)
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:4, message:'Error retrieving sensori'})
            }
          }
        }catch(err){//mongo error
          console.log(err)
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:5, message:'Error retrieving impianto'})
        }
      }
    }
  }catch(err){//mongo error
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:5, message:'Error retrieving user data'})
  }
}

//GET one snapshot
const getOneSnapshot = async (req, res) => {
  //find the specific utente with that email
  try{
    const userData = await Utente.findOne({ email: req.loggedUser.email }).exec()
    if(!userData){//ha token ma non lo trovo => mongo error
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:0, message:'Error retrieving user data'})
    }else{
      const selImpId = req.params.selImpId
      //devo controllare che l'utente abbia questo impianto
      if(userData.impiantiAcquistati.every(e => e._id != selImpId)){//non ce l'ha => request error
        res.status(StatusCodes.NOT_FOUND).json({code:1, message:'Error retrieving impianto - no such impianto for this user'})
      }
      else{
        try{
          const selImp = await Impianto.findOne({_id:selImpId}).exec()
          if(!selImp){//mongo ha $ref imp ma non lo trovo => mongo error
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:2, message:'Error retrieving impianto'})
          }else{
            try{
              //get snapshot
              //no such snapshot
              const selSnapDate = new Date(parseInt(req.params.selSnapTs))
              const selImpMisurazione = mongoose.model('Misurazione', MisurazioneSchema, 'Misurazioni_'+selImpId)
              const selImpMis = await selImpMisurazione.find({date:selSnapDate}, {_id:false, sensore:true, valori:true}).exec()
              res.status(StatusCodes.OK).json(selImpMis)
            }catch(err){ //mongo error
              console.log(err)
              res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:3, message:'Error retrieving misurazioni'})
            }
          }
        }catch(err){// mongo error
          console.log(err)
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:4, message:'Error retrieving impianto'})
        }
      }
    }
  }catch(err){//mongo error
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:5, message:'Error retrieving user data'})
  }
}

module.exports = {
  newCliente, 
  getDati,
  getImpianti,
  getHeatmap,
  getOneSnapshot
}