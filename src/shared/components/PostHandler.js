'use strict';

import React from 'react';
import Flux from 'flummox/component';
import { State } from 'react-router';
import Helmet from 'react-helmet';

import HTMLContentArea from './HTMLContentArea';
import NotFoundHandler from './NotFoundHandler';
import PageFooter from './PageFooter';
import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';

import { rhythm, color } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

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
        <SinglePost pathname={this.getPathname()} />
      </Flux>
    );
  }

});

let SinglePost = React.createClass({
  render() {
    let { post, pathname } = this.props;

    // TODO: better not-found message
    if (!post) {
      return (
        <NotFoundHandler />
      );
    }

    let titleTag = nestedGet(post, 'meta', 'yoast_wpseo_title') || nestedGet(post, 'title');
    titleTag += " | Blog | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <article>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(post, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(post, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(post, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(post, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com"+pathname},
            {"property": "article:author", "content": nestedGet(post, 'author', 'name')},
            {"property": "article:published_time", "content": nestedGet(post, 'date_gmt')},
            {"property": "article:modified_time", "content": nestedGet(post, 'modified_gmt')},
          ]} />
        <PostFirstImpression post={post} />
        <HTMLContentArea html={post.get('content')} />
      </article>
    );
  }

});

export default PostHandler;
