'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';
import { getPrimaryColor } from '../utils/ProjectUtils';
import { rhythm } from '../theme';

let ProjectContainer = React.createClass({

  render() {
    let { project } = this.props;

    if (!project) return <span />;

    let primaryColor = getPrimaryColor(project);

    return (
      <HTMLContentArea
        primaryColor={primaryColor}
        html={project.get('content')}
        style={{
          padding: `${rhythm(2)} 0`
        }}
      />
    );
  },

});

export default ProjectContainer;
