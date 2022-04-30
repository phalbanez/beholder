const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const authController = require('./controllers/authController');
const settingsController = require('./controllers/settingsController');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/login', authController.doLogin);
app.post('/logout', authController.doLogout);

app.get('/settings', authMiddleware, settingsController.getSettings);

app.use('/', (req, res, next) => {
  res.send('Hello World2');
});

app.use(errorMiddleware);

module.exports = app;
