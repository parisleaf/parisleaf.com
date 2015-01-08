'use strict';

import middleware from './middleware';

export default function(app) {
  middleware(app);

  import wp from '../WP';

  app.get('/api/posts', function *() {
    this.body = yield wp.posts();
  });

  import React from 'react';
  import Router from 'react-router';
  import routes from '../shared/routes';

  app.get(/.*/, function *() {
    let appString = yield new Promise((resolve, reject) =>
      Router.run(routes, this.path, (Handler, state) => {
        resolve(React.renderToString(<Handler />));
      })
    );

    yield this.render('app', {
      appString,
      nodeEnv: process.env.NODE_ENV,
    })
  });
}
