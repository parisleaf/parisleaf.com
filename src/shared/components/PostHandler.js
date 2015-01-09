'use strict';

import React from 'react';
import { State } from 'react-router';

import Flux from 'flummox';
let PostActions = Flux.getActions('PostActions');
let PostStore = Flux.getStore('PostStore');

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    prepareForRun(state) {
      return PostActions.getPostBySlug(state.params.slug);
    }
  },

  getInitialState() {
    let slug = this.getParams().slug;

    return {
      post: PostStore.getPostBySlug(slug),
    };
  },

  render() {
    let post = this.state.post;

    return (
      <div>
        <h1>{post.get('title')}</h1>
        <article dangerouslySetInnerHTML={{ __html: post.get('content') }} />
      </div>
    );

  }

});

export default PostHandler;
