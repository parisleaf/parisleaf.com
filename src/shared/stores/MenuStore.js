'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
let MenuConstants = Flux.getConstants('MenuConstants');

Flux.createStore({
  name: 'MenuStore',

  initialize() {
    this.menus = Immutable.Map();
  },

  actions: [
    [MenuConstants.MENU_GET_MENUS_SUCCESS, function(menus) {
      menus = menus.reduce((result, menu) => {
        if (menu.slug) {
          result[menu.slug] = menu;
        }

        return result;
      }, {});

      this.menus = this.menus.merge(menus);
      this.emit('change');
    }],

  ],

  getMenus() {
    return this.menus.toList();
  },

});
