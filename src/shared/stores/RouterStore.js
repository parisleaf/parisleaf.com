'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

export default class RouterStore extends ImmutableStore {

  constructor(flux) {
    super();

    let routerActionIds = flux.getActionIds('router');

    this.register(routerActionIds.routerWillRun, this.handleRouterWillRun);
  }

  handleRouterWillRun(state) {
    this.setState({
      query: state.query,
      pathname: state.pathname,
    });
  }

  getQuery() {
    return this.state.query;
  }

}
