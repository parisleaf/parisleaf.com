'use strict';

var _ = require('lodash');

var theme = {};

// COLORS

var colors = {
  red: 'red',
  blue: 'blue',
};


theme.color = function(name) {
  return colors[name] || name;
};


// Font families

var fontFamilies = { 
  'sans-serif': 'sans-serif',
};


// Wrap font-families in parentheses before attaching to Sass object since they
// may contain commas
theme['font-families'] = _.transform(fontFamilies, function(result, fontFamily, key) {
  result[key] = wrapSassExpression(fontFamily);
});

theme.fontFamily = function(name) {
  return fontFamilies[name] || name;
};

var fontSizes = {
  s:               '0.8rem',
  text:            '1.0rem',
  m:               '1.1rem',
  l:               '1.5rem',
  xl:              '1.7rem',
  xxl:             '2.3rem',
  xxxl:            '2.5rem',
  xxxxl:           '3.0rem',
  xxxxxl:          '3.4rem',
  xxxxxxl:         '3.8rem',
  xxxxxxxl:        '5.1rem',
};


theme.fontSize = function(name) {
  return fontSizes[name] || name;
};

var zIndices = {
  Home:              999,
};


theme.zIndex = function(name, offset = 0) {
  return (zIndices[name] || name) + offset;
};

var breakpoints = {
  s:       768,
  m:       1024,
  l:       1200,
};

theme.breakpoints = Object.keys(breakpoints).reduce(
  (result, key) => {
    result[key] = breakpoints[key] + 'px';
    return result;
  },{}
);

/**
 * Wrap a Sass string in parentheses.
 * @param {String} sassString
 * @returns {String}
 */
function wrapSassExpression(sassString) {
  return '(' + sassString + ')';
}

/**
 * Convert a pixel value to rems
 * @param {pixels}
 * @param {[remBase]}
 * @returns {String} Value in rems
 */
function pxToRem(pixels, remBase = 16) {
  return pixels / remBase + 'rem';
}


export {
  colors,
  fontFamilies,
  fontSizes,
  zIndices
};
