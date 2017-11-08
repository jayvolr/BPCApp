const express = require('express');
const router = express.Router();
const secrets = require('../secrets.js');
const nodemailer = require('nodemailer');

let transporter;

if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'glenn@bigpicture.life',
      pass: secrets.emailPassword
    }
  });
  console.log('Using production email transporter');
}else {
  transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: secrets.etherealUser,
          pass: secrets.etherealPass
      }
  });
  console.log('Using mock email transporter');
}

router
  .get('/db', (req, res) => {
    const people = req.db.get('people');
    people.find({}).then(data => {
      res.send(data);
    })
  })
  .post('/contact', (req, res) => {
    // Data validation
    req.check('email', 'Invalid email address').isEmail();
    req.check('email', 'Email addresses don\'t match').equals(req.body.email2);
    if (!!req.body.phone) {
      req.check('phone', 'Invalid phone number').isMobilePhone('en-US');
    }
    if (!!req.body.orgZIP) {
      req.check('orgZIP', 'Invalid ZIP code').isPostalCode('US');
    }
    const errors = req.validationErrors();

    if (errors) {
      req.session.error = 'Your message was not sent. There was an error with the information you submitted.';
      res.redirect('/');
      console.log('Form validation errors');
    }else {
      req.flash('info', 'Thank you! Your message has been sent. We\'ll get back to you ASAP.');
      res.redirect('/');

      const mailOptions = {
        from: '"Glenn Love" <glenn@bigpicture.life>',
        to: 'glenn@bigpicture.life',
        subject: 'Contact Form Submission',
        text: `Name: ${req.body.firstName + ' ' + req.body.lastName}\nEmail: ${req.body.email}\nPhone: ${req.body.phone || 'Not provided'}\nOrganization Name: ${req.body.orgName}\nOrganization ZIP: ${req.body.orgZIP}\nReferrer: ${req.body.referrer}\nSubject: ${req.body.subject}\n--------------------------------------\n\n${req.body.message}`
      };

      const newPerson = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        orgName: req.body.orgName,
        orgZIP: req.body.orgZIP,
        referrer: req.body.referrer,
        optOut: req.body.optOut === 'on' ? true : false
      }

      req.db.get('people').insert(newPerson);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        }else {
          console.log('Message sent');
          if (process.env.NODE_ENV !== "production") {
            console.log(nodemailer.getTestMessageUrl(info));
          }
        }
      });

      const confirmationMailOptions = {
        from: '"Glenn Love" <glenn@bigpicture.life>',
        to: req.body.email,
        subject: 'Confirmation',
        html: `${req.body.firstName},
        <br><br>
        Thank you for reaching out to me. I will be in touch with you soon.
        <br><br>
        Respectfully,
        <br><br>
        Glenn Love<br>
        President<br>
        Big Picture Consulting
        <br><br>
        <i>We're in it with you</i>`
      };

      transporter.sendMail(confirmationMailOptions, (error, info) => {
        if (error) {
          console.error(error);
        }else {
          console.log('Confirmation Email sent');
          if (process.env.NODE_ENV !== "production") {
            console.log(nodemailer.getTestMessageUrl(info));
          }
        }
      });
    }
  });

module.exports = router;
