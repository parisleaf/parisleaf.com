import React from 'react';
import Flux from 'flummox/component';
import SiteContainer from './SiteContainer';

const PageFooter = React.createClass({
  render() {
    return (
      <footer>
        <SiteContainer>
          From the blog
        </SiteContainer>
      </footer>
    )
  }
});

export default PageFooter;
