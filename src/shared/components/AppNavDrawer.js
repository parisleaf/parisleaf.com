'use strict';

import React from 'react';
import tweenState from 'react-tween-state';
import AppNavSidebar from './AppNavSidebar';
import AppNavContent from './AppNavContent';

import { color, rhythm, zIndex, navBarRhythmHeight } from '../theme';

const transition = {
  duration: 250,
};

const sidebarTransition = {
  duration: 150,
  delay: 200,
};

const contentTransition = {
  duration: 600,
  delay: 0,
};

let style = {
  _: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: zIndex('AppNav', -1),
    paddingTop: rhythm(navBarRhythmHeight),
    backgroundColor: color('lightGray'),
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
      sidebarVisibility: this.props.open ? 1 : 0,
      contentVisibility: this.props.open ? 1 : 0,
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

  async updateVisibility() {

    // Disable scrolling on body when nav is open
    document.body.style.overflow = this.props.open ? 'hidden' : '';

    let steps = [
      this.tweenStateImmediate.bind(this, 'visibility', {
        endValue: this.props.open ? 1 : 0,
        duration: transition.duration,
      }),

      wait.bind(this, sidebarTransition.delay),

      this.tweenStateImmediate.bind(this, 'sidebarVisibility', {
        endValue: this.props.open ? 1 : 0,
        duration: sidebarTransition.duration,
      }),

      wait.bind(this, contentTransition.delay),

      this.tweenStateImmediate.bind(this, 'contentVisibility', {
        endValue: this.props.open ? 1 : 0,
        duration: contentTransition.duration,
      }),
    ];

    if (!this.props.open) steps.reverse();

    for (let step of steps) {
      await step();
    }
  },

  tweenStateAsync(stateNameString, config = {}) {
    return new Promise((resolve, reject) => {
      let _config = Object.assign({
        onEnd: resolve,
      }, config);

      this.tweenState(stateNameString, _config);
    });
  },

  tweenStateImmediate(stateNameString, config = {}) {
    return new Promise((resolve, reject) => {
      resolve();
      this.tweenState(stateNameString, config);
    });
  },

  render() {
    let visibility = this.getTweeningValue('visibility');
    let sidebarVisibility = this.getTweeningValue('sidebarVisibility');
    let contentVisibility = this.getTweeningValue('contentVisibility');

    let _style = Object.assign({
      opacity: visibility,
      display: visibility === 0 ? 'none' : 'block',
    }, style._);

    _style.WebkitTransform = _style.transform;
    _style.msTransform = _style.transform;

    return (
      <div style={_style}>
        <div style={style.container} className="AppNavDrawer">
          <AppNavContent
            tweets={this.props.tweets}
            visibility={contentVisibility}
            options={this.props.options}
          />
          <AppNavSidebar
            primaryMenu={this.props.primaryMenu}
            secondaryMenu={this.props.secondaryMenu}
            visibility={sidebarVisibility}
          />
        </div>
      </div>
    );
  }

});

function wait(duration) {
  return new Promise((resolve, reject) => setTimeout(resolve, duration));
}

export default AppNavDrawer;
