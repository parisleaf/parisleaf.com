'use strict';

import React from 'react';
import { State } from 'react-router';
import moment from 'moment';

import Flux from 'flummox';
let TwitterActions = Flux.getActions('TwitterActions');
let TwitterStore = Flux.getStore('TwitterStore');


import Excerpt from './Excerpt';
import Header from './Header';
import Metadata from './Metadata';

let style = {

}

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
  
  formatDate(date) {
    let tweetDate = moment(date, "dd MMM DD HH:mm:ss ZZ YYYY");
    return tweetDate.format('MM.DD.YYYY');
  },

  render() {

    if(!this.state.tweet) {
      return <h1>Tweet not found</h1>;
    }

    console.log(this.state.tweet.toJS());
    return(
      <div className="Tweet">
        <div className="Tweet-meta">
          <Header level={2} className="Tweet-meta-user">{this.state.tweet.get('user').get('name')} says:</Header>
          <Metadata className="Tweet-meta-date">{this.formatDate(this.state.tweet.get('created_at'))}</Metadata>
        </div>
        <div className="Tweet-content">
          <Excerpt>{this.state.tweet.get('text')}</Excerpt>
        </div>
      </div>
    );
  }
});

export default Tweet;
