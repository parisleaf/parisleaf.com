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
    padding: `0 ${rhythm(1)}`,
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

  onToggleClick(event) {
    let NavActions = this.props.flux.getActions('nav');

    event.preventDefault();

    NavActions.setOpen(!this.props.open);
  },

  toggleMenuIcon() {
    let toggleIconStyle = Object.assign({
      fill: this.props.open ? color('text') : this.props.textColor,
    }, style.toggleIcon);

    if(this.props.open) {
      return(<SvgIcon name="close" style={toggleIconStyle} />);
    } else {
      return(<SvgIcon name="menu"  style={toggleIconStyle} />);
    }
  },

  render() {
    let AppActions = this.props.flux.getActions('app');

    let _style = Object.assign({
      position: this.props.open ? 'fixed' : 'absolute',
    }, style._);

    let logoIconStyle = Object.assign({
      fill: this.props.open ? color('text') : this.props.textColor,
    }, style.logoIcon);

    return (
      <div onClick={this.onClick} style={style.wrapper}>
        <nav className="AppNav" style={_style}>
          <div className="AppNav-bar">
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
