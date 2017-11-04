const bodyParser = require('body-parser');
const express = require('express');
const nodemailer = require('nodemailer');
const secrets = require('secrets.js');

let transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'glenn@bigpicture.life',
        pass: secrets.emailPassword
    }
});

const app = express();

app
  .set('view engine', 'pug')
  .use(express.static(`${__dirname}/public`))
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
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
  })
  .post('/contact', (req, res) => {
    let mailOptions = {
        from: '"Glenn Love" <glenn@bigpicture.life>',
        to: 'glenn@bigpicture.life',
        subject: 'Contact Form Submission',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone || 'Not provided'}\nSubject: ${req.body.subject}\n--------------------------------------\n\n${req.body.message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.redirect('/?success=false');
        }else {
          console.log('Message sent');
          return res.redirect('/?success=true');
        }
    });
  })
  .listen(3000, () => {
    console.log('Server listening on port 3000...');
  });
