'use strict';

import request from 'superagent';
import isNode from 'detect-node';
import _url from 'url';

/**
 * In non-browser contexts, if no hostname is given, format with `localhost`
 * as host and the proper port. Otherwise return as-is.
 * @param {string} url
 * @returns {string} Formatted url
 */
function ensureIsomorphicUrl(url) {
  return isNode
    ? _url.resolve('http://localhost' + (process.env.PORT ? `:${process.env.PORT}` : ''), url)
    : url;
}

export default ensureIsomorphicUrl;
