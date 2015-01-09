'use strict';

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';
import prepareForRun from '../../../shared/prepareForRun';

export default function(app) {
  app.get(/.*/, function *() {
    let appString = yield new Promise((resolve, reject) =>
      Router.run(routes, this.path, (Handler, state) => {
        prepareForRun(state)
          .then(() => {
            console.log('kalsdjflasd');
            let s = React.renderToString(<Handler />);
            console.log(s);
            resolve(s);
          })
      })
    );

    yield this.render('app', {
      appString,
      nodeEnv: process.env.NODE_ENV,
    });
  });
}
