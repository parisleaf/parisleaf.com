'use strict';

let initialMediaState = {};

import MediaMixin from 'react-media-mixin';
MediaMixin.getInitialState = function () {
  return { media: initialMediaState };
};

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';
import performRouteHandlerLifecyleMethod from '../../../shared/performRouteHandlerLifecyleMethod';

import userAgentToMediaState from '../../userAgentToMediaState';

export default function(app) {
  app.get(/.*/, function *() {

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let { Handler, state } = yield new Promise((resolve, reject) => {
      Router.run(routes, this.url, (Handler, state) => resolve({ Handler, state }));
    });

    performRouteHandlerLifecyleMethod(state.routes, 'routerWillRun', state);

    let appString = React.renderToString(<Handler />);

    yield this.render('app', {
      appString,
      env: process.env,
      initialMediaState: JSON.stringify(initialMediaState),
    });

    initialMediaState = {};
  });
}
