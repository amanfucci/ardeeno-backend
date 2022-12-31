const Utente = require('../../models/utente')
const Impianto = require('../../models/impianto')
const Modello = require('../../models/modello')
const Sensore = require('../../models/sensore')
const SnapshotSchema = require('../../schemas/snapshotSchema')
const MisurazioneSchema = require('../../schemas/misurazioneSchema')
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

const fs = require('fs')

const mongoose = require('mongoose')

let mongodb = null;

const setup = async () => {
  /*/set up test database
  \{
    "\$oid": (".*")
  \}
  $1

  \{
    "\$date": \{
      "\$numberLong": "(.*)"
    \}
  \}
  $1

  \{
    "\$date": \{
      "\$numberLong": "(.*)"
    \}
  \}
  $1
  //load from disk*/
  // Create mock in-memory database
  mongodb = await MongoMemoryServer.create()
  const mongodb_uri = mongodb.getUri();
  mongoose.connect(
    mongodb_uri,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) return console.log("Error: ", err)
      console.log("Mock MongoDB Connection -- Ready state is:", mongoose.connection.readyState)
    }
  )

  const utenti = JSON.parse(fs.readFileSync('tests/database/Utenti.json'))
  const modelli = JSON.parse(fs.readFileSync('tests/database/Modelli.json'))
  const impianti = JSON.parse(fs.readFileSync('tests/database/Impianti.json'))
  const sensori = JSON.parse(fs.readFileSync('tests/database/Sensori.json'))

  const snapshots = JSON.parse(fs.readFileSync('tests/database/Snapshots_639f2df174aef65fb510cb8f.json'))
  const misurazioni = JSON.parse(fs.readFileSync('tests/database/Misurazioni_639f2df174aef65fb510cb8f.json'))

  //insert to in-memory database
  await Utente.insertMany(utenti)
  await Modello.insertMany(modelli)
  await Impianto.insertMany(impianti)
  await Sensore.insertMany(sensori)

  const myImpId = impianti[0]._id
  const myImpSnapshot = mongoose.model('Snapshot', SnapshotSchema, 'Snapshots_'+myImpId)
  const myImpMisurazione = mongoose.model('Misurazione', MisurazioneSchema, 'Misurazioni_'+myImpId)

  await myImpSnapshot.insertMany(snapshots)
  await myImpMisurazione.insertMany(misurazioni)
}

const teardown = async () => {
  await mongoose.disconnect()
  await mongodb.stop()
}

module.exports = {
  setup:setup,
  teardown:teardown
}