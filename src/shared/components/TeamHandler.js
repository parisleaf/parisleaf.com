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
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/01/17035946/Chad-Progressive.jpg",
    title: "Co-Founder, CRO (Chief Relationship Officer) & CEO",
    // handle: "@CHAD_PARIS",
    questions: {
      bio: "Chad wanted to own the happiest business in the world and that goal fuels everything he does. Chad’s role is all about relationships and communication with clients and with the Parisleaf team. Chad’s passion lies in giving back to the community - some may call this networking."
      // bucket_list: "Hiking the A.T.",
      // super_power: "Read minds",
      // spirit_animal: "Hawk or owl - wise and a love a good 10,000 foot view",
      // character: "I’m down with Shia LaBeouf - less the drugs. The guy’s a maniac, but I respect that he does weird sh*t."
    }
  },
  {
    name: "Alison Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161314/Alison.jpg",
    title: "Co-Founder & Chief Financial Officer",
    // handle: "@Alicparis",
    questions: {
      bio: "Alison’s passion for managing the o ce with love and making everything run smoothly comes through in everything she does. A Pinterest fanatic, she loves both data analysis and design, working both sides of her brain equally. Her dazzling smile and efficient disposition keep the Leaf running beautifully."
      // bucket_list: "Visit the Galapagos Islands",
      // super_power: "Healing powers",
      // spirit_animal: "Sea Otter",
      // character: "Rory from Gilmore Girls meets Jess from New Girl"
    }
  },
  {
    name: "Matt Steel",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05164640/Matt.jpg",
    title: "Creative Director",
    // handle: "@Psanders3001",
    questions: {
      bio: "Matt is a designer who writes, father of four, and husband of one. Since 2003, he has designed and directed creative initiatives with clients ranging from small startups to Fortune 500 companies. Matt loves giving good stories the visibility they deserve. He enjoys reading, surfing, yoga, running, hanging punctuation, serial commas, and drifting from philosophical musings to ridiculous impersonations."
    }
  },
  {
    name: "Allen Shorter",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05164639/Allen.jpg",
    title: "Senior Project Manager",
    // handle: "@_mariajuan",
    questions: {
      bio: "Allen brings a unique perspective to every project. His 15 years as a User Experience Architect and Project Manager produced operations management apps for major cities and projects, including the 2012 Olympics and the Panama Canal. He’s also a professional husband, dad, semi-pro disc golfer and seasoned surfer."
      // bucket_list: "To perform great danceworks in famous theaters around the world.",
      // super_power: "Teleportation",
      // spirit_animal: "Pig",
      // character: "A combo Amy Schumer and the chicks from Broad City… the Latina version."
    }
  },
  {
    name: "Larry Werner",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161315/Larry.jpg",
    title: "Senior Copywriter",
    // handle: "",
    questions: {
      bio: "If you’re looking for the perfect setup, punchline, and tag to a joke, or you need to uncover the soul of a brand, Larry is there with bearded smile and worn out notebook. Larry brings core and quip to every project with a touch of Zen. Maybe it’s all that surfing he does to relax on the weekends"
      // bucket_list: "Machu Picchu",
      // super_power: "Flight",
      // spirit_animal: "Coyote",
      // character: "Silver Surfer"
    }
  },
  {
    name: "Benji Haselhurst",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161314/Benji.jpg",
    title: "Senior Designer",
    // handle: "",
    questions: {
      bio: "When you find yourself searching for that perfect sci-fi reference or obscure italo-disco music recommendation, Benji is your guy. He blends a diverse background of art and design with a love and dedication for user experience on the web. He also knows his beers, and all dogs seem to love him."
      // bucket_list: "One day I would like to shoot a bow and arrow from horseback. Preferably while cruising through a steppe or tundra. And there would definitely be an eagle or falcon helping me somehow…",
      // super_power: "Okay besides FLIGHT, I would love to speak with animals telepathically, especially dogs. They have so much to teach us about unconditional love, enjoying every meal, and taking every opportunity to chill by the pool. Although I believe that to some extent I already have this superpower.",
      // spirit_animal: "The Jaguar. I love blending in with foliage and nature hikes with friends, but I’m starting to learn when it’s time to sneak away quietly on a solitary mission and how to trust my instincts.",
      // character: "Probably a cross between a stretched out Purple Rain era Prince and Richard Simmons. I can be brooding and introspective until I start loudly encouraging people with wild high kicks and yelps. It can happen any time."
    }
  },
  {
    name: "James Hill",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/10/14182233/James.jpg",
    title: "Videographer / Photographer",
    // handle: "jameslbhill",
    questions: {
      bio: "James helps our clients tell their stories through motion. His focus on meaningful and impactful storytelling makes a brand come to life. His quiet yet thoughtful approach to his craft results in rich media that pulls at the heartstrings, and fall in love with your brand all over again. James may be quiet, but he usually has the funniest joke just waiting for everyone else to be quiet enough for him to chime in with."
      // bucket_list: "Go backpacking in New Zealand",
      // super_power: "Flight",
      // spirit_animal: "Wolf",
      // character: "Jim Halpert from The Office"
    }
  },
  {
    name: "Shane Buchan",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05164641/Shane.jpg",
    title: "Web Developer",
    // handle: "",
    questions: {
      bio: "Shane is a digital craftsman that specializes in graphic design, front-end web development, and animation. When he is not working, he is a doting husband, father, and can be found getting his hands dirty in the outdoors."
    }
  },
  {
    name: "Audrey Zipperer",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05170619/Audrey.jpg",
    title: "Relationship Strategist",
    // handle: "",
    questions: {
      bio: "Audrey is a senior advertising major at the University of Florida who loves to surround herself with interesting, creative people. Audrey is energized by ideas and tackles new projects with a full cup of coffee and enthusiasm. When she isn’t globe-trotting, she’s probably snacking on cupcakes and listening to NPR."
    }
  },
  {
    name: "Shirley Rodriguez",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05170620/Shirley.jpg",
    title: "Relationship Coordinator",
    // handle: "",
    questions: {
      bio: "Parisleaf’s second half to the business development team, Shirley is also the funniest person she has ever met. When she is not bringing in dollar bills to Parisleaf, she can be found pet-sitting your furry children or painting custom artwork for art lovers."
    }
  },
  {
    name: "Kaley Shorter",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2016/10/05165557/Kaley.jpg",
    title: "Marketing Manager",
    // handle: "",
    questions: {
      bio: "With a natural curiosity for peoples’ stories, Kaley brings a fresh approach to marketing. Aligning Parisleaf’s unique goals and personality with the capabilities of its database might seem like trying to align a butterfly with a robot, but Kaley pulls it off in time for dinner with the family, disc golf and rocking out on stage at the piano."
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
      <FlexContainer className="Section" collapse>
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
          {/* { !!human.handle &&
            <p>
              <Button component={AppLink} to={human.handle}>
                {human.handle}
              </Button>
            </p>
          } */}
          { !!human.questions.bio &&
            [
              <p>{human.questions.bio}</p>
            ]
          }
          {/* { !!human.questions.bucket_list &&
            [
              <Header level={5} bold noMargin>What’s one item on your bucket list?</Header>,
              <p>{human.questions.bucket_list}</p>
            ]
          }
          { !!human.questions.super_power &&
            [
              <Header level={5} bold noMargin>If you could have any super power…</Header>,
              <p>{human.questions.super_power}</p>
            ]
          }
          { !!human.questions.spirit_animal &&
            [
              <Header level={5} bold noMargin>What’s your spirit animal?</Header>,
              <p>{human.questions.spirit_animal}</p>
            ]
          }
          { !!human.questions.character &&
            [
              <Header level={5} bold noMargin>What pop culture character best suits your personality?</Header>,
              <p>{human.questions.character}</p>
            ]
          } */}
        </FlexItem>
      </FlexContainer>
    );
  }

});

export default TeamHandler;
