'use strict';

/*
 * Polyfills
 */
require('babel-core/external-helpers');
import 'babel/polyfill';

/*
 * Superagent promisification
 */
import { Request } from 'superagent';

Request.prototype.exec = function() {
  let req = this;

  return new Promise ((resolve, reject) => {
    req.end((error, res) => {
      if (error) return reject(error);
      resolve(res);
    });
  });
};
