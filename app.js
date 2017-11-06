const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const mongo = require('mongodb');
const secrets = require('./secrets.js');
const session = require('express-session');

const app = express();
const db = app.get('env') === 'production' ? require('monk')('localhost:27017/prod') : require('monk')('localhost:27017/bpcDev');

app
  .set('view engine', 'pug')
  .use(express.static(`${__dirname}/public`))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(session({
    secret: secrets.sessionSecret,
    resave: false,
    saveUninitialized: false
  }))
  .use(flash())
  .use(expressValidator())
  .use((req, res, next) => {
    req.db = db;
    next();
  })
  .use(require('./routes/staticRoutes'))
  .use(require('./routes/dbRoutes'))
  .listen(3000, () => {
    console.log(`Server listening on port 3000... (${app.get('env')})`);
  });
