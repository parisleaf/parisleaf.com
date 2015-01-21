'use strict';

import React from 'react';
import tweenState from 'react-tween-state';
import { zIndex } from '../theme';

let style = {
  _: {
    backgroundColor: '#fff',
    position: 'fixed',
    height: '100%', width: '100%',
    zIndex: zIndex('AppOverlay'),
  },
};

let AppOverlay = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      visibility: this.props.active ? 1 : 0,
    };
  },

  getDefaultProps() {
    return {
      active: false,
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.active !== prevProps.active) {
      this.updateVisibility();
    }
  },

  updateVisibility() {
    this.tweenState('visibility', {
      endValue: this.props.active ? 1 : 0,
      duration: 200,
    });
  },

  render() {
    let visibility = this.getTweeningValue('visibility');

    let _style = Object.assign({
      opacity: visibility,
      display: visibility > 0 ? 'block' : 'none',
    }, style._);

    return <div style={_style} />;
  },

});

export default AppOverlay;
