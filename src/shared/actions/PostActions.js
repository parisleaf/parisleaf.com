'use strict';

import Flux from 'flummox';
import APIService from '../services/APIService';

let PostConstants = Flux.getConstants('PostConstants');

Flux.createActions({

  name: 'PostActions',

  serviceActions: {
    getPosts: [PostConstants.POST_GET_POSTS, function(query = {}) {
      return APIService.getPosts(query)
        .then((posts) => {
          return {
            posts,
            query,
          }
        });
    }],

    getPostBySlug: [PostConstants.POST_GET_POST_BY_SLUG, function(...args) {
      return APIService.getPostBySlug(...args);
    }],
  },

});
