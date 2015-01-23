'use strict';

import React from 'react';
import { nestedGet } from '../utils/ImmutableUtils';
import chroma from 'chroma-js';
import { color } from '../theme';
import { getPrimaryColor } from '../utils/ProjectUtils';

let ProjectContainer = React.createClass({

  render() {
    let { project } = this.props;

    if (!project) return null;

    let primaryColor = getPrimaryColor(project);
    let primaryTextColor = chroma(primaryColor).luminance() < 0.5
      ? color('lightGray')
      : color('text');

    return (
      <div>
        <style>{`
          .CopyContainer--primary {
            background-color: ${primaryColor || none};
            color: ${primaryTextColor}
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: project.get('content') }} />
      </div>
    );
  },

});

export default ProjectContainer;
