'use strict';

import { Actions } from 'flummox2';
import APIService from '../services/APIService';

export default class ProjectActions extends Actions {

  async getProjects(...args) {
    return await APIService.getProjects(...args);
  }

  async getProjectBySlug(...args) {
    return await APIService.getProjectBySlug(...args);
  }

}
