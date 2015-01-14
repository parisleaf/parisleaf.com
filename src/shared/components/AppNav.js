'use strict';

import React from 'react';
import Immutable from 'immutable';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';

const navBarRhythmHeight = 2;
const logoAspectRatio = 769.9 / 200;

let style = {
  AppNav: {
    color: color('gray'),
    height: rhythm(navBarRhythmHeight),
    lineHeight: rhythm(navBarRhythmHeight),
    position: 'relative',
    zIndex: zIndex('AppNav'),
  },

  logoIcon: {
    height: rhythm(navBarRhythmHeight),
    width: rhythm(navBarRhythmHeight * logoAspectRatio), // Use aspect ratio
    padding: `${rhythm(1/4)} ${rhythm((1/4) / logoAspectRatio)}`,
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight),
    height: rhythm(navBarRhythmHeight),
    padding: rhythm(1/4),
  },

  AppNavDrawer: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: zIndex('AppNav', -1),
    backgroundColor: color('gray'),
    paddingTop: rhythm(navBarRhythmHeight),
    top: 0,
    left: 0,
  }
};

let AppNav = React.createClass({

  getInitialState() {
    return {
      // True if the menu is open/active
      open: false,
    };
  },

  getDefaultProps() {
    return {
      primaryMenu: Immutable.Map(),
    };
  },

  onToggleClick(event) {
    event.preventDefault();
    this.setState({ open: !this.state.open });
  },

  render() {
    let primaryMenuItems = this.props.primaryMenu.get('items') || Immutable.List();

    primaryMenuItems = primaryMenuItems
      .map(item => <a href={item.get('url')} key={item.get('ID')}>{item.get('title')}</a>)
      .toJS();

    return (
      <span>
        <nav className="AppNav" style={style.AppNav}>
          <div className="AppNav-bar">
            <div className="AppNav-bar-logo">
              <Button component={Link} to="/">
                <SvgIcon name="logo" style={style.logoIcon} preserveAspectRatio="xMinYMin slice" />
              </Button>
            </div>
            <div className="AppNav-bar-content">
              {primaryMenuItems}
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick}>
                <SvgIcon name="ui_ux" style={style.toggleIcon} />
              </Button>
            </div>
          </div>
        </nav>
        <AppNavDrawer open={this.state.open} />
      </span>
    );
  }

});

let AppNavDrawer = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      visibility: this.props.open ? 1 : 0,
    };
  },

  getDefaultProps() {
    return {
      open: false,
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.shouldBeVisible() != this.shouldBeVisible(prevProps)) {
      this.updateVisibility();
    }
  },

  shouldBeVisible(props = this.props) {
    return props.open;
  },

  updateVisibility() {
    this.tweenState('visibility', {
      endValue: this.shouldBeVisible() ? 1 : 0,
      duration: 200,
    });
  },

  render() {
    let visibility = this.getTweeningValue('visibility');

    let _style = Object.assign({
      opacity: this.getTweeningValue('visibility'),
      display: visibility === 0 ? 'none' : 'block',
    }, style.AppNavDrawer);

    return (
      <div style={_style}>
        Menu contents
      </div>
    );
  }

});

export default AppNav;
