'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

import { color } from '../theme';

export default class NavStore extends ImmutableStore {

  constructor(flux) {
    super();

    this.state = {
      open: false,
      color: Immutable.Map({
        text: color('text'),
        background: '#fff',
      }),
    };

    let navActions = flux.getActions('nav');

    this.register(navActions.setOpen, this.handleOpen);
    this.register(navActions.setColor, this.handleSetColor);
  }

  handleOpen(open) {
    this.setState({ open });
  }

  handleSetColor(color) {
    this.setState({
      color: this.state.color.merge(color)
    });
  }
}
