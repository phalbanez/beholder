const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const morgan = require('morgan');

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.post('/login', authController.doLogin);
app.post('/logout', authController.doLogout);

const settingsRouter = require('./routers/settingsRouter');

app.use('/settings', authMiddleware, settingsRouter);

const symbolsRouter = require('./routers/symbolsRouter');

app.use('/symbols', authMiddleware, symbolsRouter);

app.get('/', (req, res, next) => {
  res.send('Hello World');
});

app.use(errorMiddleware);

module.exports = app;
