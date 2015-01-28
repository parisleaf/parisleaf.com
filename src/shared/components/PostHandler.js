'use strict';

import React from 'react';
import { State } from 'react-router';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');
let PostActions = Flux.getActions('PostActions');
let PostStore = Flux.getStore('PostStore');

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      AppActions.setNavTextColor('#fff');
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
