import React from 'react';
import SuitCSS from 'react-suitcss'

const FlexContainer = React.createClass({
  render() {
    return (
      <SuitCSS
        {...this.props}
        componentName="FlexContainer"
        element="div"
        modifiers={[
          'collapse',
          'fullWidth',
          'noWrap'
        ]}
      />
    );
  }
});

export default FlexContainer;
