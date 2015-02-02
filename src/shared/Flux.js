'use strict';

import Flummox from 'flummox';

import PostActions from './actions/PostActions';
import PostStore from './stores/PostStore';

import PageActions from './actions/PageActions';
import PageStore from './stores/PageStore';

import ProjectActions from './actions/ProjectActions';
import ProjectStore from './stores/ProjectStore';

import MenuActions from './actions/MenuActions';
import MenuStore from './stores/MenuStore';

import TweetActions from './actions/TweetActions';
import TweetStore from './stores/TweetStore';

import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

import RouterActions from './actions/RouterActions';
import RouterStore from './stores/RouterStore';

export default class Flux extends Flummox {

  constructor() {
    super();

    this.createActions('posts', PostActions);
    this.createStore('posts', PostStore, this);

    this.createActions('pages', PageActions);
    this.createStore('pages', PageStore, this);

    this.createActions('projects', ProjectActions);
    this.createStore('projects', ProjectStore, this);

    this.createActions('menus', MenuActions);
    this.createStore('menus', MenuStore, this);

    this.createActions('tweets', TweetActions);
    this.createStore('tweets', TweetStore, this);

    this.createActions('app', AppActions);
    this.createStore('app', AppStore, this);

    this.createActions('router', RouterActions);
    this.createStore('router', RouterStore, this);
  }

}
