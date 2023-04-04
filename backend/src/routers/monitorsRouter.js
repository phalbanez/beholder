const express = require('express');
const router = express.Router();
const monitorsController = require('../controllers/monitorsController');

router.get('/:id', monitorsController.getMonitor);

router.delete('/:id', monitorsController.deleteMonitor);

router.get('/', monitorsController.getMonitors);

router.patch('/:id', monitorsController.updateMonitor);

router.post('/', monitorsController.insertMonitor);

router.post('/:id/start', monitorsController.startMonitor);

router.post('/:id/stop', monitorsController.stopMonitor);

module.exports = router;