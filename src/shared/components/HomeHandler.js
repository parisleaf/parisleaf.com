'use strict';

import React from 'react';
import HomeFirstImpression from './HomeFirstImpression';
import HomeProcessSection from './HomeProcessSection';

import Flux from 'flummox';

let AppActions = Flux.getActions('AppActions');

let PageStore = Flux.getStore('PageStore');
let PageActions = Flux.getActions('PageActions');

let ProjectStore = Flux.getStore('ProjectStore');
let ProjectActions = Flux.getActions('ProjectActions');

import { color } from '../theme';

let Home = React.createClass({

  statics: {
    routerWillRun: async function routerWillRun() {
      AppActions.setNavTextColor(color('yellow'));

      await PageActions.getPageBySlug('home');
      let homePage = PageStore.getPageBySlug('home');

      if (homePage) {
        // Fetch first-impression project
        await Promise.all(getFirstImpressionProjectSlugs(homePage).map(function(slug) {
          ProjectActions.getProjectBySlug(slug);
        }));
      }
    },
  },

  getInitialState() {
    return {
      page: PageStore.getPageBySlug('home'),
      firstImpressionProjects: this.getFirstImpressionProjects()
    };
  },

  getFirstImpressionProjects() {
    let homePage = PageStore.getPageBySlug('home');
    
    if(homePage) {
      return getFirstImpressionProjectSlugs(homePage).map(function(slug) {
        return ProjectStore.getProjectBySlug(slug);
      });
    }
  },

  componentDidMount() {
    PageStore.addListener('change', this.pageStoreDidChange);
    ProjectStore.addListener('change', this.projectStoreDidChange);
  },

  componentWillUnmount() {
    PageStore.removeListener('change', this.pageStoreDidChange);
    ProjectStore.removeListener('change', this.projectStoreDidChange);
  },

  pageStoreDidChange() {
    this.setState({
      page: PageStore.getPageBySlug('home'),
      firstImpressionProjects: this.getFirstImpressionProjects()
    });
  },

  projectStoreDidChange() {
    this.setState({
      firstImpressionProjects: this.getFirstImpressionProjects()
    })
  },

  render() {
    return (
      <div>
        <HomeFirstImpression
          page={this.state.page}
          project={this.state.firstImpressionProject}
          projects={this.state.firstImpressionProjects}
        />
        <HomeProcessSection
          page={this.state.page}
        />
      </div>
    );
  }

});

/**
 * Get the slug of the first impression project
 * @param {object} homePage - Home page object
 */
function getFirstImpressionProjectSlug(homePage) {
  if (homePage.get('meta') && homePage.get('meta').get('first_impression_project')) {
    let firstImpressionProject = homePage.get('meta').get('first_impression_project');

    if (firstImpressionProject.get('post_name')) {
      return firstImpressionProject.get('post_name');
    }
  }
}

/**
 * Get the slugs of the first impression projects
 * @param {object} homePage - Home page object
 */
function getFirstImpressionProjectSlugs(homePage) {
  if(homePage.get('meta') && homePage.get('meta').get('featured_projects')) { 
    let firstImpressionProjects = homePage.get('meta').get('featured_projects');

    let slugs = [];

    firstImpressionProjects.map(function(project) {
      slugs.push(project.get('featured_project').get('post_name'));
    });

    //console.log(slugs);
    return slugs;
  }
}

export default Home;
