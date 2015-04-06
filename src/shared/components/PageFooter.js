import React from 'react';
import Flux from 'flummox/component';
import Header from './Header';
import Button from './Button';
import SvgIcon from './SvgIcon';
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
        title: "Facebook",
        href: "https://www.facebook.com/parisleaf"
      },
      {
        title: "Behance",
        href: "https://www.behance.net/parisleaf"
      },
    ];

    const links = data.map((item, i) =>
      <div className="PageFooter-socialLinkContainer" key={i}>
        <Button secondaryDark component="a" href={item.href} className="PageFooter-socialLink">
          {item.title}
        </Button>
      </div>
    );

    return links;
  },

  render() {
    return (
      <footer className="PageFooter">
        <div className="PageFooter-logoContainer">
          <SvgIcon name="logo_compact" className="PageFooter-logo" style={{
            height: rhythm(2),
            width: rhythm(2),
          }}/>
        </div>
        <SiteContainer>
          <section className="PageFooter-section">
            <p>
              Parisleaf: A branding &amp; digital studio<br />
              107 SW 7th Street<br />
              Gainesville, Florida 32601
            </p>
          </section>
          <section className="PageFooter-section">
          <p>
            <a href="mailto:info@parisleaf.com">info@parisleaf.com</a><br />
            +1 (352) 377-5560
          </p>
          </section>
          <section className="PageFooter-section">
            {this.socialLinks()}
          </section>
        </SiteContainer>
      </footer>
    )
  }
});

export default PageFooter;
