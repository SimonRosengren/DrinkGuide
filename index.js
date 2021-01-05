const express = require('express')
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Super duper drink app right here!')
});

app.listen(port, () => {
  console.log(`App running and listening on port: ${port}!`)
});