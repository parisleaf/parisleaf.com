'use strict';

import React from 'react';
import { nestedGet } from '../utils/ImmutableUtils';
import chroma from 'chroma-js';
import { color } from '../theme';

let ProjectContainer = React.createClass({

  render() {
    let { project } = this.props;

    if (!project) return null;

    let primaryColor = nestedGet(project, 'meta', 'primary_color') || color('darkGray');
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
