'use strict';

import Flux from 'flummox';
import Immutable from 'immutable';
let PostConstants = Flux.getConstants('PostConstants');

Flux.createStore({
  name: 'PostStore',

  initialize() {
    this.posts = Immutable.Map();
  },

  actions: [
    [PostConstants.POST_GET_POSTS_SUCCESS, function(posts) {
      posts = posts.reduce((result, post) => {
        if (post.slug) {
          result[post.slug] = post;
        }

        return result;
      }, {});

      this.posts = this.posts.merge(posts);
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

  getPosts() {
    return this.posts.toList();
  },

  getPostBySlug(slug) {
    return this.posts.get(slug);
  }

});
