import React from 'react';
import Flux from 'flummox/component';
import SiteContainer from './SiteContainer';
import { color, rhythm } from '../theme';

const PageFooter = React.createClass({
  render() {
    return (
      <footer className="PageFooter" style={{
        backgroundColor: color('darkGray'),
        color: color('lightGray'),
        padding: `${rhythm(1)} 0`,
      }}>
        <SiteContainer>
          <p className="Metadata Metadata--noColor">
            &copy; Parisleaf {new Date().getFullYear()}
          </p>
        </SiteContainer>
      </footer>
    )
  }
});

export default PageFooter;
