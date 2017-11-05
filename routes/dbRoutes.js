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
}else {
  nodemailer.createTestAccount((err, account) => {
    transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });
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
    //Data validation
    // req.check('email', 'Invalid email address').isEmail();
    // req.check('phone', 'Invalid phone number').isMobilePhone();
    //
    // if (req.validationErrors()) {
    //
    // }

    const mailOptions = {
        from: '"Glenn Love" <glenn@bigpicture.life>',
        to: 'glenn@bigpicture.life',
        subject: 'Contact Form Submission',
        text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone || 'Not provided'}\nSubject: ${req.body.subject}\n--------------------------------------\n\n${req.body.message}`
    };

    const newPerson = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }

    req.db.get('people').insert(newPerson);

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.redirect('/?success=false');
        }else {
          console.log('Message sent');
          if (process.env.NODE_ENV !== "production") {
            console.log(nodemailer.getTestMessageUrl(info));
          }
          return res.redirect('/?success=true');
        }
    });
  });

module.exports = router;
