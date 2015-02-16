'use strict';

import ImmutableStore from './ImmutableStore';
import Immutable from 'immutable';

import { color } from '../theme';

export default class AppStore extends ImmutableStore {

  constructor(flux) {
    super();

    this.state = {
      navOpen: false,
      navTextColor: color('text'),
      isTransitioning: false,
      options: Immutable.Map(),
    };

    let appActionIds = flux.getActionIds('app');

    this.register(appActionIds.setNavOpen, this.handleSetNavOpen);
    this.register(appActionIds.setNavTextColor, this.handleSetNavTextColor);
    this.register(appActionIds.routeTransitionStart, this.handleRouteTransitionStart);
    this.register(appActionIds.routeTransitionEnd, this.handleRouteTransitionEnd);
    this.register(appActionIds.getOptions, this.handleGetOptions);
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  static deserialize(string) {
    let obj = JSON.parse(string);

    let state = {};

    for (let key in obj) {
      state[key] = Immutable.fromJS(obj[key]);
    }

    return state;
  }

  handleSetNavOpen(navOpen) {
    this.setState({ navOpen });
  }

  handleSetNavTextColor(navTextColor) {
    this.setState({ navTextColor });
  }

  handleRouteTransitionStart() {
    this.setState({ isTransitioning: true });
  }

  handleRouteTransitionEnd() {
    this.setState({ isTransitioning: false });
  }

  handleGetOptions(newOptions) {
    let options = this.state.options;

    for (let option of newOptions) {
      option = Immutable.fromJS(option);
      options = options.merge(option);
    }

    this.setState({ options });
  }
}
