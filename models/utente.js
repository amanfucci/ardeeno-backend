const mongoose = require("mongoose"); //import mongoose
// utente schema
const UtenteSchema = new mongoose.Schema({
    nome: {type:String, required:true},
    cognome: {type:String, required:true},
    telefono: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    indirizzo: {type:String, required:true},
    password: {type:String, required:true},
    tipo: {type:String, enum:["Cliente", "Tecnico", "Supervisore", "Amministratore"], required:true, default:"Cliente"},
    email_confermata: {type:Boolean, required:true, default:false},
    cf: {type:String, unique:true},
    attivo: {type:Boolean, required:true, default:true}
});
const Utente = mongoose.model('Utente', UtenteSchema); //convert to model named Utente
module.exports = Utente; //export for controller use