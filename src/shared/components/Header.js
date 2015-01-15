'use strict';

import React from 'react';
import SuitCSS from 'react-suitcss';

let Header = React.createClass({

  getDefaultProps() {
    return {
      level: 1,
      component: false,
    };
  },

  render() {
    var {component, level, ...props} = this.props;

    component = component || `h${level}`;

    props[`${level}`] = true;

    return (
      <SuitCSS
        {...props}
        componentName="Header"
        element={component}
        modifiers={[
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
        ]}
      />
    );
  }
});

module.exports = Header;
