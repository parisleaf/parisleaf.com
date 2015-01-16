'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
let ProjectConstants = Flux.getConstants('ProjectConstants');

Flux.createStore({
  name: 'ProjectStore',

  initialize() {
    this.projects = Immutable.Map();
  },

  actions: [
    [ProjectConstants.PROJECT_GET_PROJECTS_SUCCESS, function(projects) {
      projects = projects.reduce((result, project) => {
        if (project.slug) {
          result[project.slug] = project;
        }

        return result;
      }, {});

      this.projects = this.projects.merge(projects);
      this.emit('change');
    }],

    [ProjectConstants.PROJECT_GET_PROJECT_BY_SLUG_SUCCESS, function(project) {
      if (project.slug) {
        project = Immutable.fromJS(project);
        this.projects = this.projects.set(project.get('slug'), project);
      }

      this.emit('change');
    }],
  ],

  getProjects() {
    return this.projects.toList();
  },

  getProjectBySlug(slug) {
    return this.projects.get(slug);
  }

});
