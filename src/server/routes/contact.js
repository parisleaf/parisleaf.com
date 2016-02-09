import nodemailer from 'nodemailer';
import { sentence, snake } from 'case';
import validator from 'validator';

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
    // Example of a data object:
    //
    // data = {
    //   my_field_name: {
    //     value: "some input value",
    //     validations: "isEmail",
    //     validationError: "Please enter a valid email."
    //   },
    //   ...
    // }

    // Set the required fields manually for now (should match what is set in the form component)
    // TODO: Make this dynamically defined - send required field info from client?
    //       Is sending a "required" property from the client secure?
    const requiredFields = ['fullName', 'email', 'phone', 'message', 'captcha'];
    const ignoredFields = ['captcha', 'recaptcha'];
    const captchaAnswer = "I am definitely not a robot";

    // Set errors as an empty object
    let errors = {};

    // Loop through submitted fields and validate each one
    Object.keys(data).forEach(function(key) {
      const dataObject = data[key];

      // Only validate if the field name is found in requiredFields, otherwise assume the field is valid
      if (requiredFields.indexOf(key) !== -1) {

        // TODO: Check if any validations are set?

        // Process and apply the validations
        dataObject.validations.split(',').forEach(function(validation) {
          let args = validation.split(':');
          const validateMethod = args.shift();

          args = args.map(function(arg) { return JSON.parse(arg); });
          args = [dataObject.value].concat(args);

          if (!validator[validateMethod].apply(validator, args)) {
            // Add error to errors object
            errors[key] = dataObject.validationError;
          }
        });
      }

      // Validate the captcha
      if (key === "captcha") {
        if (dataObject.value.toUpperCase() !== captchaAnswer.toUpperCase()) {
          errors[key] = "Please enter the correct phrase."
        }
      }
    });

    if (Object.keys(errors).length === 0) {
      // Great success!
      const message = Object.keys(data).reduce((message, key) => {

        // Ignore "ignoredFields" when building email message
        if (ignoredFields.indexOf(key) === -1) {
          message += `${sentence(key)}: ${data[key].value}\n`;
        }
        return message;
      }, '');

      sendMail({
        from: process.env.CONTACT_FORM_FROM,
        to: process.env.CONTACT_FORM_TO.split(','),
        subject: `Contact Form: ${data.fullName.value}`,
        text: message,
        replyTo: data.email.value
      });

      this.body = {
        success: true
      };
    } else {
      // Errors found -> send out errors
      this.body = {
        errors: errors
      };
    }
  });
}

async function sendMail(options) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, (error, info) => {
      error ? reject(error) : resolve();
    });
  });
}
