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
    return {
      post: PostStore.getPostBySlug(this.getParams().slug),
    };
  },

  componentDidMount() {
    PostStore.addListener('change', this.postStoreDidChange);
  },

  componentWillUnmount() {
    PostStore.removeListener('change', this.postStoreDidChange);
  },

  postStoreDidChange() {
    this.setState({
      posts: PostStore.getPostBySlug(this.getParams().slug),
    });
  },

  render() {
    let post = this.state.post;

    if (!post) {
      return <div>Post not found</div>;
    }

    return (
      <div>
        <h1>{ post.get('title') }</h1>
        <article dangerouslySetInnerHTML={{ __html: post.get('content') }} />
      </div>
    );

  }

});

export default PostHandler;
