const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const app = express();

const port = 4444;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
  console.log('We are live on port 4444');
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
      clientId: 'XXXXXXXXXXX',
      clientSecret: 'XXXXXXXXXXX',
      refreshToken: 'XXXXXXXXXX',
      accessToken: 'XXXXXXXXXX',
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