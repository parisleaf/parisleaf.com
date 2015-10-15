import React from 'react';

import moment from 'moment';
import { nestedGet } from '../utils/ImmutableUtils';
import { getTermNames } from '../utils/PostUtils';

let PostMeta = React.createClass({

  render() {
    let { post, ...props } = this.props;
    let byline = `By ${nestedGet(post, 'author', 'name')}`;
    let dateline = `on ${this.dateString()}`;
    let categoryList = this.categoryList();
    let classes = ['Metadata'];
    let style = {
      _: {
      },
    };

    if (this.props.customClass) classes.push(this.props.customClass);
    if (this.props.hover) classes.push('Metadata--noColor');
    if (this.props.bgColor) style._.backgroundColor = this.props.bgColor;

    return (
      <p className={classes.join(' ')} style={style._}>
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

    if (!categories.length) return <span />;

    return (
      <span> from {categories.join(' ,')}</span>
    );
  }

});

export default PostMeta;
