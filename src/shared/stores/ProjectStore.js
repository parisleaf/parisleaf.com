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

  getNextProject(project) {
    const { projects } = this.state;
    const i = projects.indexOf(project);
    const next = i === projects.size() ? 0 : i + 1;

    return projects.get(next);
  }

  getPreviousProject(project) {
    const { projects } = this.state;
    const i = projects.indexOf(project);
    const previous = i === 0 ? projects.size() : i - 1;

    return projects.get(previous);
  }
}
