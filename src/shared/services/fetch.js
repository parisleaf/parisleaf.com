'use strict';

import _fetch from 'isomorphic-fetch';
import isNode from 'detect-node';
import _url from 'url';

/**
 * A fetch function based on `window.fetch` (https://fetch.spec.whatwg.org/).
 * Only difference is that in a non-browser context, the url is resolved
 * relative to `localhost:PORT>`.
 * @param  {string} url - url of request
 * @param  {object} options - Passed directly to `isomorphic-fetch` package
 * @return {Promise} Promise for response
 */
function fetch(url, ...args) {
  return _fetch(ensureIsomorphicUrl(url), ...args);
}

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

export default fetch;
export { ensureIsomorphicUrl };
