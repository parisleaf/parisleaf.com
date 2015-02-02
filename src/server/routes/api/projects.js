'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedProjectFilters = [];

export default function(app) {

  app.get('/api/projects', function *() {
    this.set('Cache-Control', 'max-age=300');

    let filter = whitelist(this.query, acceptedProjectFilters);
    let projects = yield wp.posts()
      .type( 'project' )
      .filter(filter)
      .get();
    this.body = projects;
  });

  app.get('/api/projects/:slug', function *() {
    this.set('Cache-Control', 'max-age=300');

    this.body = yield wp.projects().slug(this.params.slug).get();
  });

}
