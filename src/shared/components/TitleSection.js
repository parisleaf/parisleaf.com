'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import Header from './Header'

let TitleSection = React.createClass({
  title() {
    if ( this.props.title ) {
      return (
        <Header
          level={1}
          sectionBreak
        >
          {this.props.title}
        </Header>
      );
    } else {
      return <span />;
    }
  },

  subtitle() {
    if ( this.props.subtitle ) {
      return (
        <div className="TitleSection-subline">
          {this.props.subtitle}
        </div>
      );
    } else {
      return <span />;
    }
  },

  render() {

    return (
      <div className="TitleSection">
        <SiteContainer breakFixed padAll>
          {this.title()}
          {this.subtitle()}
        </SiteContainer>
      </div>
    );
  }
});

export default TitleSection;
