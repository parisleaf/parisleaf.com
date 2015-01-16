'use strict';

import React from 'react';
import StyleguideComponent from 'react-styleguide';

// Components to be included
import theme from '../theme';
import { Link } from 'react-router';
import Button from '../components/Button';
import Header from '../components/Header';
import Metadata from '../components/Metadata';
import Excerpt from '../components/Excerpt';

let Styleguide = React.createClass({
  render() {
    return(
    <StyleguideComponent title="Parisleaf Styleguide">

      <div 
        title="Buttons"
        description="General buttons with modifiers"
        example='<Button to="/blog/hello-world" callToAction>
  Call to action
</Button>
<Button to="/blog/hello-world" primaryMenuLink>
  Primary Menu link
</Button>
<Button to="/blog/hello-world" secondaryMenuLink>
  Secondary Menu link
</Button>
'
      >
        <Button to="/blog/hello-world" callToAction>
          Call to action
        </Button>
        <br />
        <div style={{ backgroundColor: theme.color('darkGray'), marginTop: '2rem', padding: '2rem'}}>
          <Button to="/blog/hello-world" primaryMenuLink>
            Primary Menu link
          </Button>
        </div>
        <div style={{ backgroundColor: theme.color('darkGray'), marginTop: '2rem', padding: '2rem'}}>
          <Button to="/blog/hello-world" secondaryMenuLink>
            Secondary Menu link
          </Button>
        </div>
      </div>

      <div
        title="Headers"
        example="
<Header level={1}>Header h1</Header>
<Header level={2}>Header h2</Header>
<Header level={3}>Header h3</Header>
"
      >
        <Header level={1}>Header h1</Header>
        <Header level={2}>Header h2</Header>
        <Header level={3}>Header h3</Header>
      </div>

      <div 
        title="Metadata"
        description="A <span> wrapper for metadata.  Just wrap inline text with this component."
        example="<Metadata>From projects, climate, news</Metadata>"
      
      >
        <Metadata>From projects, climate, news</Metadata>
      </div>

      <div 
        title="Excerpt"
        description="A <span> wrapper for excerpts.  Just wrap inline text with this component."
        example='<Excerpt>@iamdevloper "MVC? Lol." - every JavaScript framework author in 2015.</Excerpt>'
      
      >
        <Excerpt>@iamdevloper "MVC? Lol." - every JavaScript framework author in 2015.</Excerpt>
      </div>
    </StyleguideComponent>
    );
  }
});

export default Styleguide;
