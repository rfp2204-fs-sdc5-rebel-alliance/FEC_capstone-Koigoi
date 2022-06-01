const express = require('express');
const path = require('path');
const config = require('../client/dist/config.js');
const axios = require('axios');

const app = express();

const port = config.port || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.get('/FEC/*', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url.slice(4)}`, {
    headers: {
      Authorization: config.TOKEN
    }
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})

app.get('/qa/questions', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.originalUrl}`, {
    headers: {
      Authorization: config.TOKEN
    },
    params: req.originalUrl
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})

app.get('/reviews', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.originalUrl}`, {
    headers: {
      Authorization: config.TOKEN
    },
    params: req.originalUrl
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})

app.get('/reviews/meta', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.originalUrl}`, {
    headers: {
      Authorization: config.TOKEN
    },
    params: req.originalUrl
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})

app.post('/FEC/*', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url.slice(4)}`, req.body, {
    headers: {
      Authorization: config.TOKEN
    }
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})

app.put('/FEC/*', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${req.url.slice(4)}`, req.body, {
    headers: {
      Authorization: config.TOKEN
    }
  })
  .then((results) => {res.status(200).send(results.data)})
  .catch((err) => {
    console.log(err);
    res.sendStatus(404);
  });
})



app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => {console.log(`listening on ${port}`)});