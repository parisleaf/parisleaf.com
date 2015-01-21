'use strict';

import React from 'react';
import Metadata from './Metadata';
import SvgIcon from './SvgIcon';
import AppLink from './AppLink';
import Button from './Button';

import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {

  _: {
    backgroundColor: '#fff',
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  primaryMenuLink: {
    // display: 'inline-block',
  },

  secondaryMenuLink: {
    // display: 'inline-block',
  },

  resetList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  menuList: {
    listStyleType: 'none',
  },

  menuPadding: {
    paddingTop: rhythm(1),
    paddingLeft: rhythm(1)
  },

  contactInfo: {
    display: 'block',
  },

  emailIcon: {
    width: rhythm(1),
    height: rhythm(1),
    fill: color('lightGray')
  },

  facebookIcon: {
    width: rhythm(1),
    height: rhythm(1),
    fill: color('lightGray'),
    marginLeft: rhythm(1)
  },

  twitterIcon: {
    width: rhythm(1),
    height: rhythm(1),
    fill: color('lightGray'),
    marginLeft: rhythm(1),
  }
};

let AppNavSidebar = React.createClass({

  primaryMenu() {
    let menu = this.props.primaryMenu;

    if (!menu) return null;

    let items = menu.get('items').map(item =>
      <li key={item.get('ID')}>
        <Button
          component={AppLink}
          href={item.get('url')}
          style={style.primaryMenuLink}
          primaryMenuLink
        >
          {item.get('title')}
        </Button>
      </li>
    ).toJS();

    return <ul style={style.resetList}>{items}</ul>;
  },

  secondaryMenu() {
    let menu = this.props.secondaryMenu;

    if (!menu) return null;

    let items = menu.get('items').map(item =>
      <li key={item.get('ID')}>
        <Button
          component={AppLink}
          href={item.get('url')}
          style={style.secondaryMenuLink}
          secondaryMenuLink
        >
          {item.get('title')}
        </Button>
      </li>
    ).toJS();

    return <ul style={style.resetList}>{items}</ul>;
  },

  render() {
    let { visibility } = this.props;

    let _style = Object.assign({
      transform: `translateX(${(1 - visibility) * -100}%)`,
    }, style._);

    return (
      <section className="AppNavDrawer-sidebar" style={_style}>
        <div className="AppNavDrawer-sidebar-menu">
          <div style={style.menuPadding}>
            {this.primaryMenu()}
          </div>
          <div style={style.menuPadding}>
            {this.secondaryMenu()}
          </div>
        </div>
        <div className="AppNavDrawer-sidebar-contact" style={style.menuPadding}>
          <Metadata style={style.contactInfo}>107 SW 7th Street</Metadata>
          <Metadata style={style.contactInfo}>Gainesville, FL 32601</Metadata>
        </div>
        <div className="AppNavDrawer-sidebar-icons" style={style.menuPadding}>
           <SvgIcon name="email" style={style.emailIcon}/>
           <SvgIcon name="facebook-circle" style={style.facebookIcon}/>
           <SvgIcon name="twitter-circle" style={style.twitterIcon}/>
        </div>
      </section>
    );
  }

});

export default AppNavSidebar;
