'use strict';

// Initialization
require('../shared/init');
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

// Load environment variables
import dotenv from 'dotenv';
dotenv.load();

import app from './app';

import bunyan from 'bunyan';

let log = bunyan.createLogger({
  name: 'parisleaf',
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'error',
      path: 'parisleaf-error.log'  // log ERROR and above to a file
    }
  ]
});

app.on('error', (e) => {
  log.info(e);
});

// Start listening
app.listen(process.env.PORT);
console.log(`App started listening on port ${process.env.PORT}`);
