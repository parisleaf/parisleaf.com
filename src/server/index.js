'use strict';

// Initialization
require('6to5/runtime');
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import '../shared/init';

// Load environment variables
import dotenv from 'dotenv';
dotenv.load();

// Create koa app
import koa from 'koa';
let app = koa();
export default app;

// Add routes
import routes from './routes';
routes(app);


// Start listening
app.listen(process.env.PORT);
console.log(`App started listening on port ${process.env.PORT}`);
