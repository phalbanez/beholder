const database = require('./db');
const app = require('./app');
const port = process.env.PORT;
// require('dotenv').config();

app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
