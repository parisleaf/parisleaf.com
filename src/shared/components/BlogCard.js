'use strict';

import React from 'react';

import moment from 'moment';
import { nestedGet } from '../utils/ImmutableUtils';
import { getTermNames, getCardColor } from '../utils/PostUtils';
import { rhythm, color, siteContainerRhythmPadding } from '../theme';

import AppLink from './AppLink';
import Header from './Header';
import Button from './Button';

let style = {
  _: {
    padding: rhythm(siteContainerRhythmPadding - 1/4),
    margin: `${rhythm(1/2)} 0`,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  title: {
    margin: 0,
  },

  metadata: {
    marginTop: 0,
  },
}

let BlogCard = React.createClass({

  getInitialState() {
    return {
      hover: false,
    }
  },

  getDefaultProps() {
    return {
      expanded: true,
    };
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.expanded && !nextProps.expanded) {
      if (this.refs.excerpt) {
        this.refs.excerpt.recalcEllipsis();
      }
    }
  },

  onMouseOver() {
    this.setState({hover: true});
  },

  onMouseLeave() {
    this.setState({hover: false});
  },

  render() {
    let { post } = this.props;
    let cardColor = getCardColor(post);

    let _style = Object.assign({
      height: this.props.expanded ? rhythm(12) : rhythm(6),
      borderLeft: `${rhythm(1/4)} ${cardColor} solid`,
    }, style._);

    if (this.state.hover) {
      _style = Object.assign(_style, {
        backgroundColor: cardColor,
        color: '#fff',
      });
    }

    return (
      <Button component={AppLink} to={post.get('link')} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <article style={_style} className="Blog-post">
          <header className="Blog-post-header">
            <Header component="h1" level={4} style={style.title} dangerouslySetInnerHTML={{ __html: post.get('title') }}/>
            <PostMeta post={post} />
          </header>
          {this.props.expanded && <BlogCardExcerpt post={post} ref="excerpt"/>}
        </article>
      </Button>
    );
  },

});

let BlogCardExcerpt = React.createClass({

  componentDidMount() {
    // Truncate multi-line excerpt
    import Ellipsis from 'ftellipsis';
    this.ellipsis = new Ellipsis(this.getDOMNode());

    this.ellipsis.calc();
    this.ellipsis.set();
    window.addEventListener('resize', this.recalcEllipsis);
  },

  componentWillUnmount() {
    this.ellipsis.destroy();
    window.removeEventListener('resize', this.recalcEllipsis);
  },

  recalcEllipsis() {
    this.ellipsis.unset();
    this.ellipsis.calc();
    this.ellipsis.set();
  },

  render() {
    let { post } = this.props;

    return (
      <div
        className="Excerpt Blog-post-excerpt"
        dangerouslySetInnerHTML={{ __html: post.get('excerpt') }}
      />
    );
  }

});

let PostMeta = React.createClass({

  render() {
    let { post } = this.props;

    let byline = `By ${nestedGet(post, 'author', 'name')}`
    let dateline = `on ${this.dateString()}`;
    let categoryList = this.categoryList();

    return (
      <p className="Metadata" style={style.metadata}>
        <span>{byline}</span> <span>{dateline}</span>
        { categoryList }
      </p>
    );
  },

  dateString() {
    let date = new Date(this.props.post.get('date'));

    if (date.getFullYear() !== new Date().getFullYear()) {
      return moment(date).format('MMM DD');
    } else {
      return moment(date).format('MMM DD YYYY');
    }
  },

  categoryList() {
    let categories = getTermNames(this.props.post, 'category');

    if (!categories.length) return null;

    return (
      <span> from {categories.join(' ,')}</span>
    );
  }

});


export default BlogCard;
