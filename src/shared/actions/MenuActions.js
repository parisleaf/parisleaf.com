'use strict';

import Flux from 'flummox';
import APIService from '../services/APIService';

let MenuConstants = Flux.getConstants('MenuConstants');

Flux.createActions({

  name: 'MenuConstants',

  serviceActions: {
    getPosts: [MenuConstants.MENU_GET_MENUS, function(...args) {
      return APIService.getPosts(...args);
    }],

    getPostBySlug: [MenuConstants.MENU_GET_MENU_BY_SLUG, function(...args) {
      return APIService.getPostBySlug(...args);
    }],
  },

});
