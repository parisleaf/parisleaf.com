'use strict';

import { Store } from 'flummox';
import Immutable from 'immutable';

export default class AppStore extends Store {

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
  
}
