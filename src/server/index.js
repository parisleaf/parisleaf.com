// Initialization
require('../shared/init');
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

// Load environment variables
import dotenv from 'dotenv';
dotenv.load();

import app from './app';

// Start listening
app.listen(process.env.PORT);
console.log(`App started listening on port ${process.env.PORT}`);
