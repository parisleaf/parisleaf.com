'use strict';

import React from 'react';
import SiteContainer from './SiteContainer';
import ViewportContainer from 'react-viewport';
// import Header from './Header'
import { color, rhythm, fontFamily, fontSize, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    paddingTop: rhythm(navBarRhythmHeight),
    marginTop: rhythm(-1 * navBarRhythmHeight),
    background: '#fff',
    minHeight: '100vh',
  },

  helloZone: {
    padding: `${rhythm(2)} 0`,
  },

  helloZoneContent: {
    width: '100%',
  },

  text: {
    // Yellow line
    borderLeft: `${rhythm(1/4)} solid ${color('yellow')}`,
    paddingLeft: `${rhythm(1)}`,
  },

  title: {
    fontFamily: fontFamily('alright'),
    margin: `0 0 ${rhythm(1/2)}`,
    lineHeight: 1,
    fontWeight: 800,
    fontSize: fontSize('h2'),
  },

  subtitle: {
    fontFamily: fontFamily('vollkorn'),
    margin: 0,
    lineHeight: 1.25,
    fontSize: fontSize('h3'),
  },

  featuredZone: {
    padding: `${rhythm(2)} 0`,
    background: color('lightBlue'),
  },
};

let HomeFirstImpression = React.createClass({

  render() {
    let title, subtitle;

    if (this.props.page) {
      let meta = this.props.page.get('meta');
      title = meta.get('first_impression_title');
      subtitle = meta.get('first_impression_subtitle');
    }

    return (
      <ViewportContainer className="Home-firstImpression" style={style._}>
        <section style={style.helloZone} className="Home-firstImpression-helloZone">
          <div style={style.helloZoneContent}>
            <SiteContainer>
              <div style={style.text}>
                {title && <h2 style={style.title}>{title}</h2>}
                {subtitle && <h3 style={style.subtitle}>{subtitle}</h3>}
              </div>
            </SiteContainer>
          </div>
        </section>
        <section style={style.featuredZone} className="Home-firstImpression-featuredZone">
        </section>
      </ViewportContainer>
    );
  }

});

export default HomeFirstImpression;
