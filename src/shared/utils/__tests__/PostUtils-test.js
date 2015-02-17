'use strict';

import * as PostUtils from '../PostUtils'
import Immutable from 'immutable';

describe('PostUtils', () => {

  describe('.getTermSlugs', () => {
    let { getTermSlugs } = PostUtils;

    it('returns an array of term slugs', () => {

      let p1 = Immutable.fromJS({
        terms: {
          foobar_tag: [
            { slug: 'foo' },
            { slug: 'bar' },
            { slug: 'baz' },
          ],
        }
      });

      expect(getTermSlugs(p1, 'foobar_tag')).to.deep.equal([
        'foo',
        'bar',
        'baz',
      ]);
    });

    it('returns empty array if project has no services', () => {

      let p1 = Immutable.fromJS({
        terms: {},
      })

      expect(getTermSlugs(p1, 'foobar_tag')).to.deep.equal([]);

    });

  });

  describe('hasTerm', () => {
    let { hasTerm } = PostUtils;

    it('returns true if post has term', () => {
      let p1 = Immutable.fromJS({
        terms: {
          foobar_tag: [
            { slug: 'foo' },
            { slug: 'bar' },
            { slug: 'baz' },
          ],
        }
      });

      expect(hasTerm(p1, 'foo', 'foobar_tag')).to.be.true;
      expect(hasTerm(p1, 'foo', 'barbaz_tag')).to.be.false;
      expect(hasTerm(p1, 'foobar', 'foobar_tag')).to.be.false;
    });

  });

  describe('.filter', () => {
    let { filter } = PostUtils;

    it('filters by category', () => {
      let p1 = { terms: { category: [ { slug: 'foo' }, { slug: 'bar' } ] } };
      let p2 = { terms: { category: [ { slug: 'foo' }, { slug: 'baz' } ] } };

      let posts = Immutable.fromJS([ p1, p2 ]);

      expect(filter(posts, {category: 'foo'}).toJS()).to.deep.equal([ p1, p2 ]);
      expect(filter(posts, {category: 'bar'}).toJS()).to.deep.equal([ p1 ]);
      expect(filter(posts, {category: 'baz'}).toJS()).to.deep.equal([ p2 ]);
      expect(filter(posts, {category: 'foobar'}).toJS()).to.deep.equal([]);

    });

  });

});
