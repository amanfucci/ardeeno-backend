const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/utente'); // import the routes
const mongoose = require('mongoose');

// logging
console.log("server started");
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.MONGODB_URI)

app.use(express.json());
app.use('/', routes); //to use the routes

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
