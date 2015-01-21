'use strict';

 import React from 'react/addons';

 const SVGNS = 'http://www.w3.org/2000/svg';
 const XLINKNS = 'http://www.w3.org/1999/xlink';

 let SvgIcon = React.createClass({

  render() {

    let style = Object.assign({
      verticalAlign: 'middle',
      display: 'inline-block',
    }, this.props.style);

    let classes = [];

    if (this.props.className) classes.push(this.props.className);

    let className = classes.join(' ');

    return (
      <svg
        {...this.props}
        style={style}
        key={this.props.name}
        className={className}
        dangerouslySetInnerHTML={{ __html: `<use xlink:href="#${this.props.name}"></use>` }}
      />
    );
  }
 });

export default SvgIcon;
