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
        href: ""
      },
      {
        title: "Vimeo",
        href: ""
      },
      {
        title: "Facebook",
        href: ""
      },
      {
        title: "Behance",
        href: ""
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
            <Header level={5} style={{
              marginTop: rhythm(0)
            }}>
              A Gainesville Based Creative Studio.
            </Header>
            <p>We make your dreams come true.</p>
            <p>
              +1 (352) 377-5560<br />
              <a href="mailto:info@parisleaf.com">info@parisleaf.com</a>
            </p>
          </section>
          <section className="PageFooter-section">
            <p style={{
              marginTop: rhythm(0)
            }}>
              Parisleaf Creative Studio<br />
              107 SW 7th Street<br />
              Gainesville, Florida 32601
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