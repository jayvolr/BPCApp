const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const hbs = require('hbs');
const mongo = require('mongodb');
const secrets = require('./secrets.js');
const session = require('express-session');

const port = secrets.port;
const app = express();
const db = app.get('env') === 'production' ? require('monk')('localhost:27017/prod') : require('monk')('localhost:27017/bpcDev');

hbs.registerPartials(__dirname + '/views/partials')

app
  .set('view engine', 'hbs')
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
  .get('*', (req, res) => {
    res.send(404, 'Error 404 - Not Found');
  })
  .listen(port, () => {
    console.log(`Server listening on port ${port}... (${app.get('env')})`);
  });
