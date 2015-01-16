'use strict';

import React from 'react';
import Immutable from 'immutable';
import MediaMixin from 'react-media-mixin';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex, navBarRhythmHeight } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';
import SiteContainer from './SiteContainer';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');

const transitionDuration = 250;
const logoAspectRatio = 769.9 / 200;
const fillTransition = `fill ease-in-out ${250}ms`;

let style = {
  wrapper: {
    height: rhythm(navBarRhythmHeight),
  },

  _: {
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
    transition: fillTransition,
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight * 0.5),
    height: rhythm(navBarRhythmHeight * 0.5),
    transition: fillTransition,
  },
};

let AppNav = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      drawerVisibility: this.props.open ? 1 : 0,
    };
  },

  contextTypes: {
    media: React.PropTypes.object,
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
      duration: transitionDuration,
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
    }, style._);

    let logoIconStyle = Object.assign({
      fill: this.props.open ? '#fff' : this.props.textColor,
    }, style.logoIcon);

    let toggleIconStyle = Object.assign({
      fill: this.props.open
        ? (
            this.context.media.l
              ? color('gray')
              : '#fff'
          )
        : this.props.textColor,
    }, style.toggleIcon);

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
                <SvgIcon name="menu" style={toggleIconStyle} />
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

  sidebar: {
    backgroundColor: color('darkGray'),
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  content: {
    backgroundColor: '#fff',
    overflow: 'auto',
  },
}

let AppNavDrawer = React.createClass({

  getDefaultProps() {
    return {
      visibility: 0,
    };
  },

  contextTypes: {
    media: React.PropTypes.object,
  },

  render() {
    let visibility = this.props.visibility;

    let _style = Object.assign({
      transform: `translateX(${100 - (visibility * 100)}%)`,
      display: visibility === 0 ? 'none' : 'block',
    }, drawerStyle._);

    _style.WebkitTransform = _style.transform;
    _style.msTransform = _style.transform;

    let _contentStyle = drawerStyle.content;

    if (this.context.media.l) {
      _contentStyle = Object.assign({
        paddingTop: drawerStyle.sidebar.paddingTop,
        marginTop: drawerStyle.sidebar.marginTop,
      }, _contentStyle);
    }

    return (
      <div style={_style}>
        <div style={drawerStyle.container} className="AppNavDrawer">
          <section className="AppNavDrawer-sidebar" style={drawerStyle.sidebar}>
            sidebar
          </section>
          <section className="AppNavDrawer-content" style={_contentStyle}>
            content
          </section>
        </div>
      </div>
    );
  }

});

export default AppNav;
