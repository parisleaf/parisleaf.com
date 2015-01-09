'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedPostFilters = [];

export default function(app) {

  app.get('/api/posts', function *() {
    let filter = whitelist(this.query, acceptedPostFilters);

    this.body = yield wp.posts().filter(filter).get();
  });

  app.get('/api/posts/:slug', function *() {
    this.body = yield wp.posts().slug(this.params.slug).get();
  });
}
