'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

export default class PageStore extends ImmutableStore {

  constructor(flux) {
    super();

    this.state = {
      pages: Immutable.Map(),
    };

    let pageActionIds = flux.getActionIds('pages');

    this.register(pageActionIds.getPageBySlug, this.handleGetPageBySlug);
  }

  handleGetPageBySlug(newPage) {
    if (!newPage) return;

    newPage = Immutable.fromJS(newPage);

    this.setState({
      pages: this.state.pages.set(newPage.get('slug'), newPage),
    });
  }

  getPageBySlug(slug) {
    return this.state.pages.get(slug);
  }
}
