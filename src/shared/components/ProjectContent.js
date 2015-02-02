'use strict';

import React from 'react';
import HTMLContentArea from './HTMLContentArea';
import { getPrimaryColor } from '../utils/ProjectUtils';

let ProjectContainer = React.createClass({

  render() {
    let { project } = this.props;

    if (!project) return null;

    let primaryColor = getPrimaryColor(project);

    return (
      <div>
        <HTMLContentArea
          primaryColor={primaryColor}
          html={project.get('content')}
        />
      </div>
    );
  },

});

export default ProjectContainer;
