'use strict';

import { wpRequest } from './WP';
import request from 'superagent';

export default function(app) {

  app.get('/api/menus', function *() {
    let response = yield wpRequest('/menus').exec();
    this.body = response.body;
  });

  app.get('/api/menus/:slug', function *() {
    let response = yield wpRequest('/menus')
      .query({
        slug: this.params.slug,
      })
      .exec();
    this.body = response.body;
});
}
