const config = require('../config.js');

const express = require('express');
const path = require('path');

const app = express();

const port = config.port || 3000;

//middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {console.log(`listening on ${port}`)});