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

import performRouteHandlerLifecyleMethod from '../shared/performRouteHandlerLifecyleMethod';
import { didInitialRender } from '../shared/isInitialRender';

import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
let flux = new Flux();
let RouterActions = flux.getActions('router');

// Bootstrap
let initialRun = true;
let initialMediaState;

try {
  let initialAppStateEl = document.getElementById('initial-app-state');
  initialMediaState = JSON.parse(initialAppStateEl.innerHTML);
  flux.deserialize(initialMediaState);
} catch (error) {}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  state.flux = flux;

  async function run() {
    RouterActions.routerWillRun(state);

    if (!initialRun) {
      await performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', state);
    } else {
      performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', state);
      initialRun = false;
    }

    React.render(
      <FluxComponent flux={flux}>
        <Handler />
      </FluxComponent>
    , document.getElementById('app'))

    didInitialRender();
    await performRouteHandlerLifecyleMethod(state.routes, 'routerDidRun', state);
  }

  run().catch(error => {
    throw error;
  });
});

global.flux = flux;
