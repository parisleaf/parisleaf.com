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
let AppActions = Flux.getActions('AppActions');

import prepareForRun from '../shared/prepareForRun';

let isInitialRender = true;

Router.run(routes, Router.HistoryLocation, async function(Handler, state) {
  if (!isInitialRender) {
    AppActions.routeTransitionBegin(state);
  } else {
    isInitialRender = false;
  }

  await prepareForRun(state);
  React.render(<Handler />, document.getElementById('app'));

  AppActions.routeTransitionEnd(state);
});
