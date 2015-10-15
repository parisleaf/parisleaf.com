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
      bucket_list: "To one day have the happiest design firm in the world. Mission: Accomplished Also, to be a good husband to my loving business partner and wife Alison and, someday, a good father.",
      super_power: "Well, since everyone is going to say ‘Flying’, (#maria #janie #amelia) I would say the ability to bring peace in the midst of confusion and commotion by simply shifting my energy.",
      spirit_animal: "Hawk – I’ve always thought that hawks and eagles are so mysterious. They always seem to appear when I least expect them to, but when I need a sign that there’s hope on the other side, or just as a reminder that I need to pay attention to the present moment. They also really resonate with me because they have such a keen eye for minute details, but spend most of their time flying above the commotion and observing the bigger picture.",
      character: ""
    }
  },
  {
    name: "Alison Paris",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161314/Alison.jpg",
    title: "Co-Founder & Chief Financial Officer",
    handle: "@Alicparis",
    questions: {
      bucket_list: "Marry the man of my dreams… Whoops, already did that! Okay, another item on my bucket list is to start a non-profit that impacts the world in a positive and healing way.",
      super_power: "To heal through touch and/or meditation.",
      spirit_animal: "I guess I would say an elephant; I find them mesmerizing. They are incredibly intelligent, social, and one of the only animals to show empathy for one another as well as other species.",
      character: "Belle from Beauty & the Beast. My nose is always stuck in a book!"
    }
  },
  {
    name: "Patrick Sanders",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161316/Patrick.jpg",
    title: "Creative Director",
    handle: "@Psanders3001",
    questions: {
      bucket_list: "I want to write a book…seriously.",
      super_power: "Simple, teleportation because I hate traffic and love to travel.",
      spirit_animal: "I’m a wolf! I’m loyal to a fault and I love my pack!",
      character: "Unfortunately, probably the dad in Little House on the Prairie. I thrive off being a mentor, but I don’t take anyone’s $@&#!"
    }
  },
  {
    name: "Zack Graber",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161317/Zack.jpg",
    title: "Art Director",
    handle: "",
    questions: {
      bucket_list: "I want to go to Bavaria and explore Neuschwantstien Castle. It looks like your typical castle from a fantasy, I think it’d be so surreal to actually be there.",
      super_power: "If I could be like a genie that’d be awesome. I love to make people happy and would be thrilled to be able to grant wishes.",
      spirit_animal: "Octopus. I’m generally pretty shy but also very adaptive and creative. I also have a very wide range of interests characterized by the many legs of the octopus.",
      character: "Jack Dawson. I figure life’s a gift and I don’t intend on wasting it."
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
    handle: "",
    questions: {
      bucket_list: "",
      super_power: "",
      spirit_animal: "",
      character: ""
    }
  },
  {
    name: "Larry Werner",
    photo: "https://d2aetxz8kifmdn.cloudfront.net/wordpress/wp-content/uploads/2015/07/20161315/Larry.jpg",
    title: "Copywriter",
    handle: "",
    questions: {
      bucket_list: "",
      super_power: "",
      spirit_animal: "",
      character: ""
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
    title: "",
    handle: "",
    questions: {
      bucket_list: "",
      super_power: "",
      spirit_animal: "",
      character: ""
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
