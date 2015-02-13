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

export default function(app) {
  app.get(/.*/, function *() {

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let { Handler, state } = yield new Promise((resolve, reject) => {
      Router.run(routes, this.url, (Handler, state) => resolve({ Handler, state }));
    });

    let flux = new Flux();
    let RouterActions = flux.getActions('router');
    state.flux = flux;

    RouterActions.routerWillRun(state);
    yield performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', state);

    let appString = React.renderToString(
      <FluxComponent flux={flux}>
        <Handler />
      </FluxComponent>
    );

    let title = DocumentTitle.rewind();

    yield this.render('app', {
      title,
      appString,
      env: process.env,
      initialMediaState: JSON.stringify(initialMediaState),
    });

    initialMediaState = {};
  });
}
