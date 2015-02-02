'use strict';

import { Actions } from 'flummox';
import APIService from '../services/APIService';

export default class AppActions extends Actions {

  setNavOpen(navOpen) {
    return navOpen;
  }

  setNavTextColor(navTextColor) {
    return navTextColor;
  }

  routeTransitionStart() {
    return true;
  }

  routeTransitionEnd() {
    return true;
  }

  getOptions(...args) {
    return APIService.getOptions(...args);
  }

}
