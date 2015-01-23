'use strict';

import Immutable from 'immutable';
import { nestedGet } from './ImmutableUtils';

/**
 * Return an array of names for a given taxonomy.
 * @param {object} post
 * @param {string} slug - Slug of taxonomy.
 * @returns {array} Array of term names
 */
export function getTermNames(project, slug) {
  let terms = nestedGet(project, 'terms', slug);

  if (!Immutable.List.isList(terms)) return [];

  return terms
    .map(term => term.get('name'))
    .toJS();
}
