const mongoose = require("mongoose")
//schema
const ImpiantoSchema = new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    superficie: {type:Number, required:true},
    indirizzo: {type:String, required:true},
    fattura: {type:String, required:true, unique:true},
    dataAcquisto: {type:Date, required:true},
    dataDismissione: {type:Date}
});

const Impianto = mongoose.model("Impianto", ImpiantoSchema); //convert to model named Impianto
module.exports = Impianto