'use strict';

import React from 'react';
import Flux from 'flummox/component';
import Helmet from 'react-helmet';

import ProjectRow from './ProjectRow';
import TitleSection from './TitleSection';
import SiteContainer from './SiteContainer';

import * as ProjectUtils from '../utils/ProjectUtils';
import { nestedGet } from '../utils/ImmutableUtils';

let WorkHandler = React.createClass({

  statics: {
    routerWillRun({ state, flux }) {
      const ProjectActions = flux.getActions('projects');
      const PageActions = flux.getActions('pages');

      return Promise.all([
        ProjectActions.getProjects(),
        PageActions.getPageBySlug('work'),
      ]);
    },
  },

  getInitialState() {
    let ProjectStore = this.context.flux.getStore('projects');

    return {
      projects: ProjectStore.getProjects(),
    };
  },

  contextTypes: {
    flux: React.PropTypes.any.isRequired,
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
      projects: ProjectStore.getProjects(),
    });
  },

  render() {
    let projects = this.state.projects.toArray();

    let mappedProjects = projects.map( (project) => <ProjectRow key={project.get('ID')} project={project} /> );

    return (
      <div>
        <Flux connectToStores={{
          pages: store => ({
            page: store.getPageBySlug('work')
          })
        }}>
          <WorkHead />
        </Flux>
        <TitleSection title={["Strategy, Ideas, Execution and Impact.",<br />,"Put To Work."]} />
        <SiteContainer breakAfterLarge padAfterLarge>
          {mappedProjects}
        </SiteContainer>
      </div>
    );
  }
});

const WorkHead = React.createClass({
  render() {
    const { page } = this.props;

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <Helmet
        title={titleTag}
        meta={[
          {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
          {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
          {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
          {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
          {"property": "og:title", "content": titleTag},
          {"property": "og:type", "content": "article"},
          {"property": "og:url", "content": "https://parisleaf.com/work"},
          {"property": "article:author", "content": ""},
          {"property": "article:published_time", "content": ""},
          {"property": "article:modified_time", "content": ""},
        ]}
        link={[
          {"rel": "canonical", "href": "https://parisleaf.com/work"},
        ]} />
    );
  }
});

export default WorkHandler;
