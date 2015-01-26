'use strict';

import Immutable from 'immutable';
import { nestedGet } from './ImmutableUtils';
import { color } from '../theme';

/**
 * Return an array of term slugs for a given taxonomy.
 * @param {object} post
 * @param {string} taxonomy - Taxonomy slug
 * @returns {array} Array of term slugs
 */
export function getTermSlugs(post, taxonomy) {
  let terms = nestedGet(post, 'terms', taxonomy);

  if (!Immutable.List.isList(terms)) return [];

  return terms
    .map(term => term.get('slug'))
    .toJS();
}

/**
 * Return an array of term names for a given taxonomy.
 * @param {object} post
 * @param {string} taxonomy - Taxonomy slug
 * @returns {array} Array of term names
 */
export function getTermNames(post, taxonomy) {
  let terms = nestedGet(post, 'terms', taxonomy);

  if (!Immutable.List.isList(terms)) return [];

  return terms
    .map(term => term.get('name'))
    .toJS();
}

/**
 * Check if post has a given term
 * @param {string} termSlug - Term slug
 * @param {string} taxonomySlug - Taxonomy slug
 */
export function hasTerm(post, termSlug, taxonomySlug) {
  let terms = nestedGet(post, 'terms', taxonomySlug);

  if (!Immutable.List.isList(terms)) return false;

  return terms.some(term => term.get('slug') === termSlug);
}

/**
 * Filter a List of posts.
 * @return {object} query - Parameters to filter by. Available params are a
 * subset of params available to `GET /api/posts`.
 */

export function filter(posts, query) {
  let { category } = query;

  return posts.filter(post => {
    if (category && !hasTerm(post, category, 'category')) return false;

    return true;
  });
}

export function getCardColor(post, query) {
  if (hasTerm(post, 'events', 'category')) return color('blue');
  if (hasTerm(post, 'inspiration', 'category')) return color('green');

  return color('yellow');
}

export function getFeaturedImage(post) {
  return nestedGet(post, 'featured_image', 'source');
}
