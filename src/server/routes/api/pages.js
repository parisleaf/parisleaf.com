'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedPageFilters = [];

export default function(app) {

  app.get('/api/pages', function *() {
    this.set('Cache-Control', 'max-age=604800');
    this.set('Vary', 'Accept-Encoding');

    let filter = whitelist(this.query, acceptedPageFilters);
    let pages = yield wp.pages().filter(filter).get();
    this.body = pages;
  });

  app.get('/api/pages/:slug', function *() {
    this.set('Cache-Control', 'max-age=604800');
    this.set('Vary', 'Accept-Encoding');

    this.body = yield wp.pages().slug(this.params.slug).get();
  });

}
