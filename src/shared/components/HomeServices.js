'use strict';

import React from 'react';
let { PureRenderMixin } = React.addons;

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header';
import SiteContainer from './SiteContainer';
import SvgIcon from './SvgIcon';

// import { nestedGet } from '../utils/ImmutableUtils';
import { rhythm, color, fontFamily } from '../theme';

const services = [
  {
    filename: "discovery",
    title: "Discovery",
    description: "The first and most important step of our process. This is where we interview. We analyze. Distill and empathize. Learning things about your business even you didn’t know. We then develop a strategy and get to work."
  },
  {
    filename: "visual_identity",
    title: "Visual Identity",
    description: "Logos, stationery, business cards, collateral, maybe even a new name. All things visual that represent who you are.",
  },
  {
    filename: "copy_writing",
    title: "Copy Writing",
    description: "The art and science of arranging words in such a compelling manner the delivery of the message resonates with the reader and evokes an emotional response."
  },
  {
    filename: "print_design",
    title: "Print Design",
    description: "Printing is where we started and sustainability is a big part of who we are. Parisleaf proudly holds all globally recognized printing certifications for adhering to strict environmental standards."
  },
  {
    filename: "photography",
    title: "Photography",
    description: "Visual messaging is one more way in which we tell a story. We believe visual communication to be just as important as the written word and authentic photography helps reveal the truth of the brand."
  },
  {
    filename: "ui_ux",
    title: "UI/UX",
    description: "Engagement is more than just a buzzword. Great technology, content and design can only be measured by how a user engages with it. This is central to our philosophy."
  },
  {
    filename: "web_design",
    title: "Web Design",
    description: "Where art and engineering come together in a beautiful display of color, text, layout, structure, graphics, images and interactivity."
  },
  {
    filename: "development",
    title: "Web Development",
    description: "We’re designers of code who see things differently. We engineer tools with a sophisticated hand and always develop with sustainability in mind. Utilizing the right mix to solve problems in smart, creative and user-focused ways.",
  },
  {
    filename: "video",
    title: "Video",
    description: "Creating branded content and telling stories through powerful moving images and captivating soundscapes that connect with the hearts and minds of your audience."
  },
  {
    filename: "motion",
    title: "Motion Graphics",
    description: "An innate ability to simplify complex problems and deliver knowledge faster by communicating through a blend of words, sounds and visual elements."
  }
];

const HomeServices = React.createClass({

  mixins: [PureRenderMixin],

  getInitialState() {
    return { activeService: 0 };
  },

  handleServiceIconHover( serviceId ) {
    this.setState({ activeService: serviceId });
  },

  render() {
    // let page = this.props.page;
    // let processHeader = nestedGet(page, 'meta', 'parisleaf_description');
    let allServices = services.map(
      ( service, count ) => <HomeServiceIcon key={count} serviceId={count} whenItemHovered={this.handleServiceIconHover} filename={service.filename} title={service.title} active={( count === this.state.activeService ? true : false )} />
    );
    let featuredServices = services.map(
      ( service, count ) => <HomeFeaturedService key={count} service={service} active={( count === this.state.activeService ? true : false )} />
    );

    return(
      <div className="HomeServices Section">
        <SiteContainer className="HomeServices-container" breakAll padAll>
          <div className="HomeServices-featuredService">
            <div className="HomeServices-featuredService-bg DiagonalPattern"></div>
            {featuredServices}
          </div>
          <div className="HomeServices-allServices">
            <Header level={2} className="HomeServices-allServices-header">
              Check out our services:
            </Header>
            <div className="HomeServices-allServices-container">
              {allServices}
            </div>
          </div>
        </SiteContainer>
        <SiteContainer breakAll padAll>
          <Button
            component={AppLink}
            to="/work"
            secondaryDark stacked left
          >
            See all projects
          </Button>
          <Button
            component={AppLink}
            to="/team"
            secondaryDark stacked rightResponsive
          >
            Meet the team who'll tell your story
          </Button>
        </SiteContainer>
      </div>
    );
  }
});

const HomeServiceIcon = React.createClass({
  handleHover() {
    this.props.whenItemHovered(this.props.serviceId);
  },

  render() {
    const { className, ...props } = this.props;
    const classes = ["HomeServices-allServices-iconWrap"];
    if (this.props.active) {
      classes.push("is-active");
    }

    return(
      <div className={classes.join(" ")} onMouseEnter={this.handleHover} onTouchStart={this.handleHover}>
        <SvgIcon className="HomeServices-allServices-icon" name={this.props.filename} />
        <Header level={4} className="HomeServices-allServices-title">
          {this.props.title}
        </Header>
      </div>
    );
  }
});

const HomeFeaturedService = React.createClass({
  render() {
    const classes = ["HomeServices-featuredService-content"];
    if (this.props.active) {
      classes.push("is-active");
    }

    return(
      <div className={classes.join(" ")}>
        <div className="HomeServices-featuredService-iconWrap">
          <SvgIcon className="HomeServices-featuredService-icon" name={this.props.service.filename} />
        </div>
        <Header level={4} className="HomeServices-featuredService-title">
          {this.props.service.title}
        </Header>
        <Header level={4} className="HomeServices-featuredService-description">
          {this.props.service.description}
        </Header>
      </div>
    );
  }
});

export default HomeServices;
