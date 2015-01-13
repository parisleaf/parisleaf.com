'use strict';

import { wpRequest } from './WP';
import request from 'superagent';

export default function(app) {

  app.get('/api/menus', function *() {
    let response = yield wpRequest('/menus').exec();
    this.body = response.body;
  });

  app.get('/api/menus/:slug', function *() {
    let menus = yield wpRequest('/menus')
      .query({
        slug: this.params.slug,
      })
      .exec();

    if (menus.body.length > 0) {
      let menuId = menus.body[0].ID;
      let menu = yield wpRequest(`/menus/${menuId}`).exec();
      this.body = menu.body;
    } else {
      this.body = [];
    }
});
}
