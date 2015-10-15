'use strict';

import React from 'react';
import Flux from 'flummox/component';
import { State } from 'react-router';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';
import PageFooter from './PageFooter';
import NotFoundHandler from './NotFoundHandler';

import { rhythm, color } from '../theme';

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun({ state, flux }) {
      let { params } = state;
      let PostActions = flux.getActions('posts');
      return PostActions.getPostBySlug(params.slug);
    },

    getPost({ state, flux }) {
      const { params } = state;
      return flux.getStore('posts').getPostBySlug(params.slug);
    },

    routerDidRun({ state, flux }) {
      const NavActions = flux.getActions('nav');
      NavActions.setColor({ text: '#fff', background: 'rgba(0,0,0,0)' });
    }
  },

  render() {
    let { slug } = this.getParams();

    return (
      <Flux key={slug} connectToStores={{
        posts: store => ({
          post: store.getPostBySlug(slug)
        })
      }}>
        <SinglePost />
      </Flux>
    );
  }

});

let SinglePost = React.createClass({
  render() {
    let { post } = this.props;

    // TODO: better not-found message
    if (!post) {
      return (
        <NotFoundHandler navColor={color('text')} />
      );
    }

    return (
      <article>
        <PostFirstImpression post={post} />
        <HTMLContentArea html={post.get('content')} style={{
          padding: `${rhythm(2)} 0`
        }}/>
      </article>
    );
  }

});

export default PostHandler;
