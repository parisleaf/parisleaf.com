import React from 'react';
import SuitCSS from 'react-suitcss'

const FlexContainer = React.createClass({
  render() {
    return (
      <SuitCSS
        {...this.props}
        componentName="FlexContainer"
        modifiers={[
          'fullWidth',
        ]}
        element="div"
      />
    );
  }
});

export default FlexContainer;
