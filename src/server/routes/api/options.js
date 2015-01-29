// ACF options route
'use strict';

import { wpRequest } from './WP';
import request from 'superagent';

export default function(app) {
  app.get('/api/options', function *() {
    let options = yield wpRequest('/acf/options').exec();

    this.body = options.body;
  });
}
