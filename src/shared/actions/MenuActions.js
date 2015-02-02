'use strict';

import { Actions } from 'flummox';
import APIService from '../services/APIService';

export default class MenuActions extends Actions {

  async getMenus(...args) {
    return await APIService.getMenus(...args);
  }

}
