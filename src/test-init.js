'use strict';

import isNode from 'detect-node';

if (isNode) {
  import sourceMapSupport from 'source-map-support';
  sourceMapSupport.install();
}

import './shared/init';
import chai from 'chai';

global.expect = chai.expect;

import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

if (!process.env.ROOT_URL) {
  process.env.ROOT_URL = 'http://localhost' + (process.env.PORT ? `:${process.env.PORT}` : '');
}
