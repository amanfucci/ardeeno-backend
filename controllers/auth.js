const StatusCodes = require("http-status-codes").StatusCodes
const jwt = require("jsonwebtoken")
const Utente = require("../models/utente")

const authenticate = async (req, res) => {
  let user = await Utente.findOne({ email: req.body.email }).exec()
  if (!user) res.status(StatusCodes.BAD_REQUEST).json({message:"User not found"})
  else if (user.password != req.body.password) res.status(StatusCodes.FORBIDDEN).json({message:"Wrong password"})
  else{
    // user authenticated -> create a token
    var payload = { email: user.email, id: user._id, userType: user.tipo}
    var options = { expiresIn: 86400} // expires in 24 hours
    var token = jwt.sign(payload, process.env.SUPER_SECRET, options)
    res.status(StatusCodes.OK).json({message: "Enjoy your token!", token: token, email: user.email, id: user._id, userType: user.tipo})
  }
}

module.exports = {
  authenticate
}