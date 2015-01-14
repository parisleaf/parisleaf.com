'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedPageFilters = [];

export default function(app) {

  app.get('/api/pages', function *() {
    let filter = whitelist(this.query, acceptedPageFilters);
    let pages = yield wp.pages().filter(filter).get();
    this.body = pages;
  });

  app.get('/api/pages/:slug', function *() {
    this.body = yield wp.pages().slug(this.params.slug).get();
  });

}
