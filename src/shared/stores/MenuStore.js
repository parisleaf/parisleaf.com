'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

export default class MenuStore extends ImmutableStore {

  constructor(flux) {
    super();

    this.state = {
      menus: Immutable.Map(),
    };

    let menuActionIds = flux.getActionIds('menus');

    this.register(menuActionIds.getMenus, this.handleGetMenus);
  }

  handleGetMenus(newMenus) {
    newMenus = newMenus.reduce((result, menu) => {
      if (menu.slug) {
        result[menu.slug] = menu;
      }

      return result;
    }, {});

    this.setState({
      menus: this.state.menus.merge(newMenus),
    });
  }

  getMenus() {
    return this.state.menus.toList();
  }

  getMenuBySlug(slug) {
    return this.state.menus.get(slug);
  }
}
