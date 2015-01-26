'use strict';

import React from 'react';
import { State, Link } from 'react-router';
import Flux from 'flummox';
let PostActions = Flux.getActions('PostActions');
let PostStore = Flux.getStore('PostStore');
let RouterStore = Flux.getStore('RouterStore');

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
}

let BlogHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun(state) {
      return PostActions.getPosts(state.query);
    },
  },

  getInitialState() {
    return {
      query: RouterStore.getQuery(),
      posts: PostStore.getPosts(RouterStore.getQuery()),
    };
  },

  componentDidMount() {
    PostStore.addListener('change', this.updatePosts);
    RouterStore.addListener('routerWillRun', this.updateQuery);
  },

  componentWillUnmount() {
    PostStore.removeListener('change', this.updatePosts);
    RouterStore.removeListener('routerWillRun', this.updateQuery);
  },

  updatePosts() {
    this.setState({
      posts: PostStore.getAllPosts(),
    });
  },

  updateQuery() {
    let { query, pathname } = RouterStore.getState();

    if (pathname !== '/blog') return;

    this.setState({
      query: RouterStore.getQuery(),
    })
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
        <SiteContainer>
          <PageHeader
            title="Blog"
            subtitle="Sometimes we talk about News, Events, Inspriation, and Education."
          >
            <Link to="blog" query={{ category: 'events' }}>Events</Link>
            <Link to="blog" query={{ category: 'uncategorized' }}>Uncategorized</Link>
          </PageHeader>
        </SiteContainer>
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
