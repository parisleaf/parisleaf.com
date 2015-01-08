'use strict';

import wp from './WP';

export default function(app) {
  app.get('/api/posts', function *() {
    this.body = yield wp.posts();
  });
}
