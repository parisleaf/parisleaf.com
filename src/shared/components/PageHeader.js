'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import BorderContainer from './BorderContainer';
import Header from './Header';
import { color, rhythm } from '../theme';

let style = {
  _: {
    padding: `${rhythm(1)} 0`,
    borderBottom: `1px ${color('lightGray')} solid`,
  },
};

let PageHeader = React.createClass({

  getDefaultProps() {
    return {
      noHang: false,
      borderColor: color('yellow'),
    }
  },

  render() {
    return (
      <header style={style._}>
        <SiteContainer>
          <BorderContainer noHang={this.props.noHang} borderColor={this.props.borderColor}>
            <Header component="h1" level={3}>
              {this.props.title}
            </Header>
            <Header component="h2" level={4}>
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
