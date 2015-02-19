'use strict';

import React from 'react';
import Flux from 'flummox/component';
import createSideEffect from 'react-side-effect';
import isNode from 'detect-node';

let _navBarColor;

let NavBarColor = React.createClass({

  statics: {
    dispose() {
      NavBarColorSideEffect.dispose();
    }
  },

  render() {
    return (
      <Flux>
        <NavBarColorSideEffect {...this.props} />
      </Flux>
    );
  }
});

let NavBarColorSideEffect = createSideEffect(propsList => {
  let innermostProps = propsList[propsList.length - 1];

  if (!innermostProps) return;

  let { flux, color } = innermostProps;

  if (!isNode) {
    flux.getActions('app').setNavTextColor(color);
  }
});

export default NavBarColor;
