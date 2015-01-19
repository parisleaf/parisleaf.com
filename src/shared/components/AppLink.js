'use strict';

import React from 'react';
import { Link } from 'react-router';
import { isLocalUrl, isWPUrl, removeHost } from '../utils/LinkUtils';

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

    if (isLocalUrl(to) || isWPUrl(to)) {
      to = removeHost(to);
      return <Link {...props} to={to} />;
    } else {
      return <a href={to} {...this.props} />;
    }
  }

});

export default AppLink;
