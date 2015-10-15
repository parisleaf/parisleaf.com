'use strict';

import React from 'react';

import AppLink from './AppLink';
import Button from './Button';
import Header from './Header'
import SiteContainer from './SiteContainer';
import Slider from './Slider';
import ProjectSlide from './ProjectSlide';

let HomeSlider = React.createClass({

  render() {
    let slides = this.props.projects.map(
      (project, count) => <ProjectSlide key={count} project={project} />
    );

    return (
      <div>
        <SiteContainer breakAfterLarge padAfterLarge>
          <Slider
            containerClassName="HomeSwiper"
            paginationClassName="HomeSwiper-pagination"
            ref="projectSlider"
            autoplay={5000}
            // grabCursor={true}
            pagination={'.HomeSwiper-pagination'}
            paginationHide={false}
            paginationClickable={true}
            paginationBulletRender={function (index, className) { return '<button class="HomeSwiper-bullet ' + className + '"></button>'; }}
          >
            {slides}
          </Slider>
          <div className="HomeSwiper-bg DiagonalPattern" />
        </SiteContainer>
        <SiteContainer breakAll padAll>
          <Button
            component={AppLink}
            to="/work"
            secondaryDark stacked
          >
            See more of our work
          </Button>
        </SiteContainer>
      </div>
    );
  }

});

export default HomeSlider;
