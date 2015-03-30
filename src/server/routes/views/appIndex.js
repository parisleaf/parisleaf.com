'use strict';

let initialMediaState = {};

import MediaMixin from 'react-media-mixin';
MediaMixin.getInitialState = function () {
  return { media: initialMediaState };
};

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';

import DocumentTitle from 'react-document-title';

import performRouteHandlerLifecyleMethod from '../../../shared/performRouteHandlerLifecyleMethod';

import userAgentToMediaState from '../../userAgentToMediaState';

import FluxComponent from 'flummox/component';
import Flux from '../../../shared/Flux';

import NavBarColor from '../../../shared/components/NavBarColor';

export default function(app) {
  app.get(/.*/, function *() {

  const router = Router.create({
    routes: routes,
    location: this.url,
    onError: error => {
      throw error;
    },
    onAbort: abortReason => {
      const error = new Error();

      if (abortReason.constructor.name === 'Redirect') {
        const { to, params, query } = abortReason;
        const url = router.makePath(to, params, query);
        error.redirect = url;
      }

      throw error;
    }
  });

    let { Handler, state } = yield new Promise((resolve, reject) => {
      router.run((Handler, state) => resolve({ Handler, state }));
    });

    let flux = new Flux();
    let RouterActions = flux.getActions('router');
    state.flux = flux;

    RouterActions.routerWillRun(state);
    yield performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', { state, flux });

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let appString;

    try {
      appString = React.renderToString(
        <FluxComponent flux={flux}>
          <Handler />
        </FluxComponent>
      );
    } catch (error) {
      if (error.redirect) {
        return this.redirect(error.redirect);
      }

      throw error;
    }

    let title = DocumentTitle.rewind();
    NavBarColor.dispose();

    let initialAppState = flux.serialize();

    yield this.render('app', {
      title,
      appString,
      env: process.env,
      initialAppState,
      initialMediaState: JSON.stringify(initialMediaState),
    });

    initialMediaState = {};
  });
}
