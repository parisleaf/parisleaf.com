'use strict';

// Create koa app
import koa from 'koa';
let app = koa();
export default app;

// Add routes
import routes from './routes';
routes(app);

export default app;
