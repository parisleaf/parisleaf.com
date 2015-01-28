'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import theme from '../theme';
import AppLink from './AppLink';
import BlogCard from './BlogCard';
import SiteContainer from './SiteContainer';

// Component that will most definitely be used on home page
// Says more from blog
// Has two blogs that can be given or are the two most recent
// Will need to be a shortcode
// Should supply slugs [moreFromBlog slug1='hello' slug2='world'] so can be used anywhere

let style = {
  _: {
    backgroundColor: theme.color('lightGray'),
    paddingTop: theme.rhythm(1),
    paddingBottom: theme.rhythm(1)
  },
  
  header: {
  }
}

let MoreFromBlog = React.createClass({

  displayPosts() {
    let posts = this.props.posts;
   
    if(!(typeof posts === 'undefined')) {
      let cards = posts.map(function(post) {
        return(<BlogCard post={post} />);
      });

      return(
        <div className="MoreFromBlog-cards">
          {cards}
        </div>
     );
    }
  },

  render() {
    return(
      <div className="MoreFromBlog" style={style._}>
        <SiteContainer>
        <div className="MoreFromBlog-header" style={style.header}>
          <Header level={3}>From the Parisleaf blog:</Header>
        </div>
        {this.displayPosts() }
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
