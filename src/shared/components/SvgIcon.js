'use strict';

 import React from 'react/addons';

 const SVGNS = 'http://www.w3.org/2000/svg';
 const XLINKNS = 'http://www.w3.org/1999/xlink';

 let SvgIcon = React.createClass({

  componentDidMount() {
    this.replaceContents();
  },

  componentDidUpdate() {
    this.replaceContents();
  },

  // Replace entire `<use>` element
  replaceContents() {
    let el = this.getDOMNode();

    let use = document.createElementNS(SVGNS, 'use');
    use.setAttributeNS(XLINKNS, 'href', `#${this.props.name}`);

    el.innerHTML = '';
    el.appendChild(use);
  },

  render() {

    let style = Object.assign({
      verticalAlign: 'middle',
      display: 'inline-block',
    }, this.props.style);

    let classes = ['SvgIcon'];

    if (this.props.className) classes.push(this.props.className);

    let className = classes.join(' ');

    return (
      <svg
        width="100%"
        height="100%"
        {...this.props}
        style={style}
        className={className}
        dangerouslySetInnerHTML={{ __html: `<use href="#${this.props.name}"></use>` }}
      />
    );
  }
 });

export default SvgIcon;
