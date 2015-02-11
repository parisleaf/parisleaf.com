'use strict';

import React from 'react';

import Button from './Button';
import AppLink from './AppLink';
import Header from './Header';

import { rhythm } from '../theme';
import { nestedGet } from '../utils/ImmutableUtils';

let style = {
  _: {
    display: 'block',
    backgroundColor: 'gray',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    padding: rhythm(1),
    height: rhythm(10),
    transitionProperty: 'left, top',
    transitionDuration: '500ms',
  },
};

let PortfolioItem = React.createClass({

  getInitialState() {
    return {
      hover: null,
    };
  },

  onMouseEnter() {
    this.setState({hover: true});
  },

  onMouseLeave() {
    this.setState({hover: false});
  },

  render() {
    let { project, width, height, x, y } = this.props;

    let _style = Object.assign({
      width,
    }, style._);

    let featuredImageUrl = nestedGet(project, 'featured_image', 'source');

    if (featuredImageUrl) {
      _style.backgroundImage = `url(${featuredImageUrl})`;
    }

    let classes = [ 'Portfolio-item' ];

    return (
      <Button
        component='a'
        className={classes.join(' ')}
        style={_style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        href={project.get('link')}
      >
        <PortfolioItemOverlay project={project} visible={this.state.hover} />
      </Button>
    );
  },

});

let overlayStyle = {
  _: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: '#fff',
    padding: rhythm(1),
    textAlign: 'center',
    transition: '200ms opacity',
  },
};

let PortfolioItemOverlay = React.createClass({

  render() {
    let { project } = this.props;

    let _overlayStyle = Object.assign({
      opacity: this.props.visible ? 1 : 0,
    }, overlayStyle._);

    return (
      <article style={_overlayStyle}>
        <Header level={2}>{project.get('title')}</Header>
      </article>
    );
  }

});

export default PortfolioItem;
