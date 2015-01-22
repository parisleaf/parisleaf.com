'use strict';

require('./shared/init');

import path from 'path'
import isNode from 'detect-node';

process.env.WP_ENDPOINT = 'http://wordpress.test/wp-json';

if (isNode) {
  import sourceMapSupport from 'source-map-support';
  sourceMapSupport.install();
}

import chai from 'chai';

global.expect = chai.expect;

import 'co-mocha';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

if (!process.env.ROOT_URL) {
  process.env.ROOT_URL = 'http://localhost' + (process.env.PORT ? `:${process.env.PORT}` : '');
}

/**
 * Start server
 */
import app from './server/app';
global.server = app.listen(process.env.PORT || 4000);
