'use strict';

import ensureIsomorphicUrl from './ensureIsomorphicUrl';
import request from 'superagent';

/**
 * Get list of posts
 * @param {object} query - Query params
 * @returns {Promise} Resolves to array of posts
 */
export function getPosts(query = {}) {
  return request.get(ensureIsomorphicUrl('/api/posts')).query(query).exec()
    .then(response => {
      return response.body;
    });
}

/**
 * Get a post by its slug
 * @param {string} slug - post slug
 * @param {object} [query] - Query params
 * @returns {Promise} Resolves to post object
 */
export function getPostBySlug(slug, query = {}) {
  if (typeof slug !== 'string') {
    return Promise.reject(new Error('slug must be a string'));
  }

  return request.get(ensureIsomorphicUrl(`/api/posts/${slug}`)).query(query).exec()
    .then(response => response.body[0]);
}

/**
 * Get list of menus
 * @param {object} query - Query params
 * @returns {Promise} Resolves to array of menus
 */
export function getMenus(query = {}) {
  return request.get(ensureIsomorphicUrl('/api/menus')).query(query).exec()
    .then(response => response.body);
}

/**
 * Get a menu by its slug
 * @param {string} slug - post slug
 * @param {object} [query] - Query params
 * @returns {Promise} Resolves to menu object
 */
export function getMenuBySlug(slug, query = {}) {
  if (typeof slug !== 'string') {
    return Promise.reject(new Error('slug must be a string'));
  }

  return request.get(ensureIsomorphicUrl(`/api/menus/${slug}`)).query(query).exec()
    .then(response => response.body[0]);
}
