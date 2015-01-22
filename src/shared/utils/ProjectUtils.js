'use strict';

import Immutable from 'immutable';
import { nestedGet } from './ImmutableUtils';

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
  let services = nestedGet(project, 'terms', 'project_service');

  if (!Immutable.List.isList(services)) return [];

  return services
    .map(term => term.get('name'))
    .toJS();
}
