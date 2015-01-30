'use strict'

import React from 'react';
import SiteContainer from './SiteContainer';
import Tweet from './Tweet';
import BlogCard from './BlogCard';

import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    overflow: 'auto',
  }
};

let AppNavContent = React.createClass({

  featuredBlogPost() {
    let post = this.props.options.get('nav_featured_blog_post');
    if(typeof post !== 'undefined') {
      return(<BlogCard post={post} />);
    }
  },

  render() {
    let { visibility } = this.props;

    let _style = Object.assign({
      opacity: visibility,
    }, style._);

    return (
      <section className="AppNavDrawer-content" style={_style}>
        <SiteContainer>
          <Tweet tweet={this.props.tweets.get(0)} />
          <Tweet tweet={this.props.tweets.get(1)} />
          {this.featuredBlogPost()}
        </SiteContainer>
      </section>
    );
  }

});

export default AppNavContent;
