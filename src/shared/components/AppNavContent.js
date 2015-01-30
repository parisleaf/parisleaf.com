'use strict'

import React from 'react';
import SiteContainer from './SiteContainer';
import Tweet from './Tweet';
import BlogCard from './BlogCard';
import Metadata from './Metadata';

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

  relatedBlog() {
    let firstPost = this.props.options.get('nav_related_blog_post_1');
    let secondPost = this.props.options.get('nav_related_blog_post_2');

    if(typeof firstPost !== 'undefined' && typeof secondPost !== 'undefined') {
      return(
        <div className="AppNavDrawer-content-related">
          <Metadata>Related: </Metadata>
          <div className="AppNavDrawer-content-related-items">
            <div className="Blog-postContainer-item">
              <BlogCard post={firstPost} />
            </div>
            <div className="Blog-postContainer-item">
              <BlogCard post={secondPost} />
            </div>
          </div>
        </div>
      );
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
          <div className="AppNavDrawer-content-tweets">
            <Metadata>Parisleaf Tweets: </Metadata>
            <Tweet tweet={this.props.tweets.get(0)} />
          </div>
        
          <div className="AppNavDrawer-content-featured">
            <Metadata>Parisleaf Blogs: </Metadata>
            {this.featuredBlogPost()}
          </div>

          {this.relatedBlog()}
        
        </SiteContainer>
      </section>
    );
  }

});

export default AppNavContent;
