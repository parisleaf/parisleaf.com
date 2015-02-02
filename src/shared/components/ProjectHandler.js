'use strict';

import React from 'react/addons';

import { State } from 'react-router';
import Flux from 'flummox';

let { PureRenderMixin } = React.addons;

import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';

let ProjectHandler = React.createClass({

  mixins: [State, PureRenderMixin],

  statics: {
    routerWillRun(state) {
      let ProjectActions = state.flux.getActions('projects');

      return ProjectActions.getProjectBySlug(state.params.slug);
    },

    routerDidRun(state) {
      let AppActions = state.flux.getActions('app');

      AppActions.setNavTextColor('#fff');
    }
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

    ProjectStore.addListener('change', this.projectStoreDidChange);
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
