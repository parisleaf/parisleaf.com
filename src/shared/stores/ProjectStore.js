'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

export default class ProjectStore extends ImmutableStore {

  constructor(flux) {
    super();

    this.state = {
      projects: Immutable.Map(),
    };

    let projectActionIds = flux.getActionIds('projects');

    this.register(projectActionIds.getProjectBySlug, this.handleGetSingleProject);
    this.register(projectActionIds.getProjects, this.handleGetProjects);
  }

  handleGetSingleProject(newProject) {
    if (!newProject) return;

    newProject = Immutable.fromJS(newProject);

    this.setState({
      projects: this.state.projects.set(newProject.get('slug'), newProject),
    });
  }

  handleGetProjects(newProjects) {
    newProjects = Immutable.fromJS(newProjects.reduce((result, project) => {
      if (!project) return;

      result[project.slug] = project;

      return result;
    }, {}));

    this.setState({
      projects: this.state.projects.merge(newProjects),
    });
  }

  getProjectBySlug(slug) {
    return this.state.projects.get(slug);
  }

  getProjects() {
    return this.state.projects.toList();
  }
}
