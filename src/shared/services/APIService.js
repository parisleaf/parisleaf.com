'use strict';

import { ensureIsomorphicUrl } from '../utils/LinkUtils';
import request from 'superagent';

/**
 * Get list of posts
 * @param {object} query - Query params
 * @returns {Promise} Resolves to array of posts
 */
export async function getPosts(query = {}) {
  let posts = await request.get(ensureIsomorphicUrl('/api/posts')).query(query).exec();
  return posts.body;
}

/**
 * Get a post by its slug
 * @param {string} slug - post slug
 * @param {object} [query] - Query params
 * @returns {Promise} Resolves to post object
 */
export async function getPostBySlug(slug, query = {}) {
  if (typeof slug !== 'string') {
    throw new Error('slug must be a string');
  }

  let posts = await request.get(ensureIsomorphicUrl(`/api/posts/${slug}`)).query(query).exec();
  return posts.body[0];
}

/**
 * Get list of menus
 * @param {object} query - Query params
 * @returns {Promise} Resolves to array of menus
 */
export async function getMenus(query = {}) {
  let menus = await request.get(ensureIsomorphicUrl('/api/menus')).query(query).exec();
  return menus.body;
}

/**
 * Get a menu by its slug
 * @param {string} slug - post slug
 * @param {object} [query] - Query params
 * @returns {Promise} Resolves to menu object
 */
export async function getMenuBySlug(slug, query = {}) {
  if (typeof slug !== 'string') {
    throw new Error('slug must be a string');
  }

  let menu = await request.get(ensureIsomorphicUrl(`/api/menus/${slug}`)).query(query).exec();
  return menu.body[0];
}
