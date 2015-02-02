'use strict';

import React from 'react';
import Waypoint from 'react-waypoint';

let style = {

  _: {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: '250ms ease-out',
    transitionProperty: 'transform -webkit-transform ms-transform opacity',
    display: 'block',
  },

  isVisible: {
    transform: 'translateY(0)',
    opacity: 1,
  },

};

let RevealOnScroll = React.createClass({

  getInitialState() {
    return {
      isVisible: false,
    };
  },

  onEnter() {
    this.setState({ isVisible: true });
  },

  render() {

    let styles = [
      style._,
      this.state.isVisible ? style.isVisible : {},
    ]

    let _style = Object.assign({}, ...styles);

    _style.webkitTransform = _style.transform;
    _style.MsTransform = _style.transform;

    let threshold = -0.2;

    return (
      <span style={_style}>
        <Waypoint onEnter={this.onEnter} threshold={threshold} />
        {this.props.children}
        <Waypoint onEnter={this.onEnter} threshold={threshold} />
      </span>
    );
  }

});

export default RevealOnScroll;
