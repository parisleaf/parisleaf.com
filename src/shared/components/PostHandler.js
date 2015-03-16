'use strict';

import React from 'react';
import Flux from 'flummox/component';
import { State } from 'react-router';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';

import { rhythm } from '../theme';

let PostHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      let { flux, params } = state;
      let PostActions = flux.getActions('posts');
      return PostActions.getPostBySlug(params.slug);
    },

    routerDidRun(state) {
      const NavActions = state.flux.getActions('nav');
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
      return <div>Post not found</div>;
    }

    return (
      <article>
        <PostFirstImpression post={post} />
        <SiteContainer>
          <HTMLContentArea html={post.get('content')} style={{
            padding: `${rhythm(2)} 0`
          }}/>
        </SiteContainer>
      </article>
    );
  }

});

export default PostHandler;
