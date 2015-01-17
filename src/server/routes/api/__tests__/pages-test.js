'use strict';

import nock from 'nock';
import request from 'co-supertest';

describe('/api/pages', () => {
  it('returns list of pages', function *() {
    nock(process.env.WP_ENDPOINT)
      .get('/pages')
      .reply(200, [
        { slug: 'foo' },
        { slug: 'bar' },
      ]);

    let pages = yield request(server)
      .get('/api/pages')
      .end();

    expect(pages.body).to.deep.equal([
      { slug: 'foo' },
      { slug: 'bar' },
    ]);

  });
});
