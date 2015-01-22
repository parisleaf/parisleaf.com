'use strict';

import React from 'react';
import { State, Navigation } from 'react-router';

import Flux from 'flummox';

let ProjectActions = Flux.getActions('ProjectActions');
let ProjectStore = Flux.getStore('ProjectStore');

let AppActions = Flux.getActions('AppActions');

import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';

let ProjectHandler = React.createClass({

  mixins: [State, Navigation],

  statics: {
    prepareForRun(state) {
      AppActions.setNavTextColor('#fff');

      return ProjectActions.getProjectBySlug(state.params.slug);
    },
  },

  getInitialState() {
    return {
      project: ProjectStore.getProjectBySlug(this.getParams().slug),
    };
  },

  componentDidMount() {
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
    ProjectStore.removeListener('change', this.projectStoreDidChange);
  },

  projectStoreDidChange() {
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
