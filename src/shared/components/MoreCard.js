'use strict';

import React from 'react/addons';
let { PureRenderMixin } = React.addons;

import { getCardColor, getFeaturedImage } from '../utils/PostUtils';
import { rhythm, siteContainerRhythmPadding } from '../theme';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';
import PostMeta from './PostMeta';

let MoreCard = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    let { post } = this.props;
    let cardColor = getCardColor(post);

    return (
      <Button
        className="MoreCard"
        component={AppLink}
        to={post.get('link')}
      >
        <article className="MoreCard-card">
          <MoreCardImage className="MoreCard-image" post={post} />
          <PostMeta customClass="MoreCard-meta" post={post} hover={true} bgColor={cardColor} />
        </article>
      </Button>
    );
  }
});

let MoreCardImage = React.createClass({
  render() {
    let { post } = this.props;

    return (
      <div className="MoreCard-image" style={{backgroundImage: `url(${getFeaturedImage(post)})`}}>
        <Header level={3} className="MoreCard-title" bold>
          {post.get('title')}
        </Header>
        <div className="MoreCard-overlay" />
      </div>
    );
  }
});

export default MoreCard;
