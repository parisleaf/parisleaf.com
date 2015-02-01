'use strict';

import React from 'react';
import { State } from 'react-router';

import Flux from 'flummox';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      let { flux, params } = state;
      let PostActions = flux.getActions('posts');
      let AppActions = flux.getActions('app');

      AppActions.setNavTextColor('#fff');
      return PostActions.getPostBySlug(state.params.slug);
    }
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let PostStore = this.context.flux.getStore('posts');

    return {
      post: PostStore.getPostBySlug(this.getParams().slug),
    };
  },

  componentDidMount() {
    let PostStore = this.context.flux.getStore('posts');

    PostStore.addListener('change', this.postStoreDidChange);
  },

  componentWillUnmount() {
    let PostStore = this.context.flux.getStore('posts');

    PostStore.removeListener('change', this.postStoreDidChange);
  },

  postStoreDidChange() {
    let PostStore = this.context.flux.getStore('posts');

    this.setState({
      post: PostStore.getPostBySlug(this.getParams().slug),
    });
  },

  render() {
    let post = this.state.post;

    if (!post) {
      return <div>Post not found</div>;
    }

    return (
      <div>
        <PostFirstImpression post={post} />
        <SiteContainer>
          <article dangerouslySetInnerHTML={{ __html: post.get('content') }} />
        </SiteContainer>
      </div>
    );

  }

});

export default PostHandler;
