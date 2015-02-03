'use strict';

import React from 'react';
import { State, Link } from 'react-router';
import Flux from 'flummox';

import { filter as filterPosts } from '../utils/PostUtils';
import { rhythm, color } from '../theme';

import Header from './Header';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import BlogCard from './BlogCard';

let style = {
  postContainer: {
    backgroundColor: color('lightGray'),
    padding: `${rhythm(1)} 0`,
  },
};

let BlogHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      let PostActions = state.flux.getActions('posts');

      return PostActions.getPosts(state.query);
    },
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    return {
      query: RouterStore.getQuery(),
      posts: PostStore.getPosts(RouterStore.getQuery()),
    };
  },

  componentDidMount() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    PostStore.addListener('change', this.updatePosts);
    RouterStore.addListener('change', this.updateQuery);
  },

  componentWillUnmount() {
    let PostStore = this.context.flux.getStore('posts');
    let RouterStore = this.context.flux.getStore('router');

    PostStore.removeListener('change', this.updatePosts);
    RouterStore.removeListener('change', this.updateQuery);
  },

  updatePosts() {
    let PostStore = this.context.flux.getStore('posts');

    this.setState({
      posts: PostStore.getAllPosts(),
    });
  },

  updateQuery() {
    let RouterStore = this.context.flux.getStore('router');
    let { query, pathname } = RouterStore.getState();

    if (pathname !== '/blog') return;

    this.setState({ query });
  },

  render() {
    let posts = filterPosts(this.state.posts, this.state.query);

    let cards = posts
      .map((post, i) =>
        <div className="Blog-postContainer-item">
          <BlogCard
            post={post}
            key={post.get('ID')}
            expanded={i < 2}
          />
        </div>
      )
      .toJS();

    let postContainerStyle = Object.assign({}, style.postContainer);

    return (
      <div>
        <PageHeader
          title="Blog"
          subtitle="Sometimes we talk about News, Events, Inspriation, and Education."
        >
          <Link to="blog" query={{ category: 'events' }}>Events</Link>
          <Link to="blog" query={{ category: 'uncategorized' }}>Uncategorized</Link>
        </PageHeader>
        <div style={postContainerStyle}>
          <SiteContainer hang>
            {cards}
          </SiteContainer>
        </div>
      </div>
    );
  },

});

export default BlogHandler;
