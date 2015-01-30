'use strict';

import React from 'react';
import Immutable from 'immutable';
import AppLink from './AppLink';
import { rhythm, zIndex, navBarRhythmHeight } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';
import AppNavDrawer from './AppNavDrawer';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');

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
    event.preventDefault();

    if (this.props.open) {
      AppActions.closeNav();
    } else {
      AppActions.openNav();
    }
  },

  toggleMenuIcon() {
    let toggleIconStyle = Object.assign({
      fill: this.props.textColor,
    }, style.toggleIcon);

    if(this.props.open) {
      return(<SvgIcon name="close" style={toggleIconStyle} />);
    } else {
      return(<SvgIcon name="menu"  style={toggleIconStyle} />);
    }
  },

  render() {
    let _style = Object.assign({
      position: this.props.open ? 'fixed' : 'absolute',
    }, style._);

    let logoIconStyle = Object.assign({
      fill: this.props.textColor,
    }, style.logoIcon);

    return (
      <div onClick={this.onClick} style={style.wrapper}>
        <nav className="AppNav" style={_style}>
          <div className="AppNav-bar">
            <div className="AppNav-bar-logo">
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
        <AppNavDrawer
          open={this.props.open}
          primaryMenu={this.props.primaryMenu}
          secondaryMenu={this.props.secondaryMenu}
          tweets={this.props.tweets}
          options={this.props.options}
        />
      </div>
    );
  }

});

export default AppNav;
