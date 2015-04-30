'use strict';

import React from 'react';
import MediaMixin from 'react-media-mixin';

import PortfolioItem from './PortfolioItem';

import * as ProjectUtils from '../utils/ProjectUtils';

let style = {
  _: {
    position: 'relative',
  },
};

let PortfolioHandler = React.createClass({

  mixins: [MediaMixin],

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

  render() {

    let itemsPerRow = this.itemsPerRow();
    let itemsPerCaseStudyRow = this.itemsPerCaseStudyRow();

    let items = this.rows()
      .reduce((result, row) => {
        let items = row.map(project => {
          let _itemsPerRow = ProjectUtils.isCaseStudy(project)
            ? itemsPerCaseStudyRow
            : itemsPerRow;

          return (
            <PortfolioItem
              project={project}
              width={`${100 / _itemsPerRow}%`}
              key={project.get('ID')}
            />
          );
        });

        return result.concat(items);
      }, []);

    return (
      <div className="Portfolio-itemContainer" style={style._}>
        {items}
      </div>
    );
  },

  /**
   * Organize projects into rows
   */
  rows() {
    let projects = this.state.projects.toArray();
    let itemsPerRow = this.itemsPerRow();
    let itemsPerCaseStudyRow = this.itemsPerCaseStudyRow();

    let caseStudyRows = [];
    let normalRows = [];

    let caseStudyRow = [];
    let normalRow = [];

    for (let project of projects) {
      let isCaseStudy = ProjectUtils.isCaseStudy(project);
      let maxLength = isCaseStudy ? itemsPerCaseStudyRow : itemsPerRow;
      let row = isCaseStudy ? caseStudyRow : normalRow;

      row.push(project);

      if (row.length === maxLength) {
        if (isCaseStudy) {
          caseStudyRows.push(caseStudyRow);
          caseStudyRow = [];
        } else {
          normalRows.push(normalRow);
          normalRow = [];
        }
      }
    }

    if (caseStudyRow.length) caseStudyRows.push(caseStudyRow);
    if (normalRow.length) normalRows.push(normalRow);

    return interleave(caseStudyRows, normalRows);
  },

  itemsPerRow() {
    if (this.state.media.xxl) {
      return 4;
    } else if (this.state.media.l) {
      return 2;
    } else {
      return 1;
    }
  },

  itemsPerCaseStudyRow() {
    if (this.state.media.xxl) {
      return 2;
    } else if (this.state.media.l) {
      return 1;
    } else {
      return 1;
    }
  },

});

function interleave(arr1, arr2) {
  let result = [];
  let maxLength = arr1.length > arr2.length ? arr1.length : arr2.length;

  for (let i = 0; i < maxLength; i++) {
    let n = i + 1;
    if (n <= arr1.length) result.push(arr1[i]);
    if (n <= arr2.length) result.push(arr2[i]);
  }

  return result;
}

export default PortfolioHandler;
