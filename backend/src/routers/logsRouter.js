const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.get('/:file', logsController.getLogs);

module.exports = router;