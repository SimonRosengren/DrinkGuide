require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 8000;
const path = require('path')

app.use(express.static(path.join('client/build')));

require('./startup/routes')(app, express);
require('./startup/db')();

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirnamem, 'client/public', 'index.html'));
}); 

app.listen(port, () => {
  console.log(`App running and listening on port: ${port}`)
});