import React from 'react';
import Flux from 'flummox/component';
import Helmet from 'react-helmet';

import AppLink from './AppLink';
import Button from './Button';
import FlexItem from './FlexItem';
import FlexContainer from './FlexContainer';
import Header from './Header';
import TitleSection from './TitleSection';
import SiteContainer from './SiteContainer';

import { nestedGet } from '../utils/ImmutableUtils';

const team = [
  {
    name: "Chad Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165705/chad.jpg",
    title: "Co-Founder & CEO",
    questions: {
      bio: "Chad wanted to own the happiest business in the world, and that goal fuels everything he does. Chad’s role is all about relationships and communication with clients and with the Parisleaf team. Chad’s passion lies in giving back to the community - some may call this networking."
    }
  },
  {
    name: "Alison Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165701/alison.jpg",
    title: "Co-Founder & Chief Financial Officer",
    questions: {
      bio: "Alison’s passion for managing the office with love and making everything run smoothly comes through in everything she does. A Pinterest fanatic, she loves both data analysis and design, working both sides of her brain equally. Her dazzling smile and efficient disposition keep the Leaf running beautifully."
    }
  },
  {
    name: "Matt Steel",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165710/matt.jpg",
    title: "Creative Director",
    questions: {
      bio: "Matt is a designer who writes, father of four, and husband of one. Since 2003, he has designed and directed creative initiatives with clients ranging from small startups to Fortune 500 companies. Matt loves giving good stories the visibility they deserve. He enjoys reading, surfing, yoga, running, hanging punctuation, serial commas, and drifting from philosophical musings to ridiculous impersonations."
    }
  },
  {
    name: "Allen Shorter",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165703/allen.jpg",
    title: "Senior Project Manager",
    questions: {
      bio: "Allen brings a unique perspective to every project. His 15 years as a User Experience Architect and Project Manager produced operations management apps for major cities and projects, including the 2012 Olympics and the Panama Canal. He’s also a professional husband, dad, semi-pro disc golfer and seasoned surfer."
    }
  },
  {
    name: "Larry Werner",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165709/larry.jpg",
    title: "Senior Copywriter",
    questions: {
      bio: "If you’re looking for the perfect setup, punchline, and tag to a joke, or you need to uncover the soul of a brand, Larry is there with bearded smile and worn out notebook. Larry brings core and quip to every project with a touch of Zen. Maybe it’s all that surfing he does to relax on the weekends"
    }
  },
  {
    name: "Benji Haselhurst",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165704/benji.jpg",
    title: "Senior Designer",
    questions: {
      bio: "When you find yourself searching for that perfect sci-fi reference or obscure italo-disco music recommendation, Benji is your guy. He blends a diverse background of art and design with a love and dedication for user experience on the web. He also knows his beers, and all dogs seem to love him."
    }
  },
  {
    name: "James Hill",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165707/james.jpg",
    title: "Videographer / Photographer",
    questions: {
      bio: "James helps our clients tell their stories through motion. His focus on meaningful and impactful storytelling makes a brand come to life. His thoughtful approach to his craft results in rich media that pulls at the heartstrings and will make you fall in love with your brand all over again. James may be quiet, but he usually has the funniest joke and is just waiting for everyone else to calm down before he chimes in."
    }
  },
  {
    name: "Shane Buchan",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165711/shane.jpg",
    title: "Web Developer",
    questions: {
      bio: "Shane is a digital craftsman who specializes in graphic design, front-end web development and animation. When he's not working, he is a doting husband and father and can be found getting his hands dirty in the outdoors."
    }
  },
  {
    name: "Shirley Rodriguez",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165712/shirley.jpg",
    title: "Relationship Coordinator",
    questions: {
      bio: "Parisleaf’s second half to the business development team, Shirley is also the funniest person she has ever met. When she is not bringing in dollar bills to Parisleaf, she can be found pet-sitting your furry children or painting custom artwork for art lovers."
    }
  },
  {
    name: "Kaley Shorter",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/11/29165708/kaley.jpg",
    title: "Marketing Manager",
    questions: {
      bio: "A creative in her own right, Kaley has tapped years of journalism, CRM management, inbound marketing and customer experience shaping to launch Parisleaf’s blog to international recognition in less than four months. Kaley still makes it home in time for dinner with the family, disc golf and rocking out on stage at the piano."
    }
  }
];

const TeamHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('team');
    }
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: store => ({
          page: store.getPageBySlug('team')
        })
      }}>
        <TeamPage team={team} />
      </Flux>
    );
  }
});

const TeamPage = React.createClass({

  render() {

    const { page, team } = this.props;

    if (!page) return <span />;

    let teamMap = team.map(
      ( human, count ) => <Human key={count} human={human} />
    );

    let titleTag = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');
    titleTag += " | Parisleaf, A Florida Branding & Digital Agency";

    return (
      <div>
        <Helmet
          title={titleTag}
          meta={[
            {"name": "description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"name": "keywords", "content": nestedGet(page, 'meta', 'yoast_wpseo_metakeywords')},
            {"property": "og:description", "content": nestedGet(page, 'meta', 'yoast_wpseo_metadesc')},
            {"property": "og:image", "content": nestedGet(page, 'featured_image', 'source') || ""},
            {"property": "og:title", "content": titleTag},
            {"property": "og:type", "content": "article"},
            {"property": "og:url", "content": "https://parisleaf.com/team"},
            {"property": "article:author", "content": ""},
            {"property": "article:published_time", "content": ""},
            {"property": "article:modified_time", "content": ""},
          ]} />
        <TitleSection
          title="Everyone has an ego. We just hook ours to the bike rack on our way in."
        />
        <SiteContainer breakAll padAll>
          {teamMap}
        </SiteContainer>
      </div>
    );
  }

});

const Human = React.createClass({

  render () {

    const { human, ...props } = this.props;

    return (
      <FlexContainer className="Section Team" collapse>
        <FlexItem span4>
          <img src={human.photo} />
        </FlexItem>
        <FlexItem span8>
          <Header level={1} noMargin>
            {human.name}
          </Header>
          <Header level={4} vollkorn noMargin>
            {human.title}
          </Header>
          { !!human.questions.bio &&
            [
              <p>{human.questions.bio}</p>
            ]
          }
        </FlexItem>
      </FlexContainer>
    );
  }

});

export default TeamHandler;
