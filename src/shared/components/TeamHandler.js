import React from 'react';
import Flux from 'flummox/component';

import AppLink from './AppLink';
import Button from './Button';
import FlexItem from './FlexItem';
import FlexContainer from './FlexContainer';
import Header from './Header';
import HTMLContentArea from './HTMLContentArea';
import TitleSection from './TitleSection';
import SiteContainer from './SiteContainer';

const team = [
  {
    name: "Chad Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/01/17035946/Chad-Progressive.jpg",
    title: "Co-Founder, CRO (Chief Relationship Officer) & CEO",
    handle: "@CHAD_PARIS",
    questions: {
      bucket_list: "Hiking the A.T.",
      super_power: "Read minds",
      spirit_animal: "Hawk or owl - wise and a love a good 10,000 foot view",
      character: "I’m down with Shia LaBeouf - less the drugs. The guy’s a maniac, but I respect that he does weird sh*t."
    }
  },
  {
    name: "Alison Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161314/Alison.jpg",
    title: "Co-Founder & Chief Financial Officer",
    handle: "@Alicparis",
    questions: {
      bucket_list: "Visit the Galapagos Islands",
      super_power: "Healing powers",
      spirit_animal: "Sea Otter",
      character: "Rory from Gilmore Girls meets Jess from New Girl"
    }
  },
  {
    name: "Patrick Sanders",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161316/Patrick.jpg",
    title: "Creative Director",
    handle: "@Psanders3001",
    questions: {
      bucket_list: "Own and run a B&B on some exotic island",
      super_power: "Time Travel",
      spirit_animal: "Wolf",
      character: "Jon Snow"
    }
  },
  {
    name: "Zack Graber",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161317/Zack.jpg",
    title: "Art Director/Brand Designer",
    handle: "zacharyjgraber",
    questions: {
      bucket_list: "Ride my bike around the country. Bike as in bicycle, pedal powered.",
      super_power: "If I could have any superpower it would have to be the ability to grant wishes. Like a genie without the servitude.",
      spirit_animal: "Octopus. I’m generally pretty shy but also very adaptive and creative. I also have a very wide range of interests characterized by the many legs of the octopus.",
      character: "Dumbeldore - quiet, caring, and friendly."
    }
  },
  {
    name: "Benji Haselhurst",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161314/Benji.jpg",
    title: "Web Designer",
    handle: "",
    questions: {
      bucket_list: "One day I would like to shoot a bow and arrow from horseback. Preferably while cruising through a steppe or tundra. And there would definitely be an eagle or falcon helping me somehow…",
      super_power: "Okay besides FLIGHT, I would love to speak with animals telepathically, especially dogs. They have so much to teach us about unconditional love, enjoying every meal, and taking every opportunity to chill by the pool. Although I believe that to some extent I already have this superpower.",
      spirit_animal: "The Jaguar. I love blending in with foliage and nature hikes with friends, but I’m starting to learn when it’s time to sneak away quietly on a solitary mission and how to trust my instincts.",
      character: "Probably a cross between a stretched out Purple Rain era Prince and Richard Simmons. I can be brooding and introspective until I start loudly encouraging people with wild high kicks and yelps. It can happen any time."
    }
  },
  {
    name: "Maria Juan",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161316/Maria.jpg",
    title: "Director of Client Services",
    handle: "@_mariajuan",
    questions: {
      bucket_list: "To perform great danceworks in famous theaters around the world.",
      super_power: "Teleportation",
      spirit_animal: "Pig",
      character: "A combo Amy Schumer and the chicks from Broad City… the Latina version."
    }
  },
  {
    name: "Larry Werner",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161315/Larry.jpg",
    title: "Copywriter",
    handle: "",
    questions: {
      bucket_list: "Machu Picchu",
      super_power: "Flight",
      spirit_animal: "Coyote",
      character: "Silver Surfer"
    }
  },
  {
    name: "Eric Leite",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161315/Eric.jpg",
    title: "Web Developer",
    handle: "",
    questions: {
      bucket_list: "",
      super_power: "",
      spirit_animal: "",
      character: ""
    }
  },
  {
    name: "James Hill",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/10/14182233/James.jpg",
    title: "Videographer / Photographer",
    handle: "jameslbhill",
    questions: {
      bucket_list: "Go backpacking in New Zealand",
      super_power: "Flight",
      spirit_animal: "Wolf",
      character: "Jim Halpert from The Office"
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

    return (
      <div>
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
          { !!human.handle &&
            <p>
              <Button component={AppLink} to={human.handle}>
                {human.handle}
              </Button>
            </p>
          }
          { !!human.questions.bucket_list &&
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
          }
        </FlexItem>
      </FlexContainer>
    );
  }

});

export default TeamHandler;
