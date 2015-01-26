'use strict';

import React from 'react';
import { nestedGet } from '../utils/ImmutableUtils';
import SiteContainer from './SiteContainer';
import theme from '../theme';

let style = {
  _: {
    paddingTop: theme.rhythm(1)
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
