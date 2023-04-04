const express = require('express');
const router = express.Router();
const withdrawTemplatesController = require('../controllers/withdrawTemplatesController');

router.delete('/:id', withdrawTemplatesController.deleteWithdrawTemplate);

router.get('/:coin?', withdrawTemplatesController.getWithdrawTemplates);

router.patch('/:id', withdrawTemplatesController.updateWithdrawTemplate);

router.post('/', withdrawTemplatesController.insertWithdrawTemplate);

module.exports = router;