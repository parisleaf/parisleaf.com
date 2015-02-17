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
    paddingLeft: rhythm(1)
  },

  metaPadding: {
    paddingTop: rhythm(1),
    paddingLeft: rhythm(1),
    paddingRight: rhythm(1)
  },

  contactInfo: {
    display: 'block',
  },

   firstIcon: {
    width: rhythm(3/2),
    height: rhythm(3/2),
    fill: color('darkGray'),
  },

  extraIcon: {
    width: rhythm(3/2),
    height: rhythm(3/2),
    fill: color('darkGray'),
    marginLeft: rhythm(1/2)
  },
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
      visibility: visibility > 0 ? 'visible' : 'hidden',
    }, style._);

    _style.webkitTransform = _style.transform;
    _style.MsTransform = _style.transform;

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
        <div className="AppNavDrawer-sidebar-contact" style={style.metaPadding}>
          <Metadata style={style.contactInfo}>107 SW 7th Street</Metadata>
          <Metadata style={style.contactInfo}>Gainesville, FL 32601</Metadata>
        </div>
        <div className="AppNavDrawer-sidebar-icons" style={style.metaPadding}>
           <SvgIcon name="vimeo-circle" style={style.firstIcon}/>
           <SvgIcon name="facebook-circle" style={style.extraIcon}/>
           <SvgIcon name="twitter-circle" style={style.extraIcon}/>
           <SvgIcon name="email" style={style.extraIcon}/>
        </div>
      </section>
    );
  }

});

export default AppNavSidebar;
