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
        if (post.id) {
          result[post.id] = post;
        }

        return result;
      }, {});

      this.posts = this.posts.merge(posts);
      this.emit('change');
    }],

    [PostConstants.POST_GET_POST_BY_SLUG_SUCCESS, function(post) {
      if (post.id) {
        this.posts = this.posts.set(post.id, post);
      }
      
      this.emit('change');
    }],
  ],

  getPosts() {
    return this.posts.toJS();
  }

});
