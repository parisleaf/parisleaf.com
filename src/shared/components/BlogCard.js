'use strict';

import React from 'react';

import { getCardColor, getFeaturedImage } from '../utils/PostUtils';
import { rhythm, siteContainerRhythmPadding } from '../theme';

import AppLink from './AppLink';
import Button from './Button';
import PostMeta from './PostMeta';

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
}

let BlogCard = React.createClass({

  getInitialState() {
    return {
      hover: false,
    }
  },

  getDefaultProps() {
    return {
      expanded: false,
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

  shouldShowImage() {
    return !!(this.props.expanded && getFeaturedImage(this.props.post));
  },

  render() {
    let { post } = this.props;
    //console.log(post.toJS());
    let cardColor = getCardColor(post);
    let shouldShowImage = this.shouldShowImage();

    let _style = Object.assign({
      height: this.props.expanded ? rhythm(20) : rhythm(6),
      borderLeft: `${rhythm(1/4)} ${cardColor} solid`,
    }, style._);

    if (this.state.hover) {
      _style = Object.assign(_style, {
        backgroundColor: cardColor,
        color: '#fff',
      });
    }

    let titleClasses = ['Header'];

    titleClasses.push(this.expanded ? 'Header--blogCardLarge' : 'Header--blogCard');

    return (
      <Button component={AppLink} to={post.get('link')} onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <article style={_style} className="Blog-post">
          <header className="Blog-post-header">
            {shouldShowImage && <BlogCardImage post={post} overlay={this.state.hover} overlayColor={cardColor} />}
            <h1
              className={titleClasses.join(' ')}
              style={style.title}
              dangerouslySetInnerHTML={{ __html: post.get('title') }}
            />
            <PostMeta post={post} hover={this.state.hover} />
          </header>
          {this.props.expanded && <BlogCardExcerpt post={post} ref="excerpt"/>}
        </article>
      </Button>
    );
  },

});

let imageStyle = {
  _: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: rhythm(6),
    margin: rhythm(-1 * siteContainerRhythmPadding),
    marginBottom: rhythm(1),
  },

  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
  },
};

let BlogCardImage = React.createClass({

  render() {
    let { post } = this.props;

    let _style = Object.assign({
      backgroundImage: `url(${getFeaturedImage(post)})`,
    }, imageStyle._);

    let overlayStyle = imageStyle.overlay;

    if (this.props.overlay) {
      overlayStyle = Object.assign({
        backgroundColor: this.props.overlayColor,
        opacity: 0.4,
      }, overlayStyle);
    }

    return (
      <div style={_style}>
        <div style={overlayStyle} />
      </div>
    );
  }

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
        style={{ overflow: 'hidden' }}
      />
    );
  }

});


export default BlogCard;
