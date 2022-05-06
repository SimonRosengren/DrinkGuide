const express = require('express')
const app = express();
const port = process.env.PORT || 8000;
const path = require('path')
const pino = require('pino-http')({
  autoLogging: false
})

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(pino)

require('dotenv').config()
require('./startup/routes')(app, express);
require('./startup/db')();

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
}); 

app.listen(port, () => {
  console.log(`App running and listening on port: ${port}`)
});