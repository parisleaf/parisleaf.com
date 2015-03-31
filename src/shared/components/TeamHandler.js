import React from 'react';
import Flux from 'flummox/component';
import PageHeader from './PageHeader';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';

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
        <AboutPage />
      </Flux>
    );
  }
});

const AboutPage = React.createClass({
  render() {
    const { page } = this.props;

    if (!page) return <span />;

    return (
      <div>
        <PageHeader
          title="We’re nothing more than a collection of outstanding human beings…"
          subtitle="just ask our parents."
        />
        <SiteContainer>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </div>
    );
  }
});

export default TeamHandler;
