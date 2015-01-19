'use strict';

import 'browsernizr/test/css/vhunit';
import 'browsernizr';

// Remove 300ms tap delay on mobile devices
import attachFastClick from 'fastclick';
attachFastClick(document.body);

// Expose globally
import React from 'react';
window.React = React;

import { mediaQueries } from '../shared/theme';
import MediaMixin from 'react-media-mixin';

// Add media queries
MediaMixin.addMediaQueries(mediaQueries);

process.env.WP_ENDPOINT = document.getElementById('app').getAttribute('data-wp-endpoint');
