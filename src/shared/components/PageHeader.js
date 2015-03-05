'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import BorderContainer from './BorderContainer';
import Header from './Header';
import { color, rhythm } from '../theme';

let { assign } = Object;

let style = {
  header: {
    padding: `${rhythm(1)} 0`,
    borderBottom: `1px ${color('lightGray')} solid`,
  },
};

let PageHeader = React.createClass({

  getDefaultProps() {
    return {
      noHang: false,
      noBorder: false,
      borderColor: color('yellow'),
    }
  },

  render() {
    let headerStyle = assign({}, style.header);

    if (this.props.noBorder) {
      headerStyle.borderBottom = 'none';
    }

    return (
      <header style={headerStyle}>
        <SiteContainer>
          <BorderContainer noHang={this.props.noHang} borderColor={this.props.borderColor}>
            <Header level={1}>
              {this.props.title}
            </Header>
            <Header level={2}>
              {this.props.subtitle}
            </Header>
            {this.props.children}
          </BorderContainer>
        </SiteContainer>
      </header>
    );
  }

});

export default PageHeader;
