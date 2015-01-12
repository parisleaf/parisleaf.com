'use strict';

import { wpRequest } from './WP';
import request from 'superagent';

export default function(app) {

  app.get('/api/menus', function *() {
    let response = yield wpRequest('/menus');
    this.body = response.body;
  });

}
