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
      res.status(StatusCodes.UNAUTHORIZED).json({code:-1, message:'Please, get a valid token first'})
    else if(authHierarchy[requiredRuolo].every(e => e !== req.loggedUser.ruolo))
      res.status(StatusCodes.FORBIDDEN).json({code:-2, message:'You are not allowed to access this resource'})
    else next()
  }
}

module.exports = authChecker