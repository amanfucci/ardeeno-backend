const StatusCodes = require('http-status-codes').StatusCodes
const jwt = require('jsonwebtoken')
const Utente = require('../models/utente')
const bcrypt = require('bcrypt')

const genToken = async (req, res) => {
  try{
    let utente = await Utente.findOne({ email: req.body.email }).exec()
    if (!utente)
      res.status(StatusCodes.NOT_FOUND).json({code: 0, message:'Utente not found!'})
    else if(!bcrypt.compareSync(req.body.password, utente.password))
      res.status(StatusCodes.FORBIDDEN).json({code: 1, message:'Wrong password'})
    else{
      // utente authenticated -> create a token
      var payload = { email: utente.email, _id: utente._id, ruolo: utente.ruolo}
      var options = { expiresIn: 86400} // expires in 24 hours
      var token = jwt.sign(payload, process.env.SUPER_SECRET, options)
      res.status(StatusCodes.OK).json({token: token, ...payload})
    }
  }catch(err){
    console.log(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({code:2, message:'Error generating token!'})
  }
}

module.exports = {
  genToken
}