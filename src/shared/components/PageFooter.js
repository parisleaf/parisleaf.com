import React from 'react';
import Flux from 'flummox/component';
import Header from './Header';
import Button from './Button';
import SiteContainer from './SiteContainer';
import { color, rhythm } from '../theme';

const PageFooter = React.createClass({

  socialLinks() {
    const data = [
      {
        title: "Twitter",
        href: "https://twitter.com/Parisleaf"
      },
      {
        title: "Vimeo",
        href: "https://vimeo.com/parisleaf"
      },
      {
        title: "LinkedIn",
        href: "https://www.linkedin.com/company/parisleaf-printing-and-design"
      },
      {
        title: "Facebook",
        href: "https://www.facebook.com/parisleaf"
      },
      {
        title: "Behance",
        href: "https://www.behance.net/parisleaf"
      },
      {
        title: "Instagram",
        href: "https://www.instagram.com/teamparisleaf/"
      },
    ];

    const links = data.map((item, i) =>
      <div className="PageFooter-socialLink" key={i}>
        <a href={item.href}>{item.title}</a>
      </div>
    );

    return links;
  },

  render() {
    return (
      <footer className="PageFooter">
        <SiteContainer breakAll padAll>
          <section className="PageFooter-section">
            <Header level={4} bold uppercase letterspace>
              Contact
            </Header>
            <p>
              info[at]parisleaf.com<br />
              +1 (352) 377-5560
            </p>
          </section>
          <section className="PageFooter-section">
            <Header level={4} bold uppercase letterspace>
              Studio
            </Header>
            <p>
              107 SW 7th Street<br />
              Gainesville, Florida 32601
            </p>
          </section>
          <section className="PageFooter-section">
            <Header level={4} bold uppercase letterspace>
              Social
            </Header>
            <div className="PageFooter-socialContainer">
              {this.socialLinks()}
            </div>
          </section>
        </SiteContainer>
        <SiteContainer breakAll padAll>
          <section className="PageFooter-copyright">
            All content copyright 2015 Parisleaf.
          </section>
        </SiteContainer>
      </footer>
    )
  }
});

export default PageFooter;
