'use strict';

import React from 'react';
import SuitCSS from 'react-suitcss';

let Button = React.createClass({

  getDefaultProps() {
    return {
      component: 'button',
    };
  },

  render() {
    let {component, ...props} = this.props;

    return (
      <SuitCSS
        {...props}
        componentName="Button"
        element={component}
        modifiers={['block', 'callToAction', 'callToAction', 'primaryLight', 'primaryDark', 'secondaryLight', 'secondaryDark', 'primaryMenuLink', 'secondaryMenuLink']}
      />
    );
  }

});

export default Button;
