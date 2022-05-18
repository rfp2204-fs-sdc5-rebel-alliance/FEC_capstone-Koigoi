const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {console.log(`listening on ${port}`)});