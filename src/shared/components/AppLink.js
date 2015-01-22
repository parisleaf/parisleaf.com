'use strict';

import React from 'react';
import { Link } from 'react-router';
import { isLocalUrl, isWPUrl, normalizeUrl, hasLeadingSlash } from '../utils/LinkUtils';

let AppLink = React.createClass({

  getDefaultProps() {
    return {
      to: null,
      href: null,
    }
  },

  render() {
    let {to, href, ...props} = this.props;
    to = to || href;

    if (to && (isLocalUrl(to) || isWPUrl(to))){
      to = normalizeUrl(to);

      if (hasLeadingSlash(to)) return <Link {...props} to={to} />;
    }

    return <a href={to} {...this.props} />;
  }

});

export default AppLink;
