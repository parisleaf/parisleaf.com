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
  gray:         '#8b919b',
  yellow:       '#ffce2e',
  lightGray:    '#e2eaf2',
  darkGray:     '#343844',

  blue:         '#146cce',
  lightBlue:    '#58a8fd',
  smoke:        '#6c6846',
  green:        '#89f7bf',
  aqua:         '#2bd5d3',
  pink:         '#fb5382',
  orange:       '#fd7450',
};

colors.text = colors.darkGray;

export { colors };

/**
 * Return a theme color
 */
export function color(name) {
  return colors[name];
};

var fontFamilies = {
  alrightLight: "'Alright Sans Light', sans-serif",
  alrightBlack: "'Alright Sans Black', sans-serif",
  vollkorn: 'Vollkorn, Georgia, serif',
};

fontFamilies.text = fontFamilies.alrightLight;
fontFamilies.header = fontFamilies.alrightBlack;

export var sassFontFamilies = mapObject(fontFamilies, wrapSassExpression);

/**
 * Return a theme font-family
 */
export function fontFamily(name) {
  return fontFamilies[name];
}

var scale = [
  6,
  9,
  12,
  16,
  20,
  24,
  30,
  45,
  48,
  68,
  100,
  106,
  150,
  160,
];

export function modularScale(n) {
  return `${scale[n] / 16}rem`;
}

export var fontSizes = {
  h1: modularScale(8),
  h2: modularScale(6),
  h3: modularScale(5),
  h4: modularScale(5),
  h5: modularScale(3),
  h6: modularScale(3),

  text: '1rem',
  small: modularScale(2),
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
  AppOverlay:           999,
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
export var siteContainerRhythmPadding = 2;

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
