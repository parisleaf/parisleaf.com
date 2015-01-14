'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import { color, rhythm } from '../theme';

let style = {
  minHeight: rhythm(8),
  paddingTop: rhythm(2),
  marginTop: rhythm(-2),
  background: '#fff',
};

let HomeFirstImpression = React.createClass({

  render() {
    return (
      <section className="HomeFirstImpression" style={style}>
        <SiteContainer>
          <h1>Everyone has an ego.</h1>
          <h2>We just hook ours to the bike rack on our way in.</h2>
        </SiteContainer>
      </section>
    );
  }

});

export default HomeFirstImpression;
