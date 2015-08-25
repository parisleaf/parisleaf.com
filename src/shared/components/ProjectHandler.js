import React, { Component } from 'react/addons';

import { State } from 'react-router';
import Flux from 'flummox/component';

import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';
import Button from './Button';
import AppLink from './AppLink';
import Metadata from './Metadata';
import SiteContainer from './SiteContainer';
import { color } from '../theme';

let ProjectHandler = React.createClass({

  mixins: [State],

  statics: {
    routerWillRun({ state, flux }) {
      let ProjectActions = flux.getActions('projects');

      return Promise.all([
        ProjectActions.getProjectBySlug(state.params.slug),
        ProjectActions.getProjects(),
      ]);
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
        projects: store => {
          const project = store.getProjectBySlug(slug);

          return {
            project,
            nextProject: store.getNextProject(project),
            previousProject: store.getPreviousProject(project)
          }
        }
      }}>
        <SingleProject />
      </Flux>
    );

  },

});

let SingleProject = React.createClass({
  render() {
    let { project, nextProject, previousProject } = this.props;

    if (!project) return <span />;

    return (
      <article>
        <ProjectFirstImpression project={project} />
        <ProjectContent project={project} />
        <NextPreviousProjects next={nextProject} previous={previousProject} />
      </article>
    );
  }
});

class NextPreviousProjects extends Component {
  render() {
    const { next, previous } = this.props;

    return (
      <section className="NextPrevious">
        <SiteContainer>
          <AppLink to="/work" className="NextPrevious--left BorderBlockButton">
            <Header level={3} className="BorderBlockButton-title">See All Work</Header>
            <Metadata>Back to the portfolio</Metadata>
          </AppLink>
          <AppLink to={`/work/${next.get('slug')}`} className="NextPrevious--right BorderBlockButton">
            <Header level={3} className="BorderBlockButton-title">Next Project</Header>
            <Metadata>{next.get('title')}</Metadata>
          </AppLink>
        </SiteContainer>
      </section>
    );
  }
}

export default ProjectHandler;
