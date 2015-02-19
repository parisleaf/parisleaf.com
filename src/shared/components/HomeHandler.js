'use strict';

import React from 'react';
import HomeFirstImpression from './HomeFirstImpression';
import HomeProcessSection from './HomeProcessSection';
import MoreFromBlog from './MoreFromBlog';

import Flux from 'flummox/component';

import Immutable from 'immutable';
import { color } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let Home = React.createClass({

  statics: {
    async routerWillRun(state) {
      let PageActions = state.flux.getActions('pages');
      let ProjectActions = state.flux.getActions('projects');
      let PostActions = state.flux.getActions('posts');
      let PageStore = state.flux.getStore('pages');

      await PageActions.getPageBySlug('home');
      let homePage = PageStore.getPageBySlug('home');

      if (homePage) {
        // Don't wait for posts to load, since they are down the page
        getFirstImpressionPostSlugs(homePage)
          .toArray()
          .forEach(slug => PostActions.getPostBySlug(slug))

        await Promise.all(
          getFirstImpressionProjectSlugs(homePage)
            .toArray()
            .map(slug => ProjectActions.getProjectBySlug(slug))
        );
      }
    },
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: (store) => ({
          page: store.getPageBySlug('home')
        }),
      }}>
        <HomePage />
      </Flux>
    );
  }

});

let HomePage = React.createClass({
  render() {
    let { page } = this.props;

    return (
      <div>
        <Flux connectToStores={{
          projects: (store) => ({
            projects: getFirstImpressionProjectSlugs(this.props.page)
              .map(slug => store.getProjectBySlug(slug))
              .toArray()
          })
        }}>
          <HomeFirstImpression page={page} />
        </Flux>

        <HomeProcessSection page={page} />

        <Flux connectToStores={{
          posts: (store) => ({
            posts: getFirstImpressionPostSlugs(this.props.page)
              .map(slug => store.getPostBySlug(slug))
          })
        }}>
          <MoreFromBlog />
        </Flux>
      </div>
    );
  }
});

/**
 * Get the slugs of the first impression projects
 * @param {object} homePage - Home page object
 */
function getFirstImpressionProjectSlugs(homePage) {
  let firstImpressionProjects = nestedGet(homePage, 'meta', 'featured_projects');

  if (!firstImpressionProjects) return Immutable.List();

  let slugs = firstImpressionProjects.map(
    project => nestedGet(project, 'featured_project', 'post_name')
  );

  return slugs;
}

/**
 * Get the slugs of the first impression blog posts from the More From Blog
 * @param {object} homePage - Home page object
 */
function getFirstImpressionPostSlugs(homePage) {
  let firstImpressionPosts = nestedGet(homePage, 'meta', 'more_from_blog_posts');

  if (!firstImpressionPosts) return Immutable.List();

  let slugs = firstImpressionPosts.map(
    post => nestedGet(post, 'blog_post', 'post_name')
  );

  return slugs;
}

export default Home;
