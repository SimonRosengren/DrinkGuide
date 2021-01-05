require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 8000;

require('./startup/routes')(app, express);
require('./startup/db')();

app.listen(port, () => {
  console.log(`App running and listening on port: ${port}`)
});