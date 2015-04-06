'use strict';

import React from 'react';
import { nestedGet } from '../utils/ImmutableUtils';
import HTMLContentArea from './HTMLContentArea';
import SiteContainer from './SiteContainer';
import { rhythm, color } from '../theme';

let style = {
  _: {
    paddingTop: rhythm(2),
    paddingBottom: rhythm(2),
  }
};

let HomeProcessSection = React.createClass({

  render() {
    let page = this.props.page;
    let processCopy = nestedGet(page, 'meta', 'parisleaf_description');

    return(
      <div className="HomeProcessSection" style={style._}>
        <SiteContainer>
          <HTMLContentArea html={processCopy} fullWidth />
        </SiteContainer>
      </div>
    );
  }
});

export default HomeProcessSection;
