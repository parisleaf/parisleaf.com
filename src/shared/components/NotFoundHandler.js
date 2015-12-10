'use strict';

import React from 'react';
import Helmet from 'react-helmet';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';
import TitleSection from './TitleSection';

let NotFoundHandler = React.createClass({
  render() {
    return (
      <div className="NotFound">
        <Helmet title="404 | Page not found" />
        <style>{`
          #logo {
            transform: rotateZ(180deg);
          }
        `}</style>
        <div className="NotFound-header">
          <TitleSection title="Well, this is awkward."/>
        </div>
        <div className="NotFound-content">
          <Header level={2}>Error 404!</Header>
          <Button component={AppLink} to='/' primaryDark>Get me outta here</Button>
        </div>
      </div>
    );
  },
});

export default NotFoundHandler;
