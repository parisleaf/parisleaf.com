'use strict';

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';

export default function(app) {
  app.get(/.*/, function *() {
    let appString = yield new Promise((resolve, reject) =>
      Router.run(routes, this.path, (Handler, state) => {
        resolve(React.renderToString(<Handler />));
      })
    );

    yield this.render('app', {
      appString,
      nodeEnv: process.env.NODE_ENV,
    });
  });
}
