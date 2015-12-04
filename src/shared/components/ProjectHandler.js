import React, { Component } from 'react/addons';

import { State } from 'react-router';
import Flux from 'flummox/component';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';
import Metadata from './Metadata';
import NotFoundHandler from './NotFoundHandler';
import ProjectFirstImpression from './ProjectFirstImpression';
import ProjectContent from './ProjectContent';
import SiteContainer from './SiteContainer';
import SvgIcon from './SvgIcon';

import { getFeaturedImage } from '../utils/ProjectUtils';
import { nestedGet } from '../utils/ImmutableUtils';
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

    // TODO: better not-found message
    if (!project) {
      return (
        <NotFoundHandler navColor={color('text')} />
      );
    }

    return (
      <article>
        <ProjectFirstImpression project={project} />
        <ProjectContent project={project} />
        <NextPreviousProjects next={nextProject} prev={previousProject} />
      </article>
    );
  }
});

class NextPreviousProjects extends Component {
  render() {
    const { next, prev } = this.props;

    return (
      <section className="NextPrev Section">
        <SiteContainer breakAll padAll>
          <div className="NextPrev-logoContainer">
            <SvgIcon name="logo_compact" className="NextPrev-logo" />
          </div>
          <div className="NextPrev-inner">
            <div className="NextPrev-next">
              <Header level={3} className="NextPrev-cardTitle">Next project:</Header>
              <Button component={AppLink} to={`/work/${next.get('slug')}`} className="NextPrev-card" style={{backgroundImage: `url(${getFeaturedImage(next)})`}}>
                <Header level={3} className="NextPrev-projectTitle" vollkorn dangerouslySetInnerHTML={{ __html: next.get('title') }} />
                <div className="NextPrev-overlay" />
              </Button>
            </div>
            <div className="NextPrev-prev">
              <Header level={3} className="NextPrev-cardTitle">Previous project:</Header>
              <Button component={AppLink}  to={`/work/${prev.get('slug')}`} className="NextPrev-card" style={{backgroundImage: `url(${getFeaturedImage(prev)})`}}>
                <Header level={3} className="NextPrev-projectTitle" vollkorn dangerouslySetInnerHTML={{ __html: prev.get('title') }} />
                <div className="NextPrev-overlay" />
              </Button>
            </div>
          </div>
        </SiteContainer>
      </section>
    );
  }
}

export default ProjectHandler;
