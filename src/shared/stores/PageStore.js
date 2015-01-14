'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
let PageConstants = Flux.getConstants('PageConstants');

Flux.createStore({
  name: 'PageStore',

  initialize() {
    this.pages = Immutable.Map();
  },

  actions: [
    [PageConstants.PAGE_GET_PAGES_SUCCESS, function(pages) {
      pages = pages.reduce((result, page) => {
        if (page.slug) {
          result[page.slug] = page;
        }

        return result;
      }, {});

      this.pages = this.pages.merge(pages);
      this.emit('change');
    }],

    [PageConstants.PAGE_GET_PAGE_BY_SLUG_SUCCESS, function(page) {
      if (page.slug) {
        page = Immutable.fromJS(page);
        this.pages = this.pages.set(page.get('slug'), page);
      }

      this.emit('change');
    }],
  ],

  getPages() {
    return this.pages.toList();
  },

  getPageBySlug(slug) {
    return this.pages.get(slug);
  }

});
