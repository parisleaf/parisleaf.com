'use strict';

import React from 'react';
import { State, Navigation } from 'react-router';

import Flux from 'flummox';

import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';

let ProjectHandler = React.createClass({

  mixins: [State, Navigation],

  statics: {
    routerWillRun(state) {
      let AppActions = state.flux.getActions('app');
      let ProjectActions = state.flux.getActions('projects');

      AppActions.setNavTextColor('#fff');
      return ProjectActions.getProjectBySlug(state.params.slug);
    },
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
  },

  getInitialState() {
    let ProjectStore = this.context.flux.getStore('projects');

    return {
      project: ProjectStore.getProjectBySlug(this.getParams().slug),
    };
  },

  componentDidMount() {
    let ProjectStore = this.context.flux.getStore('projects');

    if (!this.state.project) this.replaceWith('home');

    let canonicalPath = this.canonicalPath();

    if (this.getPathname() !== canonicalPath) {
      this.replaceWith(canonicalPath, this.getParams(), this.getQuery());
    }

    ProjectStore.addListener('change', this.projectStoreDidChange);
  },

  canonicalPath() {
    if (!this.state.project) return null;

    return `/work/${this.state.project.get('slug')}`;
  },

  componentWillUnmount() {
    let ProjectStore = this.context.flux.getStore('projects');

    ProjectStore.removeListener('change', this.projectStoreDidChange);
  },

  projectStoreDidChange() {
    let ProjectStore = this.context.flux.getStore('projects');

    this.setState({
      project: ProjectStore.getProjectBySlug(this.getParams().slug),
    });
  },

  render() {
    let { project } = this.state;

    if (!project) return null;

    return (
      <div>
        <ProjectFirstImpression project={project} />
        <ProjectContent project={project} />
      </div>
    );

  },

});


export default ProjectHandler;
