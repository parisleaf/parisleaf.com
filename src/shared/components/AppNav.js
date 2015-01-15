'use strict';

import React from 'react';
import Immutable from 'immutable';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');

const navBarRhythmHeight = 3;
const logoAspectRatio = 769.9 / 200;

let style = {
  AppNav: {
    height: rhythm(navBarRhythmHeight),
    lineHeight: rhythm(navBarRhythmHeight),
    position: 'relative',
    zIndex: zIndex('AppNav'),
    padding: `0 ${rhythm(1)}`,
  },

  logoIcon: {
    height: rhythm(navBarRhythmHeight * 0.5),
    width: rhythm(navBarRhythmHeight * 0.5 * logoAspectRatio), // Use aspect ratio
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight * 0.5),
    height: rhythm(navBarRhythmHeight * 0.5),
    fill: color('text'),
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

  componentDidUpdate(prevProps, prevState) {
    if (this.shouldBeVisible() !== this.shouldBeVisible(prevProps)) {
      this.updateVisibility();
    }
  },

  shouldBeVisible(props = this.props) {
    return props.open;
  },

  updateVisibility() {
    this.tweenState('drawerVisibility', {
      endValue: this.shouldBeVisible() ? 1 : 0,
      duration: 200,
    });
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

    let primaryMenuItems = this.props.primaryMenu.get('items') || Immutable.List();

    primaryMenuItems = primaryMenuItems
      .map(item => <a href={item.get('url')} key={item.get('ID')}>{item.get('title')}</a>)
      .toJS();

    let logoIconStyle = Object.assign({
      fill: this.props.open ? color('lightGray') : color('text'),
    }, style.logoIcon);

    return (
      <span onClick={this.onClick}>
        <nav className="AppNav" style={style.AppNav}>
          <div className="AppNav-bar">
            <div className="AppNav-bar-logo">
              <Button component={Link} onClick={AppActions.closeNav} to="/">
                <SvgIcon name="logo" style={logoIconStyle} />
              </Button>
            </div>
            <div className="AppNav-bar-content">
              {primaryMenuItems}
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick}>
                <SvgIcon name="menu" style={style.toggleIcon} />
              </Button>
            </div>
          </div>
        </nav>
        <AppNavDrawer visibility={drawerVisibility} />
      </span>
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
