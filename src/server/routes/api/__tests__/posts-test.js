'use strict';

import nock from 'nock';
import request from 'co-supertest';

describe('/api/posts', () => {
  it('returns list of posts', function *() {
    nock(process.env.WP_ENDPOINT)
      .get('/posts')
      .reply(200, [
        { slug: 'foo' },
        { slug: 'bar' },
      ]);

    let posts = yield request(server)
      .get('/api/posts')
      .end();

    expect(posts.body).to.deep.equal([
      { slug: 'foo' },
      { slug: 'bar' },
    ]);

  });
});
