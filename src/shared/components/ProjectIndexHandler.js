'use strict';

import React from 'react';

import Flux from 'flummox';
let ProjectActions = Flux.getActions('ProjectActions');
let ProjectStore = Flux.getStore('ProjectStore');

import { isCaseStudy } from '../utils/ProjectUtils';
import { rhythm } from '../theme';

let ProjectIndexHandler = React.createClass({

  statics: {
    prepareForRun() {
      return ProjectActions.getProjects();
    },
  },

  getInitialState() {
    return {
      projects: ProjectStore.getProjects(),
    };
  },

  componentDidMount() {
    ProjectStore.addListener('change', this.projectStoreDidChange);
  },

  componentWillUnmount() {
    ProjectStore.removeListener('change', this.projectStoreDidChange);
  },

  projectStoreDidChange() {
    this.setState({
      projects: ProjectStore.getProjects(),
    });
  },

  render() {
    // let projects = this.state.projects
    //   .map(project => <ProjectIndexItem project={project} />)
    //   .toJS();

    let projects = this.packProjects()
      .map(item =>
        <ProjectIndexItem project={item.project} width={item.width} />
      );

    return <div className="ProjectIndex-itemContainer">{projects}</div>;
  },

  /**
   * Use a stupid/naive bin-packing algorithm to sort projects
   * @params {array} [projects] - Defaults to this.state.projects
   * @returns {array} Array of objects, where each object has fields: project,
   * and width. Width is relative.
   */
  packProjects(projects = this.state.projects) {
    let completeRows = new Set();
    let rows = new Set();

    projects.forEach(project => {

      project = {
        project,
        width: this.getProjectRelativeWidth(project),
      };

      if (project.width === 1) {
        completeRows.add(createRow(project));
        return;
      }

      // Check if existing rows have room
      for (let row of rows) {

        // Check if there's room on this row
        if (row.width + project.width <= 1) {
          // Add to row
          row.projects.push(project);
          row.width += project.width;

          if (row.width === 1) {
            // Mark row as completed
            markRowAsComplete(row);
          }

          // Finish
          return;
        }

        // Else keep going
        continue;
      }

      // If no rows have room, create a new one
      rows.add(createRow(project));
    });

    function createRow(project) {
      return {
        projects: [project],
        width: project.width,
      };
    }

    function markRowAsComplete(row) {
      completeRows.add(row);
      rows.delete(row);
    }

    // Join projects as array
    let projectsFromCompleteRows = Array.from(completeRows).reduce((result, row) => {
      return result.concat(row.projects);
    }, []);

    let projectsFromIncompleteRows = Array.from(rows)
      .sort((row1, row2) => row1.width - row2.width)
      .reduce((result, row) => {
        return result.concat(row.projects);
      }, []);

    return projectsFromCompleteRows.concat(projectsFromIncompleteRows);
  },

  /**
   * Get the relative width of a project, where a row is width = 1
   */
  getProjectRelativeWidth(project) {
    let _isCaseStudy = isCaseStudy(project);

    return _isCaseStudy ? 1 : 0.5;
  },

});

let itemStyle = {
  _: {
    background: 'gray',
    backgroundSize: 'cover',
    overflow: 'hidden',
    padding: rhythm(1),
    height: rhythm(8),
  },
};

let ProjectIndexItem = React.createClass({

  render() {
    let { project } = this.props;

    let _style = Object.assign({
      width: `${this.props.width * 100}%`,
    }, itemStyle._);

    if (project.get('featured_image')) {
      let imageUrl = project.get('featured_image').get('source');
      _style.background = `url(${imageUrl})`;
    }

    return (
      <article className="ProjectIndex-itemContainer-item" style={_style}>
        <h4>{project.get('title')}</h4>
      </article>
    );
  },

});

export default ProjectIndexHandler;
