'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import SiteContainer from './SiteContainer';
import { color, rhythm } from '../theme';

let style = {
  minHeight: '90vh',
  paddingTop: rhythm(2),
  marginTop: rhythm(-2),
  background: color('aqua'),
};

let HomeFirstImpression = React.createClass({

  render() {
    return (
      <ViewportContainer className="HomeFirstImpression" style={style}>
        <SiteContainer>
          Lorem ipsum dolor sit amet
        </SiteContainer>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
