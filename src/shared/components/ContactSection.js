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

const ContactSection = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    let sectionClass = ['Section', 'ContactSection'];
    if (this.props.noMargin) sectionClass.push('Section--noMargin');
    if (this.props.invertBottomMargin) sectionClass.push('Section--invertBottomMargin');

    return(
      <div className={sectionClass.join(' ')}>
        <div className="ContactSection-content">
          <SiteContainer breakAll padAll>
            <div className="ContactSection-inner">
              <Header level={1}>
                Let&rsquo;s get our feet wet.
              </Header>
              <Button
                component={AppLink}
                to="/contact"
                secondaryLight stacked rightResponsive
              >
                Get in touch
              </Button>
            </div>
          </SiteContainer>
        </div>
        <div className="ContactSection-overlay" />
        <div className="ContactSection-image" />
      </div>
    );
  }
});

export default ContactSection;
