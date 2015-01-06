'use strict';

import './shared/init';

import dotenv from 'dotenv';
dotenv.load();

import { log } from 'winston';

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


app.get('/api/posts', function *() {

  let { body: posts } = yield request(url.resolve(process.env.WORDPRESS_URL, '/wp-json/posts')).exec();

  this.body = {
    posts,
  };
});

import React from 'react';
import App from './shared/components/App';

app.get('/', function *() {
  let appString = React.renderToString(<App />);

  yield this.render('app', {
    appString,
  });
});

app.listen(process.env.PORT);
log('info', `App started listening on port ${process.env.PORT}`);
