'use strict';

import React from 'react';
import { nestedGet } from '../utils/ImmutableUtils';
import SiteContainer from './SiteContainer';
import { rhythm } from '../theme';

let style = {
  _: {
    paddingTop: rhythm(2),
    paddingBottom: rhythm(2)
  }
};

let HomeProcessSection = React.createClass({

  render() {
    let page = this.props.page;
    let processCopy = nestedGet(page, 'meta', 'parisleaf_description');

    return(
      <div className="HomeProcessSection" style={style._}>
        <SiteContainer>
          <div className="HomeProcessSection-copy" dangerouslySetInnerHTML={{__html: processCopy}} />
        </SiteContainer>
      </div>
    );
  }
});

export default HomeProcessSection;
