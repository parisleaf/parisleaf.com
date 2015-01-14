'use strict';

import React from 'react';

let SiteContainer = React.createClass({

  render() {
    let className = [ 'SiteContainer' ];

    if (this.props.className) className.push(this.props.className);
    
    return <div {...this.props} className={className.join(' ')}/>;
  }

});

export default SiteContainer;
