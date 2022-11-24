const Utente = require('../models/utente');
// newUtente function for post utente route
//POST utente
const newCliente = (req, res) => {
            //create a new utente object using the Utente model and req.body
            const newCliente = new Utente({
              nome: req.body.nome,
              cognome: req.body.cognome, // placeholder for now
              telefono: req.body.telefono,
              email: req.body.email,
              indirizzo: req.body.indirizzo,
              password: req.body.password
          })
          // save this object to database
          newCliente.save((err, data) => {
              if (err) return res.json({ Error: err });
              return res.json(data);
          })
};

//GET all utentes
const getAllUtente = (req, res) => {
    Utente.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//DELETE utentes
const deleteAllUtente = (req, res) => {
    Utente.deleteMany({}, err => {
        if (err) {
            return res.json({ message: "Complete delete failed" });
        }
        return res.json({ message: "Complete delete successful" });
    })
};

const getOneUtente = (req, res) => {
    let email = req.params.email; //get the utente email
    //find the specific utente with that email
    Utente.findOne({ email: email }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Utente doesn't exist." });
        }
        else return res.json(data); //return the utente object if found
    });
};

//DELETE '/utente/:email'
const deleteOneUtente = (req, res, next) => {
    // Query for a utente that has email
    let email = req.params.email;
    var query = { email: email };

    const result = Utente.deleteOne(query);
    Utente.deleteOne(query, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Utente deleted successfully");
            res.json({ message: "DELETE 1 utente" });
        }
    });
};

//export controller functions
module.exports = {
    getAllUtente,
    newCliente,
    deleteAllUtente,
    getOneUtente,
    deleteOneUtente
};