'use strict';

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';
import prepareForRun from '../../../shared/prepareForRun';

export default function(app) {
  app.get(/.*/, function *() {
    let { Handler, state } = yield new Promise((resolve, reject) => {
      Router.run(routes, this.path, (Handler,state) => resolve({ Handler, state }));
    });

    yield prepareForRun(state);

    let appString = React.renderToString(<Handler />);

    yield this.render('app', {
      appString,
      env: process.env,
    });
  });
}
