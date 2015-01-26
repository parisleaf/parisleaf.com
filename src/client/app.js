'use strict';

// Initialization
require('../shared/init');
import './init';

let initialMediaStateEl = document.getElementById('initial-media-state');

if (initialMediaStateEl) {
  let initialMediaState = JSON.parse(initialMediaStateEl.innerHTML);

  import MediaMixin from 'react-media-mixin';
  MediaMixin.getInitialState = function () {
    return { media: initialMediaState };
  };
}

import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import Flux from 'flummox';

import performRouteHandlerLifecyleMethod from '../shared/performRouteHandlerLifecyleMethod';
import { didInitialRender } from '../shared/isInitialRender';

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  async function run() {
    await performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', state);
    React.render(<Handler />, document.getElementById('app'));
    didInitialRender();
    await performRouteHandlerLifecyleMethod(state.routes, 'routerDidRun', state);
  }

  run();
});
