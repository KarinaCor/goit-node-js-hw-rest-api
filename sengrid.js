require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const message = {
  to: "mksmvkarina@gmail.com",
  from: "mksmvkarina@gmail.com",
  subject: " Node.js with love",
  html: "<h1> Node is awesome</h1>",
  text: "Node is awesome",
};

sgMail
  .send(message)
  .then((response) => console.info(response))
  .catch((error) => console.error(error));
