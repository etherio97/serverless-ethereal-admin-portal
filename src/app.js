const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookie = require('cookie-parser');
const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(cookie());

module.exports = app;
