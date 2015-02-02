'use strict';

import React from 'react';
import { State } from 'react-router';
import moment from 'moment';

import { rhythm, siteContainerRhythmPadding, color} from '../theme';
import Excerpt from './Excerpt';
import Header from './Header';
import Metadata from './Metadata';
import SvgIcon from './SvgIcon';
import Button from './Button';
import AppLink from './AppLink';

let style = {
  _: {
    padding: rhythm(siteContainerRhythmPadding - 1/4),
    margin: `${rhythm(1/2)} 0`,
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderLeft: `${rhythm(1/4)} ${color('twitterBlue')} solid`,
  },
  icon : {
    width: '2rem',
    height: '2rem',
    fill: color('yellow'),
  },
  header: {
    marginTop: '0',
  },
  retweet: {
    width: '2rem',
    height: '2rem',
  },
};

let Tweet = React.createClass({

  formatDate(date) {
    let tweetDate = moment(date, 'dd MMM DD HH:mm:ss ZZ YYYY');
    return tweetDate.format('MM.DD.YYYY');
  },

  getRetweetUrl() {
    let { tweet } = this.props;
    let id_str = tweet.get('id_str');
    let RETWEET_URL = 'https://twitter.com/intent/retweet?tweet_id=';
    return RETWEET_URL + id_str;
  },

  render() {
    let { tweet } = this.props;

    if(!tweet) {
      return <h1>Tweet not found</h1>;
    }

    return(
      <div className="TweetContainer" style={style._}>
        <div className="Tweet">
          <div className="Tweet-content">
            <div className="Tweet-content-excerpt">
              <Excerpt>{tweet.get('text')}</Excerpt>
            </div>
          </div>


        </div>
        <div className="TweetContainer-retweet">
          <Button component='a' href={this.getRetweetUrl()}>
            <SvgIcon name="retweet" style={style.retweet} />
          </Button>
        </div>
      </div>
    );
  }
});

export default Tweet;
