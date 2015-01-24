'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
import Qs from 'qs';
let PostConstants = Flux.getConstants('PostConstants');

Flux.createStore({
  name: 'PostStore',

  initialize() {
    this.posts = Immutable.Map();
    this.queries = Immutable.Map();
  },

  actions: [
    [PostConstants.POST_GET_POSTS_SUCCESS, function(result) {
      let { posts, query } = result;

      posts = Immutable.fromJS(posts.reduce((result, post) => {
        if (post.slug) {
          result[post.slug] = post;
        }

        return result;
      }, {}));

      query = Qs.stringify(query);

      this.posts = this.posts.merge(posts);
      this.queries = this.queries.set(query, posts.toList().map(post => post.get('slug')));
      this.emit('change');
    }],

    [PostConstants.POST_GET_POST_BY_SLUG_SUCCESS, function(post) {
      if (post.slug) {
        post = Immutable.fromJS(post);
        this.posts = this.posts.set(post.get('slug'), post);
      }

      this.emit('change');
    }],
  ],

  getPosts(query = {}) {
    let slugs = this.queries.get(Qs.stringify(query));

    return slugs
      ? slugs.map(slug => this.posts.get(slug))
      : Immutable.List([]);
  },

  getAllPosts() {
    return this.posts.toList();
  },

  getPostBySlug(slug) {
    return this.posts.get(slug);
  }

});
