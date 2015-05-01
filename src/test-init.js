'use strict';

require('./shared/init');

const path = require('path');
const isNode = require('detect-node');

process.env.WP_ENDPOINT = 'http://wordpress.test/wp-json';

const sourceMapSupport = require('source-map-support');
if (isNode) sourceMapSupport.install();

const chai = require('chai');

global.expect = chai.expect;

require('co-mocha');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

if (!process.env.ROOT_URL) {
  process.env.ROOT_URL = 'http://localhost' + (process.env.PORT ? `:${process.env.PORT}` : '');
}

/**
 * Start server
 */
const app = require('./server/app');
global.server = app.listen(process.env.PORT || 4000);
