'use strict';

import nock from 'nock';
import request from 'co-supertest';
/* describe('/api/menus', () => {
   it('returns list of menus from WP-API', function *() {
   nock(process.env.WP_ENDPOINT)
   .get('/menus')
   .reply(200, [
   { ID: '2' },
   { ID: '3' },
   ]);
   // Add second request to catch the second nock
   // do not persist
   nock(process.env.WP_ENDPOINT)
   .get('/menus')
   .reply(200, [
   { ID: '2' },
   { ID: '3' },
   ]);   
   let menus = yield request(server)
   .get('/api/menus')
   .end();

   console.log(menus);

   expect(menus.body).to.deep.equal([
   { ID: '2' },
   { ID: '3' },
   ]);

   });
   }); */
