'use strict';

import React from 'react';
import Header from './Header';
import Button from './Button';
import { color, rhythm } from '../theme';
import AppLink from './AppLink';
import MoreCard from './MoreCard';
import SiteContainer from './SiteContainer';
import SvgIcon from './SvgIcon';

let MoreFromBlog = React.createClass({

  cards() {
    let posts = this.props.posts;

    if (!posts) return <span />;

    let cards = posts.toArray().map(function(post) {
      if (!post) return <span />;

      return(
        <div className="MoreFromBlog-post" key={post.get('ID')}>
          <MoreCard post={post}/>
        </div>
      );
    });

    return(
      <div className="MoreFromBlog-postContainer">
        {cards}
      </div>
    );
  },

  render() {
    return(
      <div className="MoreFromBlog Section">
        <SiteContainer breakAll padAll>
          <div className="MoreFromBlog-inner">
            <Header level={3}>From the blog:</Header>
            {this.cards()}
            <Button component={AppLink} to='/blog' secondaryDark rightResponsive>
              Check out the blog
            </Button>
            <div className="MoreFromBlog-logoContainer">
              <SvgIcon name="logo_compact" className="MoreFromBlog-logo" />
            </div>
          </div>
        </SiteContainer>
      </div>
    );
  }
});

export default MoreFromBlog;
