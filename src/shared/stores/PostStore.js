'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';
import Qs from 'qs';

export default class PostStore extends Store {

  constructor(flux) {
    super();

    this.state = {
      posts: Immutable.Map(),
      queries: Immutable.Map(),
    };

    let postActionIds = flux.getActionIds('posts');

    this.registerAsync(postActionIds.getPosts, null, this.handleGetPosts, null);
    this.register(postActionIds.getPostBySlug, this.handleGetSinglePost);
  }

  handleGetPosts(body) {
    let { posts: newPosts, query: newQuery } = body;

    newQuery = Qs.stringify(newQuery);

    newPosts = Immutable.fromJS(newPosts.reduce((result, post) => {
      if (!post) return;

      result[post.slug] = post;

      return result;
    }, {}));

    this.setState({
      posts: this.state.posts.merge(newPosts),
      queries: this.state.queries.set(newQuery, newPosts.toList().map(post => post.get('slug'))),
    });
  }

  handleGetSinglePost(newPost) {
    if (!newPost) return;

    newPost = Immutable.fromJS(newPost);

    this.setState({
      posts: this.state.posts.set(newPost.get('slug'), newPost),
    });
  }

  getPosts(query = {}) {
    let slugs = this.state.queries.get(Qs.stringify(query));

    return slugs
      ? slugs.map(slug => this.state.posts.get(slug))
      : Immutable.List([]);
  }

  getAllPosts() {
    return this.state.posts.toList();
  }

  getPostBySlug(slug) {
    return this.state.posts.get(slug);
  }

}
