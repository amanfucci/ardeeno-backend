const express = require("express") //import express
const jwt = require("jsonwebtoken")

const tokenChecker = function(req, res, next) {
  var token = req.headers["x-access-token"]
  if (!token){
    req.loggedUser = null
    res.set("x-token-status", "empty")
    next()
  }
  else{
    // decode token, verifies secret and checks expirationt
    jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {
      if (err){
        req.loggedUser = null
        res.set("x-token-status", "expired")
      }
      else {
        // if everything is good, save in req object for use in other routes
        req.loggedUser = decoded
        res.set("x-token-status", "valid")
      }
      next()
    })
  }
}

module.exports = tokenChecker