'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedPostFilters = [
  'category_name',
  'category',
  'count', //check
];

export default function(app) {

  app.get('/api/posts', function *() {
    this.set('Cache-Control', 'max-age=86400');
    this.set('Vary', 'Accept-Encoding');

    let filter = whitelist(this.query, acceptedPostFilters);
    let posts = yield wp.posts().filter(filter).get();
    this.body = posts;
  });

  app.get('/api/posts/:slug', function *() {
    this.set('Cache-Control', 'max-age=86400');
    this.set('Vary', 'Accept-Encoding');

    this.body = yield wp.posts().slug(this.params.slug).get();
  });

}
