const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const helmet = require('helmet');
const app = express();

app.set('trust proxy', 1);

app.use(cors());

app.use(helmet());

app.use(cookie());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

module.exports = app;
