'use strict';

import Flux from 'flummox';
import APIService from '../services/APIService';

let PageConstants = Flux.getConstants('PageConstants');

Flux.createActions({

  name: 'PageActions',

  serviceActions: {
    getPages: [PageConstants.PAGE_GET_PAGES, function(...args) {
      return APIService.getPages(...args);
    }],

    getPageBySlug: [PageConstants.PAGE_GET_PAGE_BY_SLUG, function(...args) {
      return APIService.getPageBySlug(...args);
    }],
  },

});
