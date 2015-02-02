'use strict';

import React from 'react';
import chroma from 'chroma-js';
import { color } from '../theme';

let HTMLContentArea = React.createClass({

  render() {
    let { html, primaryColor } = this.props;

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
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

});

export default HTMLContentArea;
