'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import Header from './Header'
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
          <Header level={2}>Everyone has an ego.</Header>
          <Header level={3}>We just hook ours to the bike rack on our way in.</Header>
        </SiteContainer>
      </section>
    );
  }

});

export default HomeFirstImpression;
