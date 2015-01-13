'use strict';

import React from 'react';
import Immutable from 'immutable';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex } from '../../shared/theme';
import Button from './Button';

const navBarRhythmHeight = 2;

let style = {
  AppNav: {
    backgroundColor: color('lightGray'),
    height: rhythm(navBarRhythmHeight),
    lineHeight: rhythm(navBarRhythmHeight),
    position: 'relative',
    zIndex: zIndex('AppNav'),
  },

  toggleButton: {
    width: rhythm(navBarRhythmHeight),
    textAlign: 'center',
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
    console.log('click');
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
            <div className="AppNav-bar-content">
              <Link to="/">Parisleaf</Link>
              {primaryMenuItems}
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick} style={style.toggleButton}>X</Button>
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
