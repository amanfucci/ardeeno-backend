//chiamato cosi per abbreviare ma e il sensore+misurazione+snapshot di kanban.

const express = require('express');
const router = express.Router();

const MisurazioneController = require('../controllers/Misurazione');
router.post('/misurazione', MisurazioneController.newMisurazione);
router.post('/misurazione', MisurazioneController.getAllMisurazione);
router.post('/misurazione', MisurazioneController.deleteAllMisurazione);
router.post('/misurazione', MisurazioneController.getOneMisurazione);
router.post('/misurazione', MisurazioneController.deleteOneMisurazione);

module.exports = router;