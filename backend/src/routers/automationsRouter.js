const express = require('express');
const router = express.Router();
const automationsController = require('../controllers/automationsController');

router.get('/:id', automationsController.getAutomation);

router.delete('/:id', automationsController.deleteAutomation);

router.get('/', automationsController.getAutomations);

router.patch('/:id', automationsController.updateAutomation);

router.post('/', automationsController.insertAutomation);

router.post('/:id/start', automationsController.startAutomation);

router.post('/:id/stop', automationsController.stopAutomation);

module.exports = router;