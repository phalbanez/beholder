const express = require('express');
require('express-async-errors');

const cors = require('cors');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const settingsRouter = require('./routers/settingsRouter');
const symbolsRouter = require('./routers/symbolsRouter');
const exchangeRouter = require('./routers/exchangeRouter');
const ordersRouter = require('./routers/ordersRouter');
const monitorsRouter = require('./routers/monitorsRouter');
const automationsRouter = require('./routers/automationsRouter');
const orderTemplatesRouter = require('./routers/orderTemplatesRouter');
const withdrawTemplatesRouter = require('./routers/withdrawTemplatesRouter');
const beholderRouter = require('./routers/beholderRouter');
const logsRouter = require('./routers/logsRouter');

const authController = require('./controllers/authController');

const app = express();

if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(helmet());

app.use(express.json());

app.post('/login', authController.doLogin);

app.use('/settings', authMiddleware, settingsRouter);

app.use('/symbols', authMiddleware, symbolsRouter);

app.use('/exchange', authMiddleware, exchangeRouter);

app.use('/orders', authMiddleware, ordersRouter);

app.use('/monitors', authMiddleware, monitorsRouter);

app.use('/automations', authMiddleware, automationsRouter);

app.use('/ordertemplates', authMiddleware, orderTemplatesRouter);

app.use('/withdrawtemplates', authMiddleware, withdrawTemplatesRouter);

app.use('/beholder', authMiddleware, beholderRouter);

app.use('/logs', authMiddleware, logsRouter);

app.post('/logout', authController.doLogout);

app.use(errorMiddleware);

module.exports = app;