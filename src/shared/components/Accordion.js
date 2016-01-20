'use strict';

import React from 'react';

import AccordionSection from './AccordionSection';

let Accordion = React.createClass({
  render() {
    const {sections, totalSections, ...props} = this.props;

    let sectionsMap = sections.map(function(sectionData, i) {
      return (
        <AccordionSection key={i} sectionData={sectionData} totalSections={totalSections}>
          <source src={sectionData.accordionVideoSrcMp4} type="video/mp4"/>
          <source src={sectionData.accordionVideoSrcOgv} type="video/ogg"/>
        </AccordionSection>
      );
    }.bind(this));

    return (
      <div className="Accordion" style={{position: 'relative'}}>
        {sectionsMap}
      </div>
    );
  }
});

export default Accordion;
