'use strict';

import React from 'react';
import FluxComponent from 'flummox/component';
import Immutable from 'immutable';
import AppLink from './AppLink';
import { rhythm, zIndex, navBarRhythmHeight, color } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';
import AppNavDrawer from './AppNavDrawer';

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
  },

  bar: {
    padding: `0 ${rhythm(1)}`,
    width: '100%',
    transitionProperty: 'transform, -webkit-transform, background',
    transitionDuration: '150ms',
  },

  logoIcon: {
    height: rhythm(navBarRhythmHeight * 0.5),
    width: rhythm(navBarRhythmHeight * 0.5 * logoAspectRatio), // Use aspect ratio
    transition: fillTransition,
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight * 0.35),
    height: rhythm(navBarRhythmHeight * 0.35),
    transition: fillTransition,
  },

};

let AppNav = React.createClass({

  contextTypes: {
    media: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      open: false,
      menus: Immutable.Map(),
    };
  },

  getInitialState() {
    return {
      pinned: false,
      top: false,
    }
  },

  onToggleClick(event) {
    const NavActions = this.props.flux.getActions('nav');

    event.preventDefault();

    NavActions.setOpen(!this.props.open);
  },

  textColor() {
    if (this.props.open) return color('text');

    if (!this.state.top && this.state.pinned) return color('text');

    return this.props.textColor;
  },

  backgroundColor() {
    if (this.props.open) return 'rgba(0,0,0,0)';

    if (!this.state.top && this.state.pinned) return '#fff';

    return this.props.backgroundColor;
  },

  toggleMenuIcon() {
    const toggleIconStyle = {
      fill: this.textColor(),
      ...style.toggleIcon,
    };

    if(this.props.open) {
      return(<SvgIcon name="close" style={toggleIconStyle} />);
    } else {
      return(<SvgIcon name="menu"  style={toggleIconStyle} />);
    }
  },

  componentDidMount() {
    require('headroom.js');

    const el = this.getDOMNode();
    this.headroom = new Headroom(el, {
      onPin: () => this.setState({ pinned: true }),
      onUnpin: () => this.setState({ pinned: false }),
      onTop: () => this.setState({ top: true }),
      onNotTop: () => this.setState({ top: false }),
    });

    this.headroom.init();
  },

  componentWillUnmount() {
    this.headroom.destroy();
  },

  render() {
    const AppActions = this.props.flux.getActions('app');

    const _style = {
      position: this.props.open ? 'fixed' : 'absolute',
      ...style._,
    };

    const logoIconStyle = {
      fill: this.textColor(),
      ...style.logoIcon,
    };

    const barStyle = {
      background: this.backgroundColor(),
      position: this.state.top ? 'absolute' : 'fixed',
      transform: this.state.pinned || this.state.top
        ? `translateY(0%)`
        : `translateY(-100%)`,
      ...style.bar,
    };

    barStyle.WebkitTransform = barStyle.transform;

    return (
      <div onClick={this.onClick} style={style.wrapper}>
        <nav className="AppNav" style={_style}>
          <div className="AppNav-bar" style={barStyle}>
          laksjdflkadjdflkasjdkf
            <div className="AppNav-bar-logo" id="logo">
              <Button component={AppLink} onClick={AppActions.closeNav} to="/">
                <SvgIcon name="logo" style={logoIconStyle} />
              </Button>
            </div>
            <div className="AppNav-bar-content">
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick}>
                { this.toggleMenuIcon() }
              </Button>
            </div>
          </div>
        </nav>
        <FluxComponent connectToStores={{
          tweets: store => ({
            tweets: store.getTweets(),
          }),
          menus: store => ({
            primaryMenu: store.getMenuBySlug('primary'),
            secondaryMenu: store.getMenuBySlug('secondary'),
          }),
        }}>
          <AppNavDrawer open={this.props.open} options={this.props.options} />
        </FluxComponent>
      </div>
    );
  }

});

export default AppNav;
