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
      let posts = Immutable.fromJS({
        foo: {
          slug: 'foo',
        },
        bar: {
          slug: 'bar',
        },
        baz: {
          slug: 'baz',
        },
      });

      PostStore.posts = posts;

      expect(PostStore.getPosts().toJS()).to.deep.equal([
        { slug: 'foo' },
        { slug: 'bar' },
        { slug: 'baz' },
      ]);
    });
  });

  describe('#getPostBySlug', () => {
    it('returns a post', () => {
      let posts = Immutable.fromJS({
        foo: {
          slug: 'foo',
        },
        bar: {
          slug: 'bar',
        },
        baz: {
          slug: 'baz',
        },
      });

      PostStore.posts = posts;

      expect(PostStore.getPostBySlug('foo').toJS()).to.deep.equal({ slug: 'foo' });
      expect(PostStore.getPostBySlug('bar').toJS()).to.deep.equal({ slug: 'bar' });
      expect(PostStore.getPostBySlug('foobar')).to.be.undefined;
    });
  });

  describe('responds to Flux action', () => {
    it('POST_GET_POSTS', () => {
      expect(PostStore.getPosts().toJS()).to.deep.equal([]);

      Flux.dispatch({
        actionType: 'POST_GET_POSTS_SUCCESS',
        body: [
          { slug: 'foo' },
          { slug: 'bar' },
          { slug: 'baz' },
        ],
      });

      expect(PostStore.getPosts().toJS()).to.deep.equal([
        { slug: 'foo' },
        { slug: 'bar' },
        { slug: 'baz' },
      ]);
    });

    it('POST_GET_POST_BY_SLUG', () => {
      expect(PostStore.getPosts().toJS()).to.deep.equal([]);

      Flux.dispatch({
        actionType: 'POST_GET_POST_BY_SLUG_SUCCESS',
        body: {
          slug: 'foo',
        },
      });

      expect(PostStore.getPosts().toJS()).to.deep.equal([
        { slug: 'foo' },
      ]);
    });
  });
});
