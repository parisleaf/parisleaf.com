// Initialization
require('../shared/init');
const dotenv = require('dotenv');
dotenv.load();
const app = require('./app');

const sourceMapSupport = require('source-map-support');
sourceMapSupport.install();

const bunyan = require('bunyan');

let log = bunyan.createLogger({
  name: 'parisleaf',
  streams: [
    {
      level: 'info',
      stream: process.stdout       // log INFO and above to stdout
    },
    {
      level: 'error',
      path: 'parisleaf-error.log'  // log ERROR and above to a file
    }
  ]
});

app.on('error', (e) => {
  log.error(e);
});

// Set up nodemailer
const nodemailer = require('nodemailer');

nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webadmin@parisleaf.com',
    pass: 'hEQs-|Pmj1cl?la'
  }
});

// Start listening
app.listen(process.env.PORT);
console.log(`App started listening on port ${process.env.PORT}`);
