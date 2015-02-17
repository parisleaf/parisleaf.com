'use strict';

import React from 'react/addons';

import { State } from 'react-router';
import Flux from 'flummox/component';

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

  render() {
    let { slug } = this.getParams();

    return (
      <Flux key={slug} connectToStores={{
        projects: store => ({
          project: store.getProjectBySlug(slug)
        })
      }}>
        <SingleProject />
      </Flux>
    );

  },

});

let SingleProject = React.createClass({
  render() {
    let { project } = this.props;

    if (!project) return null;

    return (
      <article>
        <ProjectFirstImpression project={project} />
        <ProjectContent project={project} />
      </article>
    );
  }
});


export default ProjectHandler;
