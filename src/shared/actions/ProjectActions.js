'use strict';

import Flux from 'flummox';
import APIService from '../services/APIService';

let ProjectConstants = Flux.getConstants('ProjectConstants');

Flux.createActions({

  name: 'ProjectActions',

  serviceActions: {
    getProjects: [ProjectConstants.PROJECT_GET_PROJECTS, function(...args) {
      return APIService.getProjects(...args);
    }],

    getProjectBySlug: [ProjectConstants.PROJECT_GET_PROJECT_BY_SLUG, function(...args) {
      return APIService.getProjectBySlug(...args);
    }],
  },

});
