const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const authController = require('./controllers/authController');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.post('/login', authController.doLogin);
app.post('/logout', authController.doLogout);

app.use('/', (req, res, next) => {
  res.send('Hello World');
});

app.use(errorMiddleware);

module.exports = app;
