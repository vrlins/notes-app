'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const PORT = 8080;

const app = express();

const notes = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

// Add headers
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.get('/notes', (_req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const note = req.body;
  note.id = uuidv4();
  notes.push(note);
  res.json(note);
});

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server listening on the port::${PORT}`);
});