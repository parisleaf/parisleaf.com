'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';

import BorderContainer from './BorderContainer';
import Header from './Header';
import PostMeta from './PostMeta';
import SiteContainer from './SiteContainer';

import { getHeroImage, getCardColor } from '../utils/PostUtils';

let PostFirstImpression = React.createClass({

  getDefaultProps() {
    return {
      noMeta: false,
      image: null,
    };
  },

  render() {
    let { post, noMeta, image, title, subtitle } = this.props;

    return (
      <ViewportContainer className="FirstImpressionCover">
        <div className="FirstImpressionCover-header" style={{backgroundImage: `url(${image || getHeroImage(post)})`}}>
          <SiteContainer breakAll padAll>
            <Header level={1} dangerouslySetInnerHTML={{ __html: title || post.get('title') }} bold />
            {subtitle && <Header level={2} dangerouslySetInnerHTML={{ __html: subtitle }} vollkorn noMargin />}
            {!noMeta && <PostMeta post={post} customClass="Metadata--post" />}
          </SiteContainer>
        </div>
      </ViewportContainer>
    );
  }

});

export default PostFirstImpression;
