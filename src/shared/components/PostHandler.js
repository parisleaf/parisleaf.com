'use strict';

import React from 'react';
import { State } from 'react-router';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      let { flux, params } = state;
      let PostActions = flux.getActions('posts');
      return PostActions.getPostBySlug(params.slug);
    },

    routerDidRun(state) {
      let AppActions = state.flux.getActions('app');

      AppActions.setNavTextColor('#fff');
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
    // TODO: better not-found message
    let { post } = this.state;

    if (!post) {
      return <div>Post not found</div>;
    }

    return (
      <div>
        <PostFirstImpression post={post} />
        <article>
          <SiteContainer>
            <HTMLContentArea html={post.get('content')} />
          </SiteContainer>
        </article>
      </div>
    );

  }

});

export default PostHandler;
