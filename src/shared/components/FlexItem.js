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
          'grow',
          'span4',
          'span8'
        ]}
      />
    );
  }
});

export default FlexItem;
