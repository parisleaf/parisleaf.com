'use strict';

import { Actions } from 'flummox2';
import APIService from '../services/APIService';

export default class PostActions extends Actions {

  async getPages(...args) {
    return await APIService.getPages(...args);
  }

  async getPageBySlug(...args) {
    return await APIService.getPageBySlug(...args);
  }

}
