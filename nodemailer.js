// const nodemailer = require("nodemailer");

// const transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     // user: process.env.MAILTRUP_USER,
//     // pass: process.env.MAILTRUP_PASSWORD,
//     user: "5d59d8dc870bd0",
//     pass: "e5e084ab25bcc3",
//   },
// });

// const message = {
//   to: "mksmvkarina@gmail.com",
//   from: "mksmvkarina@gmail.com",
//   subject: " Node.js with love",
//   html: "<h1> Node is awesome</h1>",
//   text: "Node is awesome",
// };

// transport
//   .sendMail(message)
//   .then((response) => console.info(response))
//   .catch((error) => console.error(error));




// const { MAILTRUP_USER } = process.env;
// const { MAILTRUP_PASSWORD } = process.env;

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5d59d8dc870bd0",
    pass: "e5e084ab25bcc3",
  },
});
 

const message = {
  to: "mksmvkarina@gmail.com",
  from: "mksmvkarina@gmail.com",
  subject: "From Node.js with love",
  html: "<h1>Node.js is awesome platform</h1>",
  text: "Node.js is awesome platform",
};

transport
  .sendMail(message)
  .then((response) => console.info(response))
  .catch((error) => console.error(error));
  
