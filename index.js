const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const app = express();

const port = process.env.PORT;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log("We are live on port %d", port);
});


app.get('/', (req, res) => {
  res.send('Welcome to my api');
})

app.post('/api/v1', (req,res) => {
  var data = req.body;





var smtpTransport = nodemailer.createTransport({
     service: "gmail",
     auth: {
      type: 'OAuth2',
      user: 'hodermail@gmail.com',
      clientId: '452423514168-u2c2r0i2h9hrttvagdrv2qgh1u1hitv1.apps.googleusercontent.com',
      clientSecret: 'SRs3z8CJDkKxQ6RdrUgc0Kuu',
      refreshToken: '1/nsZ7X5jwoZJ4O8Zs9LE5IGGtq9PqRmvn4yBGptjjkoY',
      accessToken: 'Xxxxxxxx',
	  expires: 1484314697598
},
   tls: {
        rejectUnauthorized: false
    }
  
});

var mailOptions = {
  from: 'hodermail@gmail.com',
  to: 'hodersolutions@gmail.com',
  subject: 'Feedback',
  html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
};

smtpTransport.sendMail(mailOptions,
(error, response) => {
	console.log("Hi");
  if(error) {
	console.log(error);  
    res.send(error)
  }else {
	console.log("Message sent: " + response.message);  
    res.send('Success')
  }
  smtpTransport.close();
});

})
