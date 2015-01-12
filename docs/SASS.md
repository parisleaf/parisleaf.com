In the Sass directory, `app.sass` acts as the main entry point for all the other styles in the project.

There also contains several folders organized in a logical manner to distinguish different aspects of the styles used in the project.  The files are also imported in this order in order to ensure that dependencies are correctly satisfied.

- `vendor`
- `dependencies`
- `lib`

`vendor`
--------

This directory only contains Noramlize.css right now.  Any other included Sass files from outside sources should go in here.

`dependencies`
--------------

This directory pulls from `/src/shared/theme.js`, and contains project-related specifics such as colors, font families, font sizes, and z-indices.  Please run the `make theme` or `make build` task to make sure that the `theme.js` file is correctly converted in SCSS at `/sass/dependencies/theme.scss`. 

In order to use the mixins provided, please follow these guidelines.

```

@include bp($size) &mdash; to use a breakpoint as a media query where `s`, `m`, `l` are different sizes

@include fontFamily($family) &mdash; to set the `font-family'

@include fontSize($size) &mdash; to adjust the current font-size

@include zIndex($index, $offset) &mdash; to adjust the z-index of the current selector. Provide an offset such as -1 or 1 if you want to offset that $index choice.

@include color($color) &mdash; to return a color value

```

`lib`
-----

Here is a set of helper mixins and functions that are commonly used throughout projects. To use:

```

@include clearfix-contain &mdash; provides a clearfix solution for any selector

@include vertical-center-parent, @include vertical-center-child &mdash; provide vertical centering solutions for the parent and child elements

px-to-rem($value) &mdash; converts pixel value to rem values based on a $rem-base

rhythm($value) &mdash; converts values into rhythm units 

```
