'use strict';

import Immutable from 'immutable';
import { nestedGet } from './ImmutableUtils';
import { getTermNames } from './PostUtils';
import { color } from '../theme';

/**
 * Determine if project is a case study or not
 * @param {object} project
 * @returns {boolean}
 */
export function isCaseStudy(project) {
  let projectTags = nestedGet(project, 'terms', 'project_tag');

  if (!Immutable.List.isList(projectTags)) return false;

  return projectTags
    .some(term => term.get('slug') === 'case-study');
}

/**
 * Return an array of the project's service names
 * @param {object} project
 * @returns {array}
 */
export function getServices(project) {
  return getTermNames(project, 'project_service');
}

/**
 * Return the primary color for a project, with a fallback.
 * @param {object} project
 * @returns {string} color
 */
export function getPrimaryColor(project) {
  return nestedGet(project, 'meta', 'primary_color') || color('pink');
}
