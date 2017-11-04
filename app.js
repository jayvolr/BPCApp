const express = require('express');
const app = express();

app
  .set('view engine', 'pug')
  .use(express.static(`${__dirname}/public`))
  .get('/', (req, res) => {
    res.render('home');
  })
  .get('/about', (req, res) => {
    res.render('about');
  })
  .get('/services', (req, res) => {
    res.render('services');
  })
  .get('/testimonials', (req, res) => {
    res.render('testimonials');
  })
  .get('/faq', (req, res) => {
    res.render('faq');
  })
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
