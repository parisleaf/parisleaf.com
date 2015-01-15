'use strict';

import React from 'react';
import Immutable from 'immutable';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex, navBarRhythmHeight } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');

const logoAspectRatio = 769.9 / 200;

let style = {
  wrapper: {
    height: rhythm(navBarRhythmHeight),
  },

  AppNav: {
    height: rhythm(navBarRhythmHeight),
    lineHeight: rhythm(navBarRhythmHeight),
    top: 0,
    width: '100%',
    zIndex: zIndex('AppNav'),
    padding: `0 ${rhythm(1)}`,
  },

  logoIcon: {
    height: rhythm(navBarRhythmHeight * 0.5),
    width: rhythm(navBarRhythmHeight * 0.5 * logoAspectRatio), // Use aspect ratio
    transition: 'fill ease-in-out 200ms',
    fill: color('yellow'),
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight * 0.5),
    height: rhythm(navBarRhythmHeight * 0.5),
    fill: color('yellow'),
  },
};

let AppNav = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      drawerVisibility: this.props.open ? 1 : 0,
    };
  },

  getDefaultProps() {
    return {
      open: false,
      primaryMenu: Immutable.Map(),
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
    this.tweenState('drawerVisibility', {
      endValue: this.props.open ? 1 : 0,
      duration: 200,
    });

    // Disable scrolling on body when nav is open
    document.body.style.overflow = this.props.open ? 'hidden' : '';
  },

  onToggleClick(event) {
    event.preventDefault();

    if (this.props.open) {
      AppActions.closeNav();
    } else {
      AppActions.openNav();
    }
  },

  render() {
    let drawerVisibility = this.getTweeningValue('drawerVisibility');

    let _style = Object.assign({
      position: this.props.open ? 'fixed' : 'absolute',
    }, style.AppNav);

    let logoIconStyle = Object.assign({
      fill: this.props.open ? color('lightGray') : style.logoIcon.fill,
    }, style.logoIcon);

    return (
      <div onClick={this.onClick} style={style.wrapper}>
        <nav className="AppNav" style={_style}>
          <div className="AppNav-bar">
            <div className="AppNav-bar-logo">
              <Button component={Link} onClick={AppActions.closeNav} to="/">
                <SvgIcon name="logo" style={logoIconStyle} />
              </Button>
            </div>
            <div className="AppNav-bar-content">
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick}>
                <SvgIcon name="menu" style={style.toggleIcon} />
              </Button>
            </div>
          </div>
        </nav>
        <AppNavDrawer visibility={drawerVisibility} />
      </div>
    );
  }

});

let drawerStyle = {
  drawer: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: zIndex('AppNav', -1),
    paddingTop: rhythm(navBarRhythmHeight),
    top: 0,
    left: 0,
    backgroundColor: color('gray'),
  },

  container: {
    position: 'absolute',
    top: rhythm(navBarRhythmHeight),
    left: 0, bottom: 0, right: 0,
    overflow: 'auto',
  },
}

let AppNavDrawer = React.createClass({

  getDefaultProps() {
    return {
      visibility: 0,
    };
  },

  render() {
    let visibility = this.props.visibility;

    let _style = Object.assign({
      transform: `translateX(${100 - (visibility * 100)}%)`,
      display: visibility === 0 ? 'none' : 'block',
    }, drawerStyle.drawer);

    _style.WebkitTransform = _style.transform;
    _style.msTransform = _style.transform;

    return (
      <div style={_style}>
        <div style={drawerStyle.container}>
          Menu content
        </div>
      </div>
    );
  }

});

export default AppNav;
