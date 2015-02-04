'use strict';

import React from 'react';
import MediaMixin from 'react-media-mixin';

import PortfolioItem from './PortfolioItem';

import { isCaseStudy } from '../utils/ProjectUtils';
import { rhythm } from '../theme';

let style = {
  _: {
    position: 'relative',
  },
};

let PortfolioHandler = React.createClass({

  mixins: [MediaMixin],

  statics: {
    routerWillRun(state) {
      let ProjectActions = state.flux.getActions('projects');

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

  render() {
    let projectHeight = this.getProjectRhythmHeight();

    let { projects, totalRows } = this.packProjects();

    projects = projects
      .map(item =>
        <PortfolioItem
          project={item.project}
          width={item.width}
          height={projectHeight}
          x={item.x}
          y={item.y}
          key={item.project.get('ID')}
        />
      );

    let _style = Object.assign({
      height: rhythm(projectHeight * totalRows),
    }, style._);

    return (
      <div className="ProjectIndex-itemContainer" style={style._}>
        {projects}
      </div>
    );
  },

  /**
   * Use a stupid/naive bin-packing algorithm to sort projects
   * @params {array} [projects] - Defaults to this.state.projects
   * @returns {object} Object describing result, with fields totalHeight and
   *   projects. projects is an array of objects, where each object has fields:
   *   project, width, x, and y.
   */
  packProjects(projects = this.state.projects) {
    let completeRows = new Set();
    let rows = new Set();

    projects.forEach(project => {

      project = {
        project,
        width: this.getProjectRelativeWidth(project),
      };

      // If project width is 1, create row, add project, and mark as complete,
      // then return
      if (project.width === 1) {
        addProjectToRow(project, createRow());
        return;
      }

      // Check if existing rows have room
      for (let row of rows) {

        // Check if there's room on this row
        if (row.width + project.width <= 1) {
          addProjectToRow(project, row);

          // Finish
          return;
        }

        // Else keep going
        continue;
      }

      // If no rows have room, create a new one
      addProjectToRow(project, createRow());
    });

    function createRow() {
      let row = {
        projects: [],
        width: 0,
      };

      rows.add(row);

      return row;
    }

    function addProjectToRow(project, row) {
      project.x = row.width;
      row.width += project.width;
      row.projects.push(project);

      if (row.width === 1) {
        // Mark row as completed
        completeRows.add(row);
        rows.delete(row);
      }
    }


    completeRows = Array.from(completeRows)
      // Now that there are no more projects to pack, mark leftover rows
      // as complete
      .concat(Array.from(rows).sort((row1, row2) => row1.width - row2.width))

    let completeProjects = completeRows// Reduce to array of projects
      .reduce((result, row, y) => {
        row.projects.forEach(project => project.y = y);
        result = result.concat(row.projects);
        return result;
      }, []);

    return {
      projects: completeProjects,
      totalRows: completeRows.length,
    };
  },

  /**
   * Get the relative width of a project, where a row is width = 1
   */
  getProjectRelativeWidth(project) {
    let _isCaseStudy = isCaseStudy(project);

    if (this.state.media.l) {
      return _isCaseStudy ? 0.5 : 0.25;
    } else if (this.state.media.s) {
      return _isCaseStudy ? 1 : 0.5;
    } else {
      return 1;
    }
  },

  /**
   * Get rhythm height of a project. Same for all projects, depends on
   * window size.
   */
  getProjectRhythmHeight() {
    return 10;
  }

});

export default PortfolioHandler;
