const express = require('express');
const router = express.Router();

router
  .get('/', (req, res) => {
    res.render('home', {success: req.query.success === 'true', error: req.query.success === 'false'});
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
  });

module.exports = router;
