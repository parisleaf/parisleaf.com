'use strict';

import React from 'react';

import ProjectRow from './ProjectRow';
import TitleSection from './TitleSection';
import SiteContainer from './SiteContainer';

import { nestedGet } from '../utils/ImmutableUtils';
import * as ProjectUtils from '../utils/ProjectUtils';

let WorkHandler = React.createClass({

  statics: {
    routerWillRun({ state, flux }) {
      let ProjectActions = flux.getActions('projects');

      return ProjectActions.getProjects();
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

  sortByDate(a, b) {
    let dateA, dateB;
    dateA = new Date(nestedGet(a, 'date_gmt'));
    dateB = new Date(nestedGet(b, 'date_gmt'));
    return dateB.getTime() - dateA.getTime();
  },

  render() {
    let projects = this.state.projects.toArray();

    projects.sort(this.sortByDate);

    let mappedProjects = projects.map( (project) => <ProjectRow key={project.get('ID')} project={project} /> );

    return (
      <div>
        <TitleSection title={["Strategy, Ideas, Execution and Impact.",<br />,"Put To Work."]} />
        <SiteContainer breakAfterLarge padAfterLarge>
          {mappedProjects}
        </SiteContainer>
      </div>
    );
  }

});

export default WorkHandler;
