'use strict';

import React from 'react';

let Swiper = React.createClass({

  componentDidMount() {
    let _Swiper = require('swiper');
    let { children, ...props } = this.props;
    
    this.swiper = new _Swiper(this.refs.swiperContainer.getDOMNode(), props);
  },

  componentDidUpdate() {
    if (!this.swiper) return;

    this.swiper.update();
  },

  componentWillUnmount() {
    if (!this.swiper) return;

    this.swiper.destroy();
  },

  render() {
    let { children, containerClassName, paginationClassName, ...props } = this.props;
    let containerClasses = ['swiper-container'];
    let paginationClasses = ['swiper-pagination'];

    if (containerClassName) containerClasses.push(containerClassName);
    if (paginationClassName) paginationClasses.push(paginationClassName);

    let slideMap = React.Children.map(this.props.children, child => {
      return <div className="swiper-slide">{child}</div>;
    });

    return (
      <div style={{position: 'relative', height: '100%', width: '100%'}}>
        <div {...props} ref="swiperContainer" className={containerClasses.join(' ')}>
          <div className="swiper-wrapper">
            {slideMap}
          </div>
        </div>
        <div className={paginationClasses.join(' ')}></div>
      </div>
    );
  }

});

export default Swiper;
