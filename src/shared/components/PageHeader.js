'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import BorderContainer from './BorderContainer';
import Header from './Header';
import { color, rhythm } from '../theme';

let { assign } = Object;

let PageHeader = React.createClass({

  getDefaultProps() {
    return {
      noHang: false,
      noBorder: false,
      borderColor: color('yellow'),
    }
  },

  render() {
    return (
      <header>
        <SiteContainer breakFixed padAll>
          <Header level={1} className="Header--title">
            {this.props.title}
          </Header>
          {this.props.children}
        </SiteContainer>
      </header>
    );
  }

});

export default PageHeader;
