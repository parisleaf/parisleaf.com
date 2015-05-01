import React from 'react';

import moment from 'moment';
import { nestedGet } from '../utils/ImmutableUtils';
import { getTermNames } from '../utils/PostUtils';

let style = {
  _: {
    marginTop: 0,
  },
}

let PostMeta = React.createClass({

  render() {
    let { post } = this.props;

    let byline = `By ${nestedGet(post, 'author', 'name')}`
    let dateline = `on ${this.dateString()}`;
    let categoryList = this.categoryList();

    let classes = ['Metadata'];

    if (this.props.hover) classes.push('Metadata--noColor');

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
