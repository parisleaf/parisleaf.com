'use strict';

import { Store } from 'flummox2';

export default class RouterStore extends Store {

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
