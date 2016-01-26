import nodemailer from 'nodemailer';
import { sentence } from 'case';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

export default function(app) {
  app.post('/contact', function *() {
    const data = this.request.body;

    const message = Object.keys(data).reduce((message, key) => {
      message += `${sentence(key)}: ${data[key]}\n`;
      return message;
    }, '');

    sendMail({
      from: process.env.CONTACT_FORM_FROM,
      to: process.env.CONTACT_FORM_TO.split(','),
      subject: `Contact Form: ${data.fullName}`,
      text: message,
      replyTo: data.email
    });

    this.body = {
      success: true
    };
  });
}

async function sendMail(options) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      error ? reject(error) : resolve();
    });
  });
}
