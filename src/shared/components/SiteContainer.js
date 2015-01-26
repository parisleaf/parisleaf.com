'use strict';

import React from 'react';
import SuitCSS from 'react-suitcss';

let BorderContainer = React.createClass({

  render() {
    return (
      <SuitCSS
        {...this.props}
        componentName="SiteContainer"
        element="div"
        modifiers={[
          'hang'
        ]}
      />
    );
  }

});

export default BorderContainer;
