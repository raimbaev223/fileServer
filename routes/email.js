const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', (req, res) => {
  const authHeader = req.headers['authorization'].toString();
  console.log(authHeader)
  const token = '4ee53a846c689482f0e17aa02a5274f9';
  if (token !== authHeader) {
    res.sendStatus(401);
  }
  const email = req.body.email;
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isEmailValid = emailRegexp.test(email);
  if (!isEmailValid) {
    throw('email is not valid');
  }
  const message = 'test message from express file server'

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword',
    }
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: message,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send(`Message to ${email} successfully sent.`)
});

module.exports = router;
