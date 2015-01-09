'use strict';

import nock from 'nock';
import isNode from 'detect-node';

describe('WPService', () => {

  describe('.getPosts()', () => {

    it('should return an array of posts', (done) => {
      if (isNode) {
        nock(process.env.ROOT_URL)
          .get('/api/posts')
          .reply(200, [
            { ID: 1 },
            { ID: 2 },
            { ID: 3 },
          ]);
      }

      import { getPosts } from '../WPService';

      expect(getPosts()).to.eventually.deep.equal([
        { ID: 1 },
        { ID: 2 },
        { ID: 3 },
      ]).notify(done);
    });

  });

  describe('.getPostBySlug()', () => {
    import { getPostBySlug } from '../WPService';

    it('should return a single post', (done) => {
      if (isNode) {
        nock(process.env.ROOT_URL)
          .get('/api/posts/hello-world')
          .reply(200, [
            { slug: 'hello-world' }
          ]);
      }

      expect(getPostBySlug('hello-world')).to.eventually.deep.equal([
        { slug: 'hello-world' }
      ]).notify(done);

    });

    it('should throw if slug is not a string', (done) => {
      expect(getPostBySlug(123)).to.be.rejectedWith('slug must be a string').notify(done);
    });

  });

});
