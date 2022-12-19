const StatusCodes = require('http-status-codes').StatusCodes
const express = require('express')
const jwt = require('jsonwebtoken')
const authHierarchy =
{
'utente' : ['cliente', 'tecnico', 'supervisore', 'amministratore'],
'cliente' : ['cliente'],
'dipendente' : ['tecnico', 'supervisore', 'amministratore'],
'tecnico' : ['tecnico'],
'supervisore' : ['supervisore', 'amministratore'],
'amministratore' : ['amministratore']
}

const authChecker = function(requiredRuolo){
  return function(req, res, next) {
    if(req.loggedUser == null)
      res.status(StatusCodes.UNAUTHORIZED).json({message:'Please, get a token first'})
    else if(authHierarchy[requiredRuolo].find(e => e === req.loggedUser.ruolo) == undefined)
      res.status(StatusCodes.FORBIDDEN).json({message:'You are not allowed to access this resource'})
    else next()
  }
}

module.exports = authChecker