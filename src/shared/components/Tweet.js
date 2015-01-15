'use strict';

import React from 'react';
import { State } from 'react-router';

import Flux from 'flummox';
let TwitterActions = Flux.getActions('TwitterActions');
let TwitterStore = Flux.getStore('TwitterStore');


let Tweet = React.createClass({ 
  


  getInitialState() {
    return {
      tweet: TwitterStore.getTweetById(this.props.id),
    };
  },

  componentDidMount() {
    TwitterActions.getTweetById(this.props.id);
    TwitterStore.addListener('change', this.twitterStoreDidChange);
  },
  componentDidUnmount() {
    TwitterStore.addListener('change', this.twitterStoreDidChange);
  },

  twitterStoreDidChange() {
    this.setState({
      tweet: TwitterStore.getTweetById(this.props.id)
    });
  },

  render() {

    // do null checks in case data is not there yet
    if(!this.state.tweet) {
 //     console.log(this.state.tweet);
      return <h1>Tweet not found</h1>;
    }
    return(<div>{this.state.tweet.get('text')}</div>);
  }
});

export default Tweet;
