const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookie = require('cookie-parser');
const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookie());

app.use((req, res, next) => {
  const { secret } = req.query;
  if (!secret ) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'required query param: secret'
    });
  }
  if (secret != process.env.SECRET) {
    return res.status(403).json({
      error: 'Forbidden',
      message: 'incorrect secret'
    });
  }
  next();
});

module.exports = app;
