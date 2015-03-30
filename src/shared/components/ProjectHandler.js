import React from 'react/addons';

import { State } from 'react-router';
import Flux from 'flummox/component';

import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';

let ProjectHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun({ state, flux }) {
      let ProjectActions = flux.getActions('projects');

      return ProjectActions.getProjectBySlug(state.params.slug);
    },

    routerDidRun({ state, flux }) {
      const NavActions = flux.getActions('nav');
      NavActions.setColor({ text: '#fff', background: 'rgba(0,0,0,0)' });
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
