'use strict';

import Immutable from 'immutable';
import Flux from 'flummox';
import '../../constants/PostConstants';
import '../../actions/PostActions';
import '../PostStore';

describe('PostStore', () => {

  let PostConstants, PostStore, PostActions;

  beforeEach(() => {
    PostConstants = Flux.getConstants('PostConstants');
    PostStore = Flux.getStore('PostStore');
    PostActions = Flux.getActions('PostActions');
  });

  afterEach(() => {
    Flux.reset();
  });

  describe('#getPosts', () => {
    it('returns a list of posts', () => {
      Flux.dispatch({
        actionType: 'POST_GET_POSTS_SUCCESS',
        body: {
          posts: [
            { slug: 'foo' },
            { slug: 'bar' },
            { slug: 'baz' },
          ],
          query: {},
        },
      });

      expect(PostStore.getPosts().toJS()).to.deep.equal([
        { slug: 'foo' },
        { slug: 'bar' },
        { slug: 'baz' },
      ]);
    });
  });

  describe('#getPostBySlug', () => {
    it('returns a post', () => {
      Flux.dispatch({
        actionType: 'POST_GET_POST_BY_SLUG_SUCCESS',
        body: {
          slug: 'foo',
        },
      });

      Flux.dispatch({
        actionType: 'POST_GET_POST_BY_SLUG_SUCCESS',
        body: {
          slug: 'bar',
        },
      });

      expect(PostStore.getPostBySlug('foo').toJS()).to.deep.equal({ slug: 'foo' });
      expect(PostStore.getPostBySlug('bar').toJS()).to.deep.equal({ slug: 'bar' });
      expect(PostStore.getPostBySlug('foobar')).to.be.undefined;
    });
  });

});
