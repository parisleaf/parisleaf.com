'use strict';

/**
 * Determine if project is a case study or not
 * @param {object} project
 * @returns {boolean}
 */
export function isCaseStudy(project) {
  let terms = project.get('terms');

  if (!terms) return false;

  let projectTags = terms.get('project_tag');

  if (!projectTags) return false;

  return projectTags.some(term => term.get('slug') === 'case-study');
}
