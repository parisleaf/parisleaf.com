'use strict';

import React from 'react';

import SvgIcon from './SvgIcon';

let Preloader = React.createClass({

  componentDidMount() {
    require('velocity-animate');

    if (this.props.showPreloader) {
      Velocity(document.getElementsByClassName("Preloader"), { opacity: 0 }, { display: "none" }, { duration: 250});
    }
  },

  render() {

    return (
      <div className="Preloader">
        <SvgIcon name="logo_compact" className="Preloader-logo" />
        <div className="Preloader-bg" />
      </div>
    );
  }

});

export default Preloader;
