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
export function ensureIsomorphicUrl(url) {
  return isNode
    ? _url.resolve('http://localhost' + (process.env.PORT ? `:${process.env.PORT}` : ''), url)
    : url;
}

/**
 * Get root url.
 * @return {string} url
 */
export function rootUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  } else if (isNode) {
    if (process.env.PORT) {
      return `http://localhost:${process.env.PORT}`;
    } else {
      return 'http://localhost';
    }
  }
}

/**
 * Check if url is a local url
 * @param {string} url
 * @returns {boolean}
 */
export function isLocalUrl(url) {
  let host = _url.parse(url, false, true).host;
  let rootHost = _url.parse(rootUrl(), false, true).host;

  if (!host) {
    return true;
  }

  return host === rootHost;
}

/**
 * Check if url references the WordPress backend.
 * @param {string} url
 */
export function isWPUrl(url) {
  let endpoint = process.env.WP_ENDPOINT || global.WP_ENDPOINT;

  if (!endpoint) return false;

  let urlObj = _url.parse(url, false, true);

  let host = urlObj.host;
  let wpHost = _url.parse(endpoint).host;

  if (!host) {
    return false;
  }

  if (urlObj.path && urlObj.path.startsWith('/wp-content')) {
    return false;
  }

  return host === wpHost;
}

/**
 * Remove host from url, so that it begins with '/'. If there is no host,
 * do nothing.
 * @param {[type]} url [description]
 */
export function removeHost(url) {
  let urlObj = _url.parse(url, false, true);

  if (!urlObj.host) {
    return url;
  }

  return urlObj.path;
}

/**
  * If url has a trailing slash, then remove it. 
  * @param {string} url
  * @return {string} url without trailing slash
  */
export function removeTrailingSlash(url) {
  if (url === '/') return url;

  if (url.endsWith('/')) {
    return url.substring(0, url.length - 1);
  } else {
    return url;
  }
}

export function hasLeadingSlash(url) {
  return url.startsWith('/');
}

/**
 * If url is a WP url or local url, normalize by removing the host.
 * Also ensure that it has a leading slash, and no trailing slash
 * @param {string} url
 * @return {string} Normalized url
 */
export function normalizeUrl(url) {
  if (isLocalUrl(url) || isWPUrl(url)) {
    url = removeHost(url);
    url = removeTrailingSlash(url);
  }

  return url;
}
