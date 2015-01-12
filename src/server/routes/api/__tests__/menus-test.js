'use strict';

import nock from 'nock';
import request from 'co-supertest';

describe('/api/menus', () => {
  it('returns list of menus from WP-API', function *() {
    nock(process.env.WP_ENDPOINT)
      .get('/menus')
      .reply(200, [
        { slug: 'primary' },
        { slug: 'secondary' },
      ]);

    let menus = yield request(server)
      .get('/api/menus')
      .end();

    expect(menus.body).to.deep.equal([
      { slug: 'primary' },
      { slug: 'secondary' },
    ]);

  });
});
