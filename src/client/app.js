import MediaMixin from 'react-media-mixin';

let initialMediaStateEl = document.getElementById('initial-media-state');

if (initialMediaStateEl) {
  let initialMediaState = JSON.parse(initialMediaStateEl.innerHTML);

  MediaMixin.getInitialState = function () {
    return { media: initialMediaState };
  };
}

import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import performRouteHandlerLifecyleMethod from '../shared/performRouteHandlerLifecyleMethod';

import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
let flux = new Flux();
let RouterActions = flux.getActions('router');

// Bootstrap
let bootstrapSuccess = false;
let initialRun = true;
let initialMediaState;

try {
  let initialAppStateEl = document.getElementById('initial-app-state');
  initialMediaState = initialAppStateEl.innerHTML;
  flux.deserialize(initialMediaState);
  bootstrapSuccess = true;
} catch (error) {
  console.warn(error);
}

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  state.flux = flux;

  async function run() {

    RouterActions.routerWillRun(state);

    if (initialRun && bootstrapSuccess) {
      performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', { state, flux });
      initialRun = false;
    } else {
      await performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', { state, flux });
    }

    React.render(
      <FluxComponent flux={flux}>
        <Handler />
      </FluxComponent>
      , document.getElementById('app')
    );

    await performRouteHandlerLifecyleMethod(state.routes, 'routerDidRun', { state, flux });
  }

  run().catch(error => {
    throw error;
  });
});

global.flux = flux;
