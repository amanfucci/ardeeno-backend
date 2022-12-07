//chiamato cosi per abbreviare ma e il misurazione/sensore/snapshot di kanban.
export{}

const mongoose = require("mongoose")
const Impianto = require("../impianto.js")
//schema



const SensoreSchema = new mongoose.Schema({
    IDsensore: {type:Number, required:true, unique: true},
    latitudine: {type:Number, required:true},
    longitudine: {type:Number, required:true},
    Impianto : [{type: mongoose.Schema.Types.ObjectId,ref: 'Impianto'}]
});

const MisurazioneSchema = new mongoose.Schema({
    Temperatura: {type:Number, required:false},
    Pressione: {type:Number, required:false},
    Vento: {type:Number, required:false},
    Qualitaaria: {type:Number,required:false},
    Luminosita: {type:Number,required:false},
    Timestamp: {type:Date,required:true},
    Sensoreassociato: [{type: mongoose.Schema.Types.ObjectId,ref: 'Sensore'}]   //se non mi sbaglio fa si che ogni misurazione e associata a un sensore.
});


const SnapSchema = new mongoose.Schema({
    Time: {type:Date, required:true},     //questo contiene per esempio il valore delle 16:00 per rapressentare tutto l'intervallo 16:00-16:59
    IDImpianto: [{type: mongoose.Schema.Types.ObjectId,ref: 'Impianto'}]    //impianto a qui e associato il snapshot.
});


const Misurazione = mongoose.model("Misurazione", MisurazioneSchema); //convert to model named Misurazione
const Sensore = mongoose.model("Sensore",SensoreSchema);
const Snapshot = mongoose.model("Snapshot",SnapSchema);

module.exports = Misurazione
module.exports = Sensore
module.exports = Snapshot