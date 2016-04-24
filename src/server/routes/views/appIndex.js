'use strict';

let initialMediaState = {};

import MediaMixin from 'react-media-mixin';
MediaMixin.getInitialState = function () {
  return { media: initialMediaState };
};

import React from 'react';
import Router from 'react-router';
import Helmet from 'react-helmet';

import Flux from '../../../shared/Flux';
import FluxComponent from 'flummox/component';
import NavBarColor from '../../../shared/components/NavBarColor';
import performRouteHandlerLifecyleMethod from '../../../shared/performRouteHandlerLifecyleMethod';
import routes from '../../../shared/routes';
import url from 'url';
import userAgentToMediaState from '../../userAgentToMediaState';

import { nestedGet } from '../../../shared/utils/ImmutableUtils';

export default function(app) {
  app.get(/.*/, function *() {
    this.set('Cache-Control', 'max-age=86400');
    this.set('Vary', 'Accept-Encoding');

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

    let runResult;

    try {
      runResult = yield new Promise((resolve, reject) => {
        router.run((Handler, state) => resolve({ Handler, state }));
      });

    } catch (error) {
      if (error.redirect) {
        return this.redirect(error.redirect);
      }

      throw error;
    }

    const { Handler, state } = runResult;

    let flux = new Flux();
    let RouterActions = flux.getActions('router');
    state.flux = flux;

    RouterActions.routerWillRun(state);
    yield performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', { state, flux });

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let appString;

    appString = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler />
      </FluxComponent>
    );

    let head = Helmet.rewind();

    NavBarColor.dispose();

    let initialAppState = flux.serialize();

    yield this.render('app', {
      title: head.title.toString(),
      meta: head.meta.toString(),
      link: head.link.toString(),
      appString,
      env: process.env,
      initialAppState,
      initialMediaState: JSON.stringify(initialMediaState),
    });

    initialMediaState = {};
  });
}
