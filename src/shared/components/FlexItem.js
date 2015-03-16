import React from 'react';
import SuitCSS from 'react-suitcss'

const FlexItem = React.createClass({
  render() {
    return (
      <SuitCSS
        {...this.props}
        componentName="FlexItem"
        element="div"
        modifiers={[
          'grow'
        ]}
      />
    );
  }
});

export default FlexItem;
