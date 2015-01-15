'use strict';

import React from 'react';

import Styleguide from '../../../shared/styleguide/Styleguide.js';

export default function(app) {
  app.get('/styleguide', function *() {
    let appString = React.renderToString(<Styleguide />);
    
    yield this.render('styleguide', {
      appString,
      env: process.env,
    });
  });
}
