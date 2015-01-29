'use strict';

import nock from 'nock';
import isNode from 'detect-node';

describe('APIService', () => {

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

      import { getPosts } from '../APIService';

      expect(getPosts()).to.eventually.deep.equal([
        { ID: 1 },
        { ID: 2 },
        { ID: 3 },
      ]).notify(done);
    });

  });

  describe('.getPostBySlug()', () => {
    import { getPostBySlug } from '../APIService';

    it('should return a single post', (done) => {
      if (isNode) {
        nock(process.env.ROOT_URL)
          .get('/api/posts/hello-world')
          .reply(200, [
            { slug: 'hello-world' }
          ]);
      }

      expect(getPostBySlug('hello-world')).to.eventually.deep.equal(
        { slug: 'hello-world' }
      ).notify(done);

    });

    it('should throw if slug is not a string', (done) => {
      expect(getPostBySlug(123)).to.be.rejectedWith('slug must be a string').notify(done);
    });

  });

  describe('.getMenus()', () => {
    if (isNode) {
      nock(process.env.ROOT_URL)
        .get('/api/menus')
        .reply(200, [
          { ID: 1 },
          { ID: 2 },
          { ID: 3 },
        ]);
    }

    import { getMenus } from '../APIService';
    it('should retreive all menus', (done) => {
      expect(getMenus()).to.eventually.deep.equal([
        { ID: 1 },
        { ID: 2 },
        { ID: 3 },
      ]).notify(done);
    });
  });

  describe('.getOptions()', (done) => {
    if (isNode) {
      nock(process.env.ROOT_URL)
        .get('/api/options')
        .reply(200, [
          { ID: 1 },
          { ID: 2 },
          { ID: 3 },
        ]);
    }

    import { getOptions } from '../APIService';
    
    it('should retreive all acf options', (done) => {
      expect(getOptions()).to.eventually.deep.equal([
        { ID: 1 },
        { ID: 2 },
        { ID: 3 },
      ]).notify(done);
    });
  });
});
