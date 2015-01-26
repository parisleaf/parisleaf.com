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
        await ProjectActions.getProjectBySlug(getFirstImpressionProjectSlug(homePage));
      }
    },
  },

  getInitialState() {
    return {
      page: PageStore.getPageBySlug('home'),
      firstImpressionProject: this.getFirstImpressionProject(),
    };
  },

  getFirstImpressionProject() {
    let homePage = PageStore.getPageBySlug('home');
    let firstImpressionProject;

    if (homePage) {
      // Fetch first-impression project
      return ProjectStore.getProjectBySlug(getFirstImpressionProjectSlug(homePage));
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
      firstImpressionProject: this.getFirstImpressionProject(),
    });
  },

  projectStoreDidChange() {
    this.setState({
      firstImpressionProject: this.getFirstImpressionProject(),
    })
  },

  render() {
    return (
      <div>
        <HomeFirstImpression
          page={this.state.page}
          project={this.state.firstImpressionProject}
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

export default Home;
