'use strict';

/**
 * Exports of this module are converted to Sass by json-sass. This lets us share
 * values between JavaScript and CSS.
 *
 * Some values must be formatted specially for Sass consumption -- for instance,
 * wrapping media queries in quotes so they aren't interpreted as booleans.
 * By convention, these values are exported inside objects prefixed with 'sass'.
 */

export var colors = {
  gray: '#4d4d4d',
  yellow: '#f7ee23',
  lightGray: '#f2f2f2',

  blue: '#146cce',
  lightBlue: '#58a8fd',
  green: '#89f7bf',
  aqua: '#2bd5d3',
  pink: '#fb5382',
  orange: '#fd7450',
};

/**
 * Return a theme color
 */
export function color(name) {
  return colors[name];
};

export var fontFamilies = {
  alright: 'Alright Sans',
};

fontFamilies.text = fontFamilies.alright;
fontFamilies.header = fontFamilies.alright;

export var sassFontFamilies = mapObject(fontFamilies, wrapSassExpression);

/**
 * Return a theme font-family
 */
export function fontFamily(name) {
  return fontFamilies[name];
};

export var fontSizes = {
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

/**
 * Return a theme font-size
 */
export function fontSize(name) {
  return fontSizes[name];
};


export var zIndices = {
  AppNav:              9999,
};

/**
 * Return a theme z-index, optionally offset.
 * @param {string} name - Name of z-index
 * @param {number} [offset] - Offset (defaults to 0)
 */
export function zIndex(name, offset = 0) {
  return zIndices[name] + offset;
};

export var breakpoints = {
  s:       768,
  m:       1024,
  l:       1200,
};

export var mediaQueries = mapObject(breakpoints,
  breakpoint => `screen and (min-width:${breakpoint}px)`
);

export var sassMediaQueries = mapObject(mediaQueries, mq => `'${mq}'`);

export function rhythm(lines) {
  return `${(1.5 * lines)}rem`;
}

/**
 * Convert a pixel value to rems
 * @param {pixels}
 * @param {[remBase]}
 * @returns {String} Value in rems
 */
export function pxToRem(pixels, remBase = 16) {
  return pixels / remBase + 'rem';
}

/**
 * Wrap a Sass string in parentheses.
 * @param {String} sassString
 * @returns {String}
 */
function wrapSassExpression(sassString) {
  return '(' + sassString + ')';
}

/**
 * Takes an object and returns a new object by applying a transformation to
 * each value.
 * @param {object} object - Original object
 * @param {function} transform - Transformation function
 * @return {object} New object with transformed values
 */
function mapObject(object, transform) {
  return Object.keys(object).reduce((result, key) => {
    result[key] = transform(object[key]);
    return result;
  }, {});
}
