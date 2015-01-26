'use strict';

import React from 'react';
import { State, Link } from 'react-router';
import Flux from 'flummox';
let PostActions = Flux.getActions('PostActions');
let PostStore = Flux.getStore('PostStore');
let RouterStore = Flux.getStore('RouterStore');

import moment from 'moment';
import { nestedGet } from '../utils/ImmutableUtils';
import { getTermNames, filter as filterPosts } from '../utils/PostUtils';
import { rhythm, color, siteContainerRhythmPadding } from '../theme';

import Header from './Header';
import SiteContainer from './SiteContainer';

let style = {
  postContainer: {
    backgroundColor: color('lightGray'),
    padding: `${rhythm(1)} 0`,
  },

  post: {
    padding: rhythm(siteContainerRhythmPadding - 1/4),
    margin: `${rhythm(1/2)} 0`,
    borderLeft: `${rhythm(1/4)} ${color('blue')} solid`,
    backgroundColor: '#fff',
    height: rhythm(16),
    overflow: 'hidden',
  },

  title: {
    margin: 0,
  },

  metadata: {
    marginTop: 0,
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
    this.setState({
      query: RouterStore.getQuery(),
    })
  },

  render() {
    let posts = filterPosts(this.state.posts, this.state.query);

    posts = posts
      .map(post =>
        <div className="Blog-postContainer-item">
          <BlogPost post={post} key={post.get('ID')} />
        </div>
      )
      .toJS();

    let postContainerStyle = Object.assign({}, style.postContainer);

    return (
      <div>
        <SiteContainer>
          <div className="BorderContainer BorderContainer--noHang">
            <Header level={1}>Blog</Header>
            <Header level={2}>Sometimes we talk about News, Events, Inspriation, and Education.</Header>
            <Link to="blog" query={{ category: 'events' }}>Events</Link>
            <Link to="blog" query={{ category: 'uncategorized' }}>Uncategorized</Link>
          </div>
        </SiteContainer>
        <div style={postContainerStyle}>
          <SiteContainer>
            {posts}
          </SiteContainer>
        </div>
      </div>
    );
  },

});

let BlogPost = React.createClass({

  componentDidMount() {
    // Truncate multi-line excerpt
    import Ellipsis from 'ftellipsis';
    this.ellipsis = new Ellipsis(this.refs.excerpt.getDOMNode());

    this.ellipsis.calc();
    this.ellipsis.set();
    window.addEventListener('resize', this.recalcEllipsis);
  },

  componentWillUnmount() {
    this.ellipsis.destroy();
    window.removeEventListener('resize', this.recalcEllipsis);
  },

  recalcEllipsis() {
    this.ellipsis.unset();
    this.ellipsis.calc();
    this.ellipsis.set();
  },

  render() {
    let { post } = this.props;

    let _postStyle = Object.assign({}, style.post);

    return (
      <article style={_postStyle} className="Blog-post">
        <header className="Blog-post-header">
          <Header level={3} style={style.title} dangerouslySetInnerHTML={{ __html: post.get('title') }}/>
          <PostMeta post={post} />
        </header>
        <div className="Excerpt Blog-post-excerpt" ref="excerpt" dangerouslySetInnerHTML={{ __html: post.get('excerpt') }} />
      </article>
    );
  },

});

let PostMeta = React.createClass({

  render() {
    let { post } = this.props;

    let byline = `By ${nestedGet(post, 'author', 'name')}`
    let dateline = `on ${this.dateString()}`;
    let categoryList = this.categoryList();

    return (
      <p className="Metadata" style={style.metadata}>
        <span>{byline}</span> <span>{dateline}</span>
        { categoryList }
      </p>
    );
  },

  dateString() {
    let date = new Date(this.props.post.get('date'));

    if (date.getFullYear() !== new Date().getFullYear()) {
      return moment(date).format('MMM DD');
    } else {
      return moment(date).format('MMM DD YYYY');
    }
  },

  categoryList() {
    let categories = getTermNames(this.props.post, 'category');

    if (!categories.length) return null;

    return (
      <span> from {categories.join(' ,')}</span>
    );
  }

});


export default BlogHandler;
