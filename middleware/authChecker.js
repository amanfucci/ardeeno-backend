const StatusCodes = require("http-status-codes").StatusCodes
const express = require("express")
const jwt = require("jsonwebtoken")
const authHierarchy =
{
"utente" : ["cliente", "tecnico", "supervisore", "amministratore"],
"cliente" : ["cliente"],
"dipendente" : ["tecnico", "supervisore", "amministratore"],
"tecnico" : ["tecnico"],
"supervisore" : ["supervisore", "amministratore"],
"amministratore" : ["amministratore"]
}

const authChecker = function(requiredUserType){
  return function(req, res, next) {
    if(req.loggedUser == null) res.status(StatusCodes.UNAUTHORIZED).json()
    else if(authHierarchy[requiredUserType].find(e => e === req.loggedUser.userType) == undefined) res.status(StatusCodes.FORBIDDEN).json()
    else next()
  }
}

module.exports = authChecker