'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import SiteContainer from './SiteContainer';
import BorderContainer from './BorderContainer';
import Header from './Header';
import PostMeta from './PostMeta';
import { getHeroImage, getCardColor } from '../utils/PostUtils';
import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    height: '100vh',
    marginTop: rhythm(-1 * navBarRhythmHeight),
    paddingTop: rhythm(navBarRhythmHeight),
    backgroundColor: color('darkGray'),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    width: '100%',
    color: '#fff',
  },
};

let PostFirstImpression = React.createClass({

  render() {
    let { post } = this.props;

    let _style = Object.assign({
      backgroundImage: `url(${getHeroImage(post)})`,
    }, style._);

    return (
      <ViewportContainer className="PostFirstImpression" style={_style}>
        <SiteContainer className="PostFirstImpression-content" style={style.content}>
          <BorderContainer borderColor={getCardColor(post)}>
            <Header level={1}>{post.get('title')}</Header>
            <PostMeta post={post} />
          </BorderContainer>
        </SiteContainer>
      </ViewportContainer>
    );
  }

});

export default PostFirstImpression;
