const logger = require('../utils/logger');

module.exports = (error, req, res, next) => {
    logger('system', error);
    return res.status(500).json(error.response ? error.response.data : error.message)
}
