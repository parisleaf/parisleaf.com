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
    // Create immutable object of objects from array of objects
    newProjects = Immutable.fromJS(newProjects.reduce((result, project) => {
      if (!project) return;
      result[project.slug] = project;
      return result;
    }, {}));

    // Set state
    this.setState({
      projects: this.state.projects.merge(newProjects),
    });
  }

  getProjectBySlug(slug) {
    return this.state.projects.get(slug);
  }

  sortByDate(a, b) {
    let dateA, dateB;
    dateA = new Date(a.get('date_gmt'));
    dateB = new Date(b.get('date_gmt'));

    if ( dateA > dateB ) {
      return -1;
    } else if ( dateA < dateB ) {
      return 1;
    }

    return 0;
  }

  getProjects() {
    let projects = this.state.projects.toList();
    projects = projects.sort(this.sortByDate);

    return projects;
  }

  getNextProject(project) {
    let projects = this.state.projects.toList();
    projects = projects.sort(this.sortByDate);

    const i = projects.indexOf(project);
    const next = i === projects.size - 1 ? 0 : i + 1;

    return projects.get(next);
  }

  getPreviousProject(project) {
    let projects = this.state.projects.toList();
    projects = projects.sort(this.sortByDate);

    const i = projects.indexOf(project);
    const previous = i === 0 ? projects.size - 1 : i - 1;

    return projects.get(previous);
  }
}
