'use strict';

import React from 'react';
import tweenState from 'react-tween-state';
import AppNavSidebar from './AppNavSidebar';
import AppNavContent from './AppNavContent';

import { color, rhythm, zIndex, navBarRhythmHeight } from '../theme';

const transitionDuration = 250;

let style = {
  _: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: zIndex('AppNav', -1),
    paddingTop: rhythm(navBarRhythmHeight),
    top: 0,
    left: 0,
  },

  container: {
    position: 'absolute',
    top: rhythm(navBarRhythmHeight),
    left: 0, bottom: 0, right: 0,
  },

  content: {
    backgroundColor: color('gray'),
    overflow: 'auto',
  },
};

let AppNavDrawer = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      visibility: this.props.open ? 1 : 0,
    };
  },

  getDefaultProps() {
    return {
      visibility: 0,
    };
  },

  componentDidMount() {
    this.updateVisibility();
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevProps.open) {
      this.updateVisibility();
    }
  },

  drawerShouldBeVisible(props = this.props) {
    return props.open;
  },

  updateVisibility() {
    this.tweenState('visibility', {
      endValue: this.props.open ? 1 : 0,
      duration: transitionDuration,
    });

    // Disable scrolling on body when nav is open
    document.body.style.overflow = this.props.open ? 'hidden' : '';
  },

  render() {
    let visibility = this.getTweeningValue('visibility');

    let _style = Object.assign({
      opacity: visibility,
      display: visibility === 0 ? 'none' : 'block',
    }, style._);

    _style.WebkitTransform = _style.transform;
    _style.msTransform = _style.transform;


    return (
      <div style={_style}>
        <div style={style.container} className="AppNavDrawer">
          <AppNavSidebar
            primaryMenu={this.props.primaryMenu}
            secondaryMenu={this.props.secondaryMenu}
          />
          <AppNavContent
            tweets={this.props.tweets}
          />
        </div>
      </div>
    );
  }

});

export default AppNavDrawer;
