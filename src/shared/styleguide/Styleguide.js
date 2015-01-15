'use strict';

import React from 'react';
import StyleguideComponent from 'react-styleguide';

let Styleguide = React.createClass({
  render() {
    return(
    <StyleguideComponent title="Parisleaf Styleguide">

      <div 
        title="Buttons"
        description="Lorem ipsum"
        example="<Button />"
      >
        <div>HELLO BUTTON</div>
      </div>


    </StyleguideComponent>
    );
  }
});

export default Styleguide;
