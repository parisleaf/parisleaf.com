'use strict';

/**
 * Exports of this module are converted to Sass by json-sass. This lets us share
 * values between JavaScript and CSS.
 *
 * Some values must be formatted specially for Sass consumption -- for instance,
 * wrapping media queries in quotes so they aren't interpreted as booleans.
 * By convention, these values are exported inside objects prefixed with 'sass'.
 */

var colors = {
  gray: '#4d4d4d',
  yellow: '#f5d23e',
  lightGray: '#f2f2f2',
  darkGray: '#343844',

  blue: '#146cce',
  lightBlue: '#58a8fd',
  green: '#89f7bf',
  aqua: '#2bd5d3',
  pink: '#fb5382',
  orange: '#fd7450',
};

colors.text = colors.darkGray;

export { colors };

/**
 * Return a theme color
 */
export function color(name) {
  return colors[name];
};

export var fontFamilies = {
  alright: 'Alright Sans',
  vollkorn: 'Vollkorn',
};

fontFamilies.text = fontFamilies.alright;
fontFamilies.header = fontFamilies.alright;

export var sassFontFamilies = mapObject(fontFamilies, wrapSassExpression);

/**
 * Return a theme font-family
 */
export function fontFamily(name) {
  return fontFamilies[name];
}

// http://modularscale.com/scale/?px1=14&px2=20&ra1=1.5&ra2=0
var scale = [
  8.889,
  9.333,
  13.333,
  14,
  20,
  21,
  30,
  31.5,
  45,
  47.5,
  67.5,
];

export function modularScale(n) {
  return scale[n] / 14;
}

export var fontSizes = {
  h1: `${modularScale(8)}rem`,
  h2: `${modularScale(6)}rem`,
  h3: `${modularScale(5)}rem`,
  h4: `${modularScale(4)}rem`,
  h5: `${modularScale(4)}rem`,
  h6: `${modularScale(4)}rem`,

  text: '1rem',
  small: `${modularScale(3)}rem`,
  ms: scale,
}

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
  s:       500,
  m:       768,
  l:       1024,
  xl:      1200,
};

export var mediaQueries = mapObject(breakpoints,
  breakpoint => `screen and (min-width:${breakpoint}px)`
);

export var sassMediaQueries = mapObject(mediaQueries, mq => `'${mq}'`);

export function rhythm(lines) {
  return `${(1.5 * lines)}rem`;
}

export var navBarRhythmHeight = 3;

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
