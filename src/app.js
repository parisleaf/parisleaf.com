'use strict';

import './shared/init';

import dotenv from 'dotenv';
dotenv.load();

import koa from 'koa';
let app = koa();

import serve from 'koa-static';
app.use(serve('public'));

import json from 'koa-json';
app.use(json());

import qs from 'koa-qs';
qs(app);

import views from 'koa-views';

let viewsOptions = {
  cache: true,
};

viewsOptions.default = 'jade';
app.use(views('../views', viewsOptions));

import router from 'koa-router';
app.use(router(app));

import request from 'superagent';
import url from 'url';

import wp from './WP';

app.get('/api/posts', function *() {
  this.body = yield wp.posts();
});

import React from 'react';
import Router from 'react-router';
import routes from './shared/routes';

app.get(/.*/, function *() {
  let appString = yield new Promise((resolve, reject) =>
    Router.run(routes, this.path, (Handler, state) => {
      resolve(React.renderToString(<Handler />));
    })
  );

  yield this.render('app', {
    appString,
    nodeEnv: process.env.NODE_ENV,
  })
});

app.listen(process.env.PORT);
console.log(`App started listening on port ${process.env.PORT}`);
