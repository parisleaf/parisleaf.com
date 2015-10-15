'use strict';

import React from 'react';
import Flux from 'flummox/component';
import DocumentTitle from 'react-document-title';
import Immutable from 'immutable';

import ContactSection from './ContactSection';
import HomeSwiper from './HomeSwiper';
import HomeServices from './HomeServices';
import MoreFromBlog from './MoreFromBlog';
import TitleSection from './TitleSection';

import { color } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let Home = React.createClass({

  statics: {
    async routerWillRun({ state, flux }) {
      let PageActions = flux.getActions('pages');
      let ProjectActions = flux.getActions('projects');
      let PostActions = flux.getActions('posts');
      let PageStore = flux.getStore('pages');

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
    const pageTitle = ( nestedGet(page, 'meta', 'yoast_wpseo_title') ) ? nestedGet(page, 'meta', 'yoast_wpseo_title') : nestedGet(page, 'title');

    return (
      <div>
        <DocumentTitle title={pageTitle} />
        <Flux connectToStores={{
          projects: (store) => ({
            projects: getFirstImpressionProjectSlugs(this.props.page)
              .map(slug => store.getProjectBySlug(slug))
              .toArray()
          })
        }}>
          <TitleSection title={nestedGet(page, 'meta', 'first_impression_title')} />
          <HomeSwiper />
        </Flux>
        <TitleSection title="Parisleaf is a branding and digital agency. Being creative is who we are, but helping our clients succeed is what we live for." />
        <HomeServices />
        <ContactSection />
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
