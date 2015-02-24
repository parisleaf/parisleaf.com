'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import { color, rhythm } from '../theme';
import AppLink from './AppLink';
import BlogCard from './BlogCard';
import SiteContainer from './SiteContainer';
import RevealOnScroll from './RevealOnScroll';


let style = {
  _: {
    backgroundColor: color('lightGray'),
    paddingTop: rhythm(1),
    paddingBottom: rhythm(2)
  }
};

let MoreFromBlog = React.createClass({

  cards() {
    let posts = this.props.posts;

    if (!posts) return null;

    let cards = posts.toArray().map(function(post) {
      return(
        <div className="Blog-postContainer-item" key={post.get('id_str')}>
          <BlogCard post={post} expanded/>
        </div>
      );
    });

    return(
      <div className="MoreFromBlog-cards">
        {cards}
      </div>
   );
  },

  render() {
    return(
      <div className="MoreFromBlog" style={style._}>
        <SiteContainer>
        <div className="MoreFromBlog-header" style={style.header}>
          <Header level={3}>From the Parisleaf blog:</Header>
        </div>
        {this.cards()}
        <div className="MoreFromBlog-visitBlog">
          <Button component={AppLink} to='/blog' secondaryDark>
            Check out the blog
          </Button>
        </div>
        </SiteContainer>
      </div>
    );
  }
});

export default MoreFromBlog;
