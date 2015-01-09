'use strict';

import path from 'path';

import gzip from 'koa-gzip';
import fresh from 'koa-fresh';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import serve from 'koa-static';
import json from 'koa-json';
import qs from 'koa-qs';
import views from 'koa-views';
import router from 'koa-router';

export default function(app) {
  // gzip compression
  app.use(gzip());

  // Conditional GET
  app.use(conditional());

  // Freshness testing
  app.use(fresh());

  // etags
  app.use(etag());

  // Serve static assets from `public` directory
  app.use(serve('public'));

  // Pretty-print JSON responses
  app.use(json());

  // Add nesting support to query strings
  qs(app);

  // Add jade rendering
  app.use(views(path.join(process.cwd(), 'views'), {
    cache: true,
    default: 'jade',
  }));

  app.use(router(app));
}
