const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5d59d8dc870bd0",
    pass: "e5e084ab25bcc3",
  },
});

function sendMail(message) {
  return transport.sendMail(message);
}

module.exports = sendMail;
