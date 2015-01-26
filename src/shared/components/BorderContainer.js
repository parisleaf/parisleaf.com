'use strict';

import React from 'react';
import SuitCSS from 'react-suitcss';

let BorderContainer = React.createClass({

  render() {

    let { style, borderColor } = this.props;

    if (borderColor) {
      style = Object.assign({
        borderColor,
      }, style);
    }

    return (
      <SuitCSS
        {...this.props}
        style={style}
        componentName="BorderContainer"
        element="div"
        modifiers={[
          'noHang'
        ]}
      />
    );
  }

});

export default BorderContainer;
